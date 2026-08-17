import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../css/Profile.css";

function Profile() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", monthlySalary: "" });

  const loadProfile = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:8080/api/users/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to load profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user?.id]);

  const startEditing = () => {
    setForm({
      name: profile?.name || "",
      monthlySalary: profile?.monthlySalary ?? "",
    });
    setEditing(true);
  };

  const cancelEditing = () => {
    if (saving) return;
    setEditing(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    if (form.monthlySalary !== "" && Number(form.monthlySalary) < 0) {
      setError("Monthly salary cannot be negative.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `http://localhost:8080/api/users/${user.id}/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            monthlySalary:
              form.monthlySalary === "" ? 0 : Number(form.monthlySalary),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const updated = await response.json();
      setProfile(updated);

      // Keep the auth session's name in sync (used across the sidebar/header)
      setUser((prev) => (prev ? { ...prev, name: updated.name } : prev));

      setEditing(false);
    } catch (err) {
      console.error(err);
      setError("Could not save your changes.");
    } finally {
      setSaving(false);
    }
  };

  const currency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const initials = (name) =>
    (name || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "?";

  const memberSince = (createdAt) => {
    if (!createdAt) return "—";
    return new Date(createdAt).toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p className="profile-loading">Loading your profile…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page">
        <p className="profile-loading">{error || "Unable to load profile."}</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <span className="profile-label">ACCOUNT</span>
          <h1>Your Profile</h1>
          <p>Manage your personal information and household account.</p>
        </div>
      </div>

      {error && <div className="profile-error">{error}</div>}

      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">{initials(profile.name)}</div>

          <h2>{profile.name}</h2>
          <p className="profile-role">HomeFlow User</p>

          {!editing && (
            <button className="edit-profile-btn" onClick={startEditing}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Personal Information */}
        <div className="profile-info-card">
          <div className="card-title">
            <h2>Personal Information</h2>
            <p>Your account details</p>
          </div>

          {!editing ? (
            <div className="profile-fields">
              <div className="profile-field">
                <label>Full Name</label>
                <div className="field-value">{profile.name}</div>
              </div>

              <div className="profile-field">
                <label>Email</label>
                <div className="field-value">{profile.email}</div>
              </div>

              <div className="profile-field">
                <label>Monthly Salary</label>
                <div className="field-value">
                  {currency(profile.monthlySalary)}
                </div>
              </div>

              <div className="profile-field">
                <label>Account Type</label>
                <div className="field-value">Household User</div>
              </div>
            </div>
          ) : (
            <form className="profile-edit-form" onSubmit={handleSave}>
              <div className="profile-field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label>Email</label>
                <div className="field-value field-value--locked">
                  {profile.email}
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="monthlySalary">Monthly Salary (₹)</label>
                <input
                  id="monthlySalary"
                  name="monthlySalary"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="50000"
                  value={form.monthlySalary}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-edit-actions">
                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={cancelEditing}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="edit-profile-btn"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Account Information */}
      <div className="account-card">
        <div>
          <h2>Account</h2>
          <p>Manage your HomeFlow account</p>
        </div>

        <div className="account-row">
          <span>Member since</span>
          <strong>{memberSince(profile.createdAt)}</strong>
        </div>

        <div className="account-row">
          <span>Account status</span>
          <strong className="active-status">Active</strong>
        </div>
      </div>
    </div>
  );
}

export default Profile;
