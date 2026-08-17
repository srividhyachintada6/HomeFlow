import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../css/Insights.css";

function Insights() {

  const { user } = useAuth();
  const userId = user?.id;

  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!userId) return;

    fetch(`http://localhost:8080/api/insights/user/${userId}`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch insights");
        }

        return response.json();
      })

      .then((data) => {

        setInsights(data);
        setLoading(false);
      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load insights");
        setLoading(false);
      });

  }, []);

  if (loading) {

    return (
      <div className="insights-loading">
        Loading insights...
      </div>
    );
  }

  if (error) {

    return (
      <div className="insights-error">
        {error}
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  return (

    <div className="insights-page">

      {/* HEADER */}

      <div className="insights-header">

        <div>

          <span className="insights-label">
            FINANCIAL OVERVIEW
          </span>

          <h1>
            Your Insights
          </h1>

          <p>
            Understand where your money is going
            and stay on top of your budget.
          </p>

        </div>

        <div className="insights-icon">
          ✦
        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="insights-cards">

        <div className="insight-card">

          <span>
            Total Spent
          </span>

          <h2>
            ₹{insights.totalSpent?.toFixed(2)}
          </h2>

          <small>
            Across all expenses
          </small>

        </div>


        <div className="insight-card">

          <span>
            Total Budget
          </span>

          <h2>
            ₹{insights.totalBudget?.toFixed(2)}
          </h2>

          <small>
            Your planned spending
          </small>

        </div>


        <div
          className={
            insights.remainingBudget >= 0
              ? "insight-card positive"
              : "insight-card negative"
          }
        >

          <span>
            Remaining
          </span>

          <h2>
            ₹{Math.abs(
              insights.remainingBudget || 0
            ).toFixed(2)}
          </h2>

          <small>
            {insights.remainingBudget >= 0
              ? "Still available"
              : "Over your budget"}
          </small>

        </div>


        <div className="insight-card">

          <span>
            Budget Used
          </span>

          <h2>
            {insights.budgetUsedPercentage?.toFixed(1)}%
          </h2>

          <div className="progress">

            <div
              className="progress-fill"
              style={{
                width: `${Math.min(
                  insights.budgetUsedPercentage || 0,
                  100
                )}%`
              }}
            />

          </div>

        </div>

      </div>


      {/* MAIN GRID */}

      <div className="insights-grid">


        {/* CATEGORY BREAKDOWN */}

        <div className="insights-panel">

          <div className="panel-header">

            <div>

              <span>
                SPENDING
              </span>

              <h2>
                Category Breakdown
              </h2>

            </div>

          </div>


          {insights.categoryBreakdown?.length === 0 ? (

            <div className="empty-insights">

              <div>
                📊
              </div>

              <p>
                No expense data yet.
              </p>

              <small>
                Add expenses to see your spending
                breakdown.
              </small>

            </div>

          ) : (

            <div className="category-list">

              {insights.categoryBreakdown.map(
                (item, index) => (

                  <div
                    className="category-item"
                    key={index}
                  >

                    <div className="category-top">

                      <strong>
                        {item.category}
                      </strong>

                      <span>
                        ₹{item.amount.toFixed(2)}
                      </span>

                    </div>

                    <div className="category-bar">

                      <div
                        style={{
                          width: `${Math.min(
                            item.percentage,
                            100
                          )}%`
                        }}
                      />

                    </div>

                    <small>
                      {item.percentage.toFixed(1)}%
                      of total spending
                    </small>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* TOP SPENDING */}

        <div className="insights-panel highlight-panel">

          <span className="panel-label">
            TOP SPENDING
          </span>

          <h2>
            {insights.highestSpendingCategory}
          </h2>

          <p>
            Your highest spending category
          </p>

          <div className="big-amount">
            ₹{insights.highestCategoryAmount?.toFixed(2)}
          </div>

          <div className="tip-box">

            <span>
              💡
            </span>

            <p>
              Keep an eye on your highest
              spending category to improve
              your monthly savings.
            </p>

          </div>

        </div>

      </div>


      {/* BOTTOM SECTION */}

      <div className="insights-panel money-panel">

        <div>

          <span className="panel-label">
            FINANCIAL HEALTH
          </span>

          <h2>
            {insights.remainingBudget >= 0
              ? "You're within your budget 🎉"
              : "You're over your budget ⚠️"}
          </h2>

          <p>

            {insights.remainingBudget >= 0
              ? `You still have ₹${insights.remainingBudget.toFixed(
                  2
                )} available from your current budget.`
              : `You have exceeded your current budget by ₹${Math.abs(
                  insights.remainingBudget
                ).toFixed(2)}.`}

          </p>

        </div>

        <div className="health-circle">

          {Math.round(
            Math.min(
              insights.budgetUsedPercentage || 0,
              100
            )
          )}
          %

        </div>

      </div>

    </div>
  );
}

export default Insights;