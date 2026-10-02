import React from 'react';
import { DollarSign, Mail, User, Calendar, Tag, ArrowRight } from 'lucide-react';

export default function KanbanView({ enquiries, onStatusChange, onEdit }) {
  const columns = [
    { key: 'NEW', title: 'New Leads', color: '#818cf8' },
    { key: 'IN_PROGRESS', title: 'In Progress', color: '#fbbf24' },
    { key: 'PROPOSAL_SENT', title: 'Proposal Sent', color: '#c084fc' },
    { key: 'CONVERTED', title: 'Won / Converted', color: '#34d399' },
    { key: 'LOST', title: 'Lost', color: '#f87171' },
  ];

  return (
    <div className="kanban-grid">
      {columns.map((col) => {
        const columnEnquiries = enquiries.filter(e => e.status === col.key);
        const colTotalValue = columnEnquiries.reduce((sum, e) => sum + (Number(e.budget) || 0), 0);

        return (
          <div key={col.key} className="kanban-column">
            <div className="kanban-header">
              <div className="kanban-title">
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: col.color, display: 'inline-block' }} />
                <span>{col.title}</span>
                <span className="count-pill">{columnEnquiries.length}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                ${colTotalValue.toLocaleString()}
              </div>
            </div>

            <div className="kanban-cards">
              {columnEnquiries.length === 0 ? (
                <div style={{ textTransform: 'uppercase', fontSize: '0.7rem', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0', letterSpacing: '0.05em' }}>
                  No deals
                </div>
              ) : (
                columnEnquiries.map((enq) => (
                  <div key={enq.id} className="kanban-card" onClick={() => onEdit(enq)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{enq.clientName}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                        ${Number(enq.budget || 0).toLocaleString()}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {enq.service}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <User size={12} />
                      <span>{enq.contactPerson}</span>
                    </div>

                    {enq.assignedTo && (
                      <div style={{ fontSize: '0.725rem', color: 'var(--accent-primary)', fontWeight: '500' }}>
                        Assigned: {enq.assignedTo}
                      </div>
                    )}

                    {/* Move Stage Selector */}
                    <div
                      style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Move Stage:</span>
                      <select
                        value={enq.status}
                        onChange={(e) => onStatusChange(enq.id, e.target.value)}
                        style={{
                          background: 'rgba(0,0,0,0.4)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.4rem'
                        }}
                      >
                        {columns.map(c => (
                          <option key={c.key} value={c.key}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
