import React from 'react';
import { Search, Plus, Bell, RefreshCw, Database } from 'lucide-react';

export default function Header({ title, searchTerm, setSearchTerm, onOpenModal, onRefresh, isLiveApi }) {
  return (
    <header className="top-header">
      <div className="header-title-group">
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        {/* Search */}
        <div className="search-bar">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search clients, emails, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Refresh API indicator */}
        <button className="btn btn-secondary btn-sm" onClick={onRefresh} title="Sync with API Server">
          <RefreshCw size={14} />
          <span>{isLiveApi ? 'API Connected' : 'Local Mode'}</span>
        </button>

        {/* Add Enquiry Button */}
        <button className="btn btn-primary" onClick={onOpenModal}>
          <Plus size={18} />
          <span>New Enquiry</span>
        </button>
      </div>
    </header>
  );
}
