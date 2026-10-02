import React from 'react';
import { LayoutDashboard, Users, FolderKanban, ShieldCheck, LogOut, Layers, Sparkles } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'enquiries', label: 'All Enquiries', icon: Layers },
    { id: 'kanban', label: 'Pipeline Board', icon: FolderKanban },
    { id: 'team', label: 'Team & Roles', icon: Users },
  ];

  return (
    <aside className="sidebar">
      <div className="brand-logo">
        <div className="brand-icon">
          <Sparkles size={22} />
        </div>
        <div>
          <div className="brand-title">ClientFlow</div>
          <div className="brand-subtitle">CRM & Enquiry Engine</div>
        </div>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="user-profile-badge">
        <div className="avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
        </div>
        <div className="user-info">
          <div className="user-name">{user?.name || 'Manoj Vijay'}</div>
          <div className="user-role">{user?.role || 'ADMIN'}</div>
        </div>
        <button
          className="btn btn-secondary btn-icon-only"
          onClick={onLogout}
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
