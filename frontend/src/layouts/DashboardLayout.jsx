import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar'
import DashboardHeader from '../components/DashboardHeader'
import './DashboardLayout.css'

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <div className="dashboard-layout__main">
        <DashboardHeader />
        <div className="dashboard-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout