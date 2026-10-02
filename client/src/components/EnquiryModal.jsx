import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle } from 'lucide-react';

export default function EnquiryModal({ isOpen, onClose, onSave, editingEnquiry, teamMembers }) {
  const [formData, setFormData] = useState({
    clientName: '',
    contactPerson: '',
    email: '',
    phone: '',
    source: 'Website',
    service: '',
    budget: '',
    status: 'NEW',
    assignedTo: '',
    description: '',
    notes: '',
  });

  useEffect(() => {
    if (editingEnquiry) {
      setFormData({
        clientName: editingEnquiry.clientName || '',
        contactPerson: editingEnquiry.contactPerson || '',
        email: editingEnquiry.email || '',
        phone: editingEnquiry.phone || '',
        source: editingEnquiry.source || 'Website',
        service: editingEnquiry.service || '',
        budget: editingEnquiry.budget || '',
        status: editingEnquiry.status || 'NEW',
        assignedTo: editingEnquiry.assignedTo || '',
        description: editingEnquiry.description || '',
        notes: editingEnquiry.notes || '',
      });
    } else {
      setFormData({
        clientName: '',
        contactPerson: '',
        email: '',
        phone: '',
        source: 'Website',
        service: '',
        budget: '',
        status: 'NEW',
        assignedTo: teamMembers[0]?.name || 'Manoj Vijay',
        description: '',
        notes: '',
      });
    }
  }, [editingEnquiry, isOpen, teamMembers]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>
            {editingEnquiry ? 'Edit Business Enquiry' : 'Log New Client Enquiry'}
          </h2>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label>Client Company Name *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Apex Global Systems"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact Person Name *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  placeholder="client@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Service Requested *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="e.g. Mobile App Dev, UI Redesign"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Estimated Budget ($ USD)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="15000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Lead Source</label>
                <select
                  className="form-input"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                >
                  <option value="Website">Website Form</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Referral">Referral</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Email Campaign">Email Campaign</option>
                  <option value="Cold Call">Cold Call</option>
                </select>
              </div>

              <div className="form-group">
                <label>Assign To Team Member</label>
                <select
                  className="form-input"
                  value={formData.assignedTo}
                  onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                >
                  {teamMembers.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pipeline Stage / Status</label>
                <select
                  className="form-input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="NEW">NEW</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Requirement Description</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Brief summary of client requirements..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Internal Notes</label>
              <textarea
                className="form-textarea"
                rows="2"
                placeholder="Private team notes or follow-up details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-header" style={{ borderTop: '1px solid var(--border-color)', borderBottom: 'none', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              <span>{editingEnquiry ? 'Save Changes' : 'Create Enquiry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
