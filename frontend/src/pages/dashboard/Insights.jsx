import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../css/Insights.css";

function Insights() {
  const { user } = useAuth();
  const userId = user?.id;

  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      try {
        const [expenseResponse, budgetResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/expenses?userId=${userId}`),
          fetch(`http://localhost:8080/api/budgets/user/${userId}`),
        ]);

        const expenseData = await expenseResponse.json();
        const budgetData = await budgetResponse.json();

        setExpenses(Array.isArray(expenseData) ? expenseData : []);
        setBudgets(Array.isArray(budgetData) ? budgetData : []);
      } catch (error) {
        console.error("Error loading insights:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) {
    return (
      <div className="insights-loading">
        <div className="loading-circle"></div>
        <p>Preparing your financial insights...</p>
      </div>
    );
  }

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const totalBudget = budgets.reduce(
    (sum, budget) => sum + Number(budget.amount || 0),
    0
  );

  const remaining = Math.max(totalBudget - totalSpent, 0);

  const budgetUsed =
    totalBudget > 0
      ? Math.min((totalSpent / totalBudget) * 100, 100)
      : 0;

  // Category breakdown
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";

    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(expense.amount || 0);
  });

  const categories = Object.entries(categoryTotals)
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const highestCategory = categories[0];

  let healthTitle = "You're doing great! 🎉";
  let healthText = "Your spending is comfortably within your budget.";

  if (budgetUsed >= 90) {
    healthTitle = "Budget almost reached ⚠️";
    healthText = "You're very close to your monthly spending limit.";
  } else if (budgetUsed >= 70) {
    healthTitle = "Keep an eye on spending 👀";
    healthText = "You've used most of your available budget.";
  }

  return (
    <div className="insights-page">

      {/* HEADER */}
      <div className="insights-header">
        <div>
          <span className="section-label">FINANCIAL OVERVIEW</span>

          <h1>Your Insights</h1>

          <p>
            Understand where your money goes and make smarter spending
            decisions.
          </p>
        </div>

        <div className="insight-sparkle">✦</div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="insight-summary">

        <div className="summary-card">
          <div className="summary-icon spent-icon">↗</div>

          <div>
            <span>Total Spent</span>
            <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
            <small>Across all expenses</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon budget-icon">◎</div>

          <div>
            <span>Total Budget</span>
            <strong>₹{totalBudget.toLocaleString("en-IN")}</strong>
            <small>Your planned spending</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon remaining-icon">₹</div>

          <div>
            <span>Remaining</span>
            <strong>₹{remaining.toLocaleString("en-IN")}</strong>
            <small>Available to spend</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon usage-icon">%</div>

          <div>
            <span>Budget Used</span>
            <strong>{budgetUsed.toFixed(0)}%</strong>
            <small>Of your monthly budget</small>
          </div>
        </div>

      </div>

      {/* MAIN INSIGHTS */}
      <div className="insights-grid">

        {/* SPENDING OVERVIEW */}
        <div className="insight-panel spending-panel">

          <div className="panel-header">
            <div>
              <span className="panel-label">SPENDING</span>
              <h2>Spending Overview</h2>
            </div>

            <span className="panel-badge">
              {expenses.length} expenses
            </span>
          </div>

          {categories.length === 0 ? (
            <div className="empty-insight">
              <div>📊</div>
              <h3>No spending data yet</h3>
              <p>
                Add expenses to see your spending breakdown here.
              </p>
            </div>
          ) : (
            <div className="category-bars">

              {categories.map((category) => (
                <div className="category-row" key={category.name}>

                  <div className="category-info">
                    <span>{category.name}</span>

                    <strong>
                      ₹{category.amount.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="category-progress">
                    <div
                      className="category-progress-fill"
                      style={{
                        width: `${category.percentage}%`,
                      }}
                    ></div>
                  </div>

                  <span className="category-percent">
                    {category.percentage.toFixed(0)}%
                  </span>

                </div>
              ))}

            </div>
          )}
        </div>

        {/* BUDGET HEALTH */}
        <div className="insight-panel health-panel">

          <div className="panel-header">
            <div>
              <span className="panel-label">BUDGET</span>
              <h2>Budget Health</h2>
            </div>

            <span className="health-dot"></span>
          </div>

          <div
  className="health-circle"
  style={{
    "--progress": budgetUsed,
  }}
>

            <div className="health-circle-inner">
              <strong>{budgetUsed.toFixed(0)}%</strong>
              <span>used</span>
            </div>

          </div>

          <h3>{healthTitle}</h3>

          <p>{healthText}</p>

          <div className="health-progress">
            <div
              style={{
                width: `${budgetUsed}%`,
              }}
            ></div>
          </div>

          <div className="health-values">
            <span>₹{totalSpent.toLocaleString("en-IN")} spent</span>
            <span>₹{remaining.toLocaleString("en-IN")} left</span>
          </div>

        </div>

      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className="insight-panel category-panel">

        <div className="panel-header">

          <div>
            <span className="panel-label">ANALYSIS</span>
            <h2>Where Your Money Goes</h2>
          </div>

          <span className="panel-icon">◉</span>

        </div>

        {categories.length === 0 ? (
          <div className="empty-category">
            No expense categories available yet.
          </div>
        ) : (
          <div className="category-grid">

            {categories.map((category, index) => (
              <div className="category-card" key={category.name}>

                <div className="category-card-top">

                  <div className="category-number">
                    0{index + 1}
                  </div>

                  <span>
                    {category.percentage.toFixed(0)}%
                  </span>

                </div>

                <h3>{category.name}</h3>

                <strong>
                  ₹{category.amount.toLocaleString("en-IN")}
                </strong>

                <div className="mini-progress">
                  <div
                    style={{
                      width: `${category.percentage}%`,
                    }}
                  ></div>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* SMART INSIGHTS */}
      <div className="smart-grid">

        <div className="smart-card">

          <div className="smart-icon">💡</div>

          <div>
            <span>SMART INSIGHT</span>

            <h3>
              {highestCategory
                ? `${highestCategory.name} is your highest spending category`
                : "Start tracking your expenses"}
            </h3>

            <p>
              {highestCategory
                ? `You've spent ₹${highestCategory.amount.toLocaleString(
                    "en-IN"
                  )} on ${highestCategory.name} so far.`
                : "Add a few expenses and HomeFlow will start finding useful patterns for you."}
            </p>
          </div>

        </div>

        <div className="smart-card savings-card">

          <div className="smart-icon">🎯</div>

          <div>
            <span>SAVINGS OPPORTUNITY</span>

            <h3>
              ₹{remaining.toLocaleString("en-IN")} still available
            </h3>

            <p>
              Stay within your budget and use the remaining amount
              carefully this month.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Insights;