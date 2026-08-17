import Sidebar from '../components/Sidebar'
import './MainLayout.css'

function MainLayout({ activePage, onNavigate, children }) {
  return (
    <div className="main-layout">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <main className="main-layout__content">{children}</main>
    </div>
  )
}

export default MainLayout