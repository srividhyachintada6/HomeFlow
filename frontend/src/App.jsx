import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Overview from "./pages/dashboard/Overview";
import Expenses from "./pages/dashboard/Expenses";
import Budget from "./pages/Budget";
import Bills from "./pages/dashboard/Bills";
import GroceryList from "./pages/dashboard/GroceryList";
import Insights from "./pages/dashboard/Insights";
import Settings from "./pages/dashboard/Settings";
import Profile from "./pages/dashboard/Profile";

import PlaceholderPage from "./pages/dashboard/PlaceholderPage";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ================= PROTECTED DASHBOARD ================= */}

      <Route
        path="/dashboard"
        element={<ProtectedRoute />}
      >

        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            index
            element={<Overview />}
          />

          {/* Expenses */}
          <Route
            path="expenses"
            element={<Expenses />}
          />

          {/* Budget */}
          <Route
            path="budget"
            element={<Budget />}
          />

          {/* Bills */}
          <Route
            path="bills"
            element={<Bills />}
          />

          {/* Grocery */}
          <Route
            path="grocery"
            element={<GroceryList />}
          />

          {/* Insights */}
          <Route
            path="insights"
            element={<Insights />}
          />
          <Route path="profile" element={<Profile />} />

          {/* Settings */}
          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Route>

    </Routes>
  );
}

export default App;