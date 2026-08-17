
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Bills.css";

function Bills() {
  const { user } = useAuth();
  const userId = user?.id;

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    dueDate: "",
    category: "",
    status: "PENDING",
  });

  // Fetch bills
  const fetchBills = () => {
    if (!userId) return;

    setLoading(true);

    fetch(`http://localhost:8080/api/bills/user/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bills");
        }
        return response.json();
      })
      .then((data) => {
        setBills(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBills();
  }, [userId]);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add bill
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBill = {
      title: formData.title,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      category: formData.category,
      status: formData.status,
      user: {
        id: userId,
      },
    };

    try {
      const response = await fetch("http://localhost:8080/api/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBill),
      });

      if (!response.ok) {
        throw new Error("Failed to add bill");
      }

      setFormData({
        title: "",
        amount: "",
        dueDate: "",
        category: "",
        status: "PENDING",
      });

      setShowForm(false);
      fetchBills();
    } catch (error) {
      console.error("Error adding bill:", error);
      alert("Unable to add bill");
    }
  };

  // Delete bill
  const deleteBill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/bills/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete bill");
      }

      fetchBills();
    } catch (error) {
      console.error("Error deleting bill:", error);
      alert("Unable to delete bill");
    }
  };

  // Mark bill as paid
  const markAsPaid = async (bill) => {
    const updatedBill = {
      title: bill.title,
      amount: bill.amount,
      dueDate: bill.dueDate,
      category: bill.category,
      status: "PAID",
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/bills/${bill.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBill),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update bill");
      }

      fetchBills();
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Unable to update bill");
    }
  };

  // Statistics
  const totalBills = bills.length;

  const pendingBills = bills.filter(
    (bill) => bill.status !== "PAID"
  ).length;

  const paidBills = bills.filter(
    (bill) => bill.status === "PAID"
  ).length;

  const totalAmount = bills.reduce(
    (total, bill) => total + Number(bill.amount || 0),
    0
  );

  const pendingAmount = bills
    .filter((bill) => bill.status !== "PAID")
    .reduce(
      (total, bill) => total + Number(bill.amount || 0),
      0
    );

  return (
    <div className="bills-page">

      {/* Header */}
      <div className="bills-header">
        <div>
          <p className="bills-small-title">HOMEFLOW</p>
          <h1>My Bills</h1>
          <p className="bills-subtitle">
            Keep track of your upcoming and recurring payments.
          </p>
        </div>

        <button
          className="add-bill-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close" : "+ Add Bill"}
        </button>
      </div>

      {/* Statistics */}
      <div className="bill-stats">

        <div className="bill-stat-card">
          <span className="stat-icon">🧾</span>
          <div>
            <p>Total Bills</p>
            <h2>{totalBills}</h2>
          </div>
        </div>

        <div className="bill-stat-card">
          <span className="stat-icon">⏳</span>
          <div>
            <p>Pending</p>
            <h2>{pendingBills}</h2>
          </div>
        </div>

        <div className="bill-stat-card">
          <span className="stat-icon">✓</span>
          <div>
            <p>Paid</p>
            <h2>{paidBills}</h2>
          </div>
        </div>

        <div className="bill-stat-card">
          <span className="stat-icon">₹</span>
          <div>
            <p>Pending Amount</p>
            <h2>₹{pendingAmount.toLocaleString()}</h2>
          </div>
        </div>

      </div>

      {/* Add Bill Form */}
      {showForm && (
        <div className="bill-form-card">

          <h2>Add New Bill</h2>
          <p>Enter the details of your upcoming payment.</p>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Bill Name</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Electricity Bill"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="1500"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Internet">Internet</option>
                  <option value="Rent">Rent</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            <button className="save-bill-btn" type="submit">
              Save Bill
            </button>

          </form>
        </div>
      )}

      {/* Bills */}
      <div className="bills-section">

        <div className="section-heading">
          <div>
            <h2>Upcoming Bills</h2>
            <p>Your scheduled payments</p>
          </div>

          <div className="total-bill-amount">
            Total ₹{totalAmount.toLocaleString()}
          </div>
        </div>

        {loading ? (
          <div className="empty-bills">
            <div className="loading-circle"></div>
            <p>Loading your bills...</p>
          </div>
        ) : bills.length === 0 ? (
          <div className="empty-bills">
            <div className="empty-icon">🧾</div>
            <h3>No bills yet</h3>
            <p>
              Add your first bill to start tracking your payments.
            </p>

            <button
              className="empty-add-btn"
              onClick={() => setShowForm(true)}
            >
              + Add Your First Bill
            </button>
          </div>
        ) : (
          <div className="bills-list">

            {bills.map((bill) => {

              const isPaid = bill.status === "PAID";

              return (
                <div
                  className={`bill-card ${
                    isPaid ? "bill-paid" : ""
                  }`}
                  key={bill.id}
                >

                  <div className="bill-left">

                    <div className="bill-icon">
                      {bill.category === "Electricity"
                        ? "⚡"
                        : bill.category === "Internet"
                        ? "🌐"
                        : bill.category === "Rent"
                        ? "🏠"
                        : bill.category === "Mobile"
                        ? "📱"
                        : "🧾"}
                    </div>

                    <div className="bill-info">

                      <h3>{bill.title}</h3>

                      <p>
                        {bill.category || "Other"} • Due{" "}
                        {bill.dueDate}
                      </p>

                    </div>

                  </div>

                  <div className="bill-right">

                    <div className="bill-price">
                      ₹{Number(bill.amount).toLocaleString()}
                    </div>

                    <span
                      className={`bill-status ${
                        isPaid ? "paid" : "pending"
                      }`}
                    >
                      {isPaid ? "PAID" : "PENDING"}
                    </span>

                    {!isPaid && (
                      <button
                        className="paid-btn"
                        onClick={() => markAsPaid(bill)}
                      >
                        Mark Paid
                      </button>
                    )}

                    <button
                      className="delete-bill-btn"
                      onClick={() => deleteBill(bill.id)}
                    >
                      🗑
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default Bills;
