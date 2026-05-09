// src/components/admin/AdminDashboard.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminProjects from './AdminProjects';
import AdminBlogs from './AdminBlogs';
import AdminCareers from './AdminCareers';
import AdminTeam from './AdminTeam';
import AdminGallery from './AdminGallery';
import AdminContacts from './AdminContacts';
import AdminApplications from './AdminApplication';
// 👇 Import your logo
import logo from '../../assets/img.webp';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { key: 'projects', label: 'Projects', icon: '📁' },
    { key: 'blogs', label: 'Blogs', icon: '📝' },
    { key: 'careers', label: 'Careers', icon: '💼' },
    { key: 'team', label: 'Team', icon: '👥' },
    { key: 'gallery', label: 'Gallery', icon: '🖼️' },
    { key: 'contacts', label: 'Messages', icon: '📧' },
    { key: 'applications', label: 'Applications', icon: '📋' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* ==================== MOBILE OVERLAY ==================== */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ==================== SIDEBAR ==================== */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-40 w-72 h-full transition-transform duration-300 overflow-y-auto flex flex-col`}
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}
      >
        {/* Brand Section */}
<div className="p-5 border-b border-white/10">
  <div className="flex items-center gap-3 mb-4">
    <img 
      src={logo}
      alt="BCC Logo" 
      className="w-11 h-11 rounded-xl object-cover shadow-lg ring-2 ring-white/20"
      onError={(e) => {
        // Fallback: agar image load na ho to letter show karo
        e.target.style.display = 'none';
        e.target.parentElement.innerHTML = '<div class="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20">B</div>';
      }}
    />
    <div>
      <h2 className="text-white font-bold text-base leading-tight tracking-tight">
        Building Creators
      </h2>
      <p className="text-blue-400 text-[11px] font-medium tracking-wide">
        And Consulting
      </p>
    </div>
  </div>
  {/* ... */}
</div>
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold px-3 mb-2">
            Main Menu
          </p>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.key && (
                <span className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-sm font-medium"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Mobile Toggle + Breadcrumb */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800 capitalize">
                  {tabs.find(t => t.key === activeTab)?.label}
                </h1>
                <p className="text-xs text-gray-500">
                  Manage your {tabs.find(t => t.key === activeTab)?.label?.toLowerCase()} here
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Online</span>
              </div>
              <button
                onClick={logout}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <span>🚪</span> Logout
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="px-4 md:px-6 pb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Active Tab', value: tabs.find(t => t.key === activeTab)?.label, color: 'blue' },
              { label: 'User Role', value: 'Administrator', color: 'green' },
              { label: 'Status', value: 'Online', color: 'emerald' },
              { label: 'Version', value: 'v1.0.0', color: 'purple' },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-sm font-semibold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {activeTab === 'projects' && <AdminProjects />}
          {activeTab === 'blogs' && <AdminBlogs />}
          {activeTab === 'careers' && <AdminCareers />}
          {activeTab === 'team' && <AdminTeam />}
          {activeTab === 'gallery' && <AdminGallery />}
          {activeTab === 'applications' && <AdminApplications />}
          {activeTab === 'contacts' && <AdminContacts />}

        </div>
      </main>
    </div>
  );
}
