import React from 'react';
import { TrendingUp, Users, DollarSign, Clock, CheckCircle2, AlertCircle, ArrowUpRight, Calendar, UserCheck } from 'lucide-react';

export default function DashboardView({ enquiries, onSelectTab, onOpenModal }) {
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => e.status === 'NEW').length;
  const inProgressEnquiries = enquiries.filter(e => e.status === 'IN_PROGRESS' || e.status === 'PROPOSAL_SENT').length;
  const convertedEnquiries = enquiries.filter(e => e.status === 'CONVERTED').length;
  const lostEnquiries = enquiries.filter(e => e.status === 'LOST').length;

  const totalPipelineValue = enquiries
    .filter(e => e.status !== 'LOST')
    .reduce((sum, e) => sum + (Number(e.budget) || 0), 0);

  const convertedValue = enquiries
    .filter(e => e.status === 'CONVERTED')
    .reduce((sum, e) => sum + (Number(e.budget) || 0), 0);

  const conversionRate = totalEnquiries > 0 ? ((convertedEnquiries / totalEnquiries) * 100).toFixed(1) : 0;

  const recentEnquiries = [...enquiries]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="dashboard-container">
      {/* Metric Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Enquiries</span>
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="stat-value">{totalEnquiries}</div>
          <div className="stat-subtitle">{newEnquiries} new lead(s) requiring action</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Pipeline Value</span>
            <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div className="stat-value">${totalPipelineValue.toLocaleString()}</div>
          <div className="stat-subtitle">${convertedValue.toLocaleString()} won revenue</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Conversion Rate</span>
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="stat-value">{conversionRate}%</div>
          <div className="stat-subtitle">{convertedEnquiries} converted out of {totalEnquiries}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Active In-Progress</span>
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Clock size={20} />
            </div>
          </div>
          <div className="stat-value">{inProgressEnquiries}</div>
          <div className="stat-subtitle">Proposals & negotiations</div>
        </div>
      </div>

      {/* Main Grid: Recent Activity & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Recent Enquiries Table */}
        <div className="table-container">
          <div className="table-header-toolbar">
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Recent Client Enquiries</h3>
            <button className="btn btn-secondary btn-sm" onClick={() => onSelectTab('enquiries')}>
              <span>View All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Client / Contact</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((enq) => (
                <tr key={enq.id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>{enq.clientName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enq.contactPerson}</div>
                  </td>
                  <td>{enq.service}</td>
                  <td style={{ fontWeight: '600', color: 'var(--accent-emerald)' }}>
                    ${Number(enq.budget || 0).toLocaleString()}
                  </td>
                  <td>
                    <span className={`badge badge-${enq.status}`}>
                      {enq.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem' }}>
                      <UserCheck size={14} style={{ color: 'var(--accent-primary)' }} />
                      <span>{enq.assignedTo || 'Unassigned'}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Panel: Pipeline Summary & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="table-container" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Stage Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>New Leads</span>
                  <span style={{ fontWeight: '600' }}>{newEnquiries}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${totalEnquiries ? (newEnquiries / totalEnquiries) * 100 : 0}%`, height: '100%', background: '#818cf8' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>In Progress / Proposal</span>
                  <span style={{ fontWeight: '600' }}>{inProgressEnquiries}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${totalEnquiries ? (inProgressEnquiries / totalEnquiries) * 100 : 0}%`, height: '100%', background: '#fbbf24' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>Converted Deals</span>
                  <span style={{ fontWeight: '600' }}>{convertedEnquiries}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${totalEnquiries ? (convertedEnquiries / totalEnquiries) * 100 : 0}%`, height: '100%', background: '#34d399' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>Closed / Lost</span>
                  <span style={{ fontWeight: '600' }}>{lostEnquiries}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${totalEnquiries ? (lostEnquiries / totalEnquiries) * 100 : 0}%`, height: '100%', background: '#f87171' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="table-container" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Quick Actions</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Add new client request or jump to the visual pipeline board.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
              <button className="btn btn-primary" onClick={onOpenModal}>
                + Log New Enquiry
              </button>
              <button className="btn btn-secondary" onClick={() => onSelectTab('kanban')}>
                Open Pipeline Board
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
