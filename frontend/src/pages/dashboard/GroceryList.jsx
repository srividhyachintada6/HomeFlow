import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./GroceryList.css";

function GroceryList() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Other");

  const fetchItems = () => {
    if (!user?.id) return;
    setLoading(true);

    fetch(`http://localhost:8080/api/grocery/user/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch grocery items");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching grocery items:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [user?.id]);

  const addItem = async () => {
    if (!itemName.trim()) {
      alert("Please enter an item name");
      return;
    }

    const newItem = {
      name: itemName,
      quantity: quantity ? Number(quantity) : 1,
      category,
      purchased: false,
      user: { id: user.id },
    };

    try {
      const response = await fetch("http://localhost:8080/api/grocery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error("Failed to add item");

      setItemName("");
      setQuantity("");
      setCategory("Other");
      fetchItems();
    } catch (error) {
      console.error("Error adding grocery item:", error);
      alert("Unable to add item");
    }
  };

  const toggleItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/grocery/${id}/toggle`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to toggle item");
      fetchItems();
    } catch (error) {
      console.error("Error toggling grocery item:", error);
      alert("Unable to update item");
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/grocery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");
      fetchItems();
    } catch (error) {
      console.error("Error deleting grocery item:", error);
      alert("Unable to delete item");
    }
  };

  const clearCompleted = async () => {
    const completed = items.filter((item) => item.purchased);
    try {
      await Promise.all(
        completed.map((item) =>
          fetch(`http://localhost:8080/api/grocery/${item.id}`, { method: "DELETE" })
        )
      );
      fetchItems();
    } catch (error) {
      console.error("Error clearing completed items:", error);
    }
  };

  const completedCount = items.filter((item) => item.purchased).length;
  const remainingCount = items.length - completedCount;

  return (
    <div className="grocery-page">
      <div className="grocery-header">
        <div>
          <p className="grocery-label">HOMEFLOW</p>
          <h1>Grocery List</h1>
          <p className="grocery-subtitle">Plan your shopping and keep your household organized.</p>
        </div>

        <div className="grocery-summary">
          <div className="summary-card"><span className="summary-number">{items.length}</span><span>Total Items</span></div>
          <div className="summary-card"><span className="summary-number">{remainingCount}</span><span>To Buy</span></div>
          <div className="summary-card"><span className="summary-number">{completedCount}</span><span>Completed</span></div>
        </div>
      </div>

      <div className="add-grocery-card">
        <div className="card-title">
          <div className="title-icon">+</div>
          <div><h2>Add Grocery Item</h2><p>Add something to your shopping list.</p></div>
        </div>

        <div className="grocery-form">
          <div className="input-group">
            <label>Item Name</label>
            <input type="text" placeholder="e.g. Tomatoes" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Quantity</label>
            <input type="text" placeholder="e.g. 2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Dairy</option>
              <option>Grains</option>
              <option>Meat</option>
              <option>Snacks</option>
              <option>Beverages</option>
              <option>Household</option>
              <option>Other</option>
            </select>
          </div>

          <button className="add-item-btn" onClick={addItem}>+ Add Item</button>
        </div>
      </div>

      <div className="list-card">
        <div className="list-header">
          <div>
            <h2>My Shopping List</h2>
            <p>
              {loading ? "Loading..." : remainingCount === 0
                ? "Everything is completed!"
                : `${remainingCount} item${remainingCount !== 1 ? "s" : ""} remaining`}
            </p>
          </div>

          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>Clear Completed</button>
          )}
        </div>

        <div className="grocery-items">
          {loading ? (
            <div className="empty-grocery"><p>Loading your grocery list...</p></div>
          ) : items.length === 0 ? (
            <div className="empty-grocery">
              <div className="empty-icon">🛒</div>
              <h3>Your grocery list is empty</h3>
              <p>Add your first grocery item above.</p>
            </div>
          ) : (
            items.map((item) => (
              <div className={`grocery-item ${item.purchased ? "completed" : ""}`} key={item.id}>
                <button
                  className={`check-button ${item.purchased ? "checked" : ""}`}
                  onClick={() => toggleItem(item.id)}
                >
                  {item.purchased ? "✓" : ""}
                </button>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="item-meta">
                    <span>{item.quantity}{item.unit ? ` ${item.unit}` : ""}</span>
                    <span className="dot">•</span>
                    <span>{item.category || "Other"}</span>
                  </div>
                </div>

                <button className="delete-button" onClick={() => deleteItem(item.id)} title="Delete item">🗑</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GroceryList;