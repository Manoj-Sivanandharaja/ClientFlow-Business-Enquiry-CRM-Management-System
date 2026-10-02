import React from 'react';
import { UserCheck, Shield, Mail, CheckCircle, Award } from 'lucide-react';

export default function TeamView({ teamMembers, enquiries }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="table-container" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.25rem' }}>Team Members & CRM Performance</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Manage team access roles and track enquiry assignment workload across your organization.
        </p>

        <div className="stats-grid">
          {teamMembers.map((member) => {
            const assignedEnquiries = enquiries.filter(e => e.assignedTo === member.name);
            const convertedDeals = assignedEnquiries.filter(e => e.status === 'CONVERTED').length;
            const totalValueWon = assignedEnquiries
              .filter(e => e.status === 'CONVERTED')
              .reduce((sum, e) => sum + (Number(e.budget) || 0), 0);

            return (
              <div key={member.id} className="stat-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '1.2rem' }}>
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{member.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Mail size={12} />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>System Role</span>
                  <span className="badge badge-NEW" style={{ fontSize: '0.7rem' }}>
                    <Shield size={12} /> {member.role}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Leads</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                      {assignedEnquiries.length}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Revenue Won</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-emerald)' }}>
                      ${totalValueWon.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
