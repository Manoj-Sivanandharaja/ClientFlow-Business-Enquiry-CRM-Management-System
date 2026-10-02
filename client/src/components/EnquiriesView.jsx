import React, { useState } from 'react';
import { Edit2, Trash2, Mail, Phone, Calendar, Filter, UserCheck, DollarSign } from 'lucide-react';

export default function EnquiriesView({ enquiries, searchTerm, onEdit, onDelete, onStatusChange }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      enq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enq.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || enq.status === statusFilter;
    const matchesSource = sourceFilter === 'ALL' || enq.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const sources = Array.from(new Set(enquiries.map(e => e.source).filter(Boolean)));

  return (
    <div className="table-container">
      {/* Filters Toolbar */}
      <div className="table-header-toolbar">
        <div className="filter-group">
          <Filter size={16} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Filters:</span>

          <select
            className="select-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PROPOSAL_SENT">Proposal Sent</option>
            <option value="CONVERTED">Converted</option>
            <option value="LOST">Lost</option>
          </select>

          <select
            className="select-input"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="ALL">All Sources</option>
            {sources.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredEnquiries.length}</strong> of {enquiries.length} enquiries
        </div>
      </div>

      {/* Enquiries Table */}
      <table className="custom-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Contact Details</th>
            <th>Service Requested</th>
            <th>Budget</th>
            <th>Source</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEnquiries.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                No enquiries found matching your filters.
              </td>
            </tr>
          ) : (
            filteredEnquiries.map((enq) => (
              <tr key={enq.id}>
                <td>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{enq.clientName}</div>
                  {enq.description && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {enq.description}
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{enq.contactPerson}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <Mail size={12} /> {enq.email}
                  </div>
                  {enq.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Phone size={12} /> {enq.phone}
                    </div>
                  )}
                </td>
                <td>
                  <span style={{ fontWeight: '600' }}>{enq.service}</span>
                </td>
                <td>
                  <span style={{ fontWeight: '700', color: 'var(--accent-emerald)' }}>
                    ${Number(enq.budget || 0).toLocaleString()}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                    {enq.source}
                  </span>
                </td>
                <td>
                  <select
                    className={`badge badge-${enq.status}`}
                    value={enq.status}
                    onChange={(e) => onStatusChange(enq.id, e.target.value)}
                    style={{ cursor: 'pointer', border: 'none', outline: 'none' }}
                  >
                    <option value="NEW">NEW</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="PROPOSAL_SENT">PROPOSAL SENT</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="LOST">LOST</option>
                  </select>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                    {enq.assignedTo || 'Unassigned'}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="btn btn-secondary btn-icon-only"
                      onClick={() => onEdit(enq)}
                      title="Edit Enquiry"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="btn btn-secondary btn-icon-only"
                      onClick={() => onDelete(enq.id)}
                      title="Delete Enquiry"
                      style={{ color: 'var(--accent-rose)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
