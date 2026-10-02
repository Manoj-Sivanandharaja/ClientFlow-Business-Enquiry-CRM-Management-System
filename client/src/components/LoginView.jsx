import React, { useState } from 'react';
import { Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('admin@clientflow.com');
  const [password, setPassword] = useState('Admin@123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: email.includes('admin') ? 'Manoj Vijay' : 'Team Member',
      email,
      role: email.includes('admin') ? 'ADMIN' : 'MEMBER'
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div style={{ textAlign: 'center' }}>
          <div className="brand-icon" style={{ margin: '0 auto 1rem', width: '52px', height: '52px' }}>
            <Sparkles size={28} />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800' }}>ClientFlow</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Business Enquiry & CRM Management System
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label>Work Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '2.5rem', width: '100%' }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '2.5rem', width: '100%' }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}>
            <span>Sign In to Workspace</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div>Demo Credentials Pre-filled</div>
          <div style={{ color: 'var(--accent-primary)', marginTop: '0.2rem' }}>admin@clientflow.com • Admin@123</div>
        </div>
      </div>
    </div>
  );
}
