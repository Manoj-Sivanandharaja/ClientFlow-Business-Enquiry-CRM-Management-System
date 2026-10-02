import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import EnquiriesView from './components/EnquiriesView';
import KanbanView from './components/KanbanView';
import TeamView from './components/TeamView';
import EnquiryModal from './components/EnquiryModal';
import LoginView from './components/LoginView';
import {
  INITIAL_MOCK_ENQUIRIES,
  INITIAL_TEAM,
  fetchEnquiriesFromApi
} from './services/api';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState({ name: 'Manoj Vijay', email: 'admin@clientflow.com', role: 'ADMIN' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [enquiries, setEnquiries] = useState(INITIAL_MOCK_ENQUIRIES);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEnquiry, setEditingEnquiry] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLiveApi, setIsLiveApi] = useState(false);

  // Sync with API on mount & refresh
  const syncWithApi = async () => {
    const apiData = await fetchEnquiriesFromApi();
    if (apiData && Array.isArray(apiData)) {
      setEnquiries(apiData);
      setIsLiveApi(true);
      showToast('Synced with API Server database!');
    } else {
      setIsLiveApi(false);
    }
  };

  useEffect(() => {
    syncWithApi();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCreateOrUpdate = async (formData) => {
    if (editingEnquiry) {
      // Update
      const updated = enquiries.map((item) =>
        item.id === editingEnquiry.id ? { ...item, ...formData } : item
      );
      setEnquiries(updated);
      showToast(`Updated enquiry for ${formData.clientName}`);
    } else {
      // Create new
      const newRecord = {
        id: `enq-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setEnquiries([newRecord, ...enquiries]);
      showToast(`Logged new enquiry from ${formData.clientName}`);
    }
    setIsModalOpen(false);
    setEditingEnquiry(null);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
    showToast(`Updated status to ${newStatus.replace('_', ' ')}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      setEnquiries(enquiries.filter((e) => e.id !== id));
      showToast('Enquiry deleted successfully.');
    }
  };

  const handleOpenEditModal = (enq) => {
    setEditingEnquiry(enq);
    setIsModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setEditingEnquiry(null);
    setIsModalOpen(true);
  };

  if (!user) {
    return <LoginView onLogin={(userData) => setUser(userData)} />;
  }

  const tabTitles = {
    dashboard: 'Executive Dashboard',
    enquiries: 'All Client Enquiries',
    kanban: 'Pipeline Stage Board',
    team: 'Team Performance & Roles',
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={() => setUser(null)}
      />

      {/* Main Workspace */}
      <div className="main-wrapper">
        <Header
          title={tabTitles[activeTab]}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenModal={handleOpenCreateModal}
          onRefresh={syncWithApi}
          isLiveApi={isLiveApi}
        />

        <main className="content-body">
          {activeTab === 'dashboard' && (
            <DashboardView
              enquiries={enquiries}
              onSelectTab={setActiveTab}
              onOpenModal={handleOpenCreateModal}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiriesView
              enquiries={enquiries}
              searchTerm={searchTerm}
              onEdit={handleOpenEditModal}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === 'kanban' && (
            <KanbanView
              enquiries={enquiries}
              onStatusChange={handleStatusChange}
              onEdit={handleOpenEditModal}
            />
          )}

          {activeTab === 'team' && (
            <TeamView
              teamMembers={teamMembers}
              enquiries={enquiries}
            />
          )}
        </main>
      </div>

      {/* Modal Dialog */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        editingEnquiry={editingEnquiry}
        teamMembers={teamMembers}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
