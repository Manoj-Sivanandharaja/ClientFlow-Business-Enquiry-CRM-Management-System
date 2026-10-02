// ClientFlow API Service Layer
const API_BASE_URL = 'http://localhost:5000/api';

// Initial Mock Seed Data Fallback if server is starting or offline
export const INITIAL_MOCK_ENQUIRIES = [
  {
    id: 'enq-1',
    clientName: 'Apex Financial Services',
    contactPerson: 'David Miller',
    email: 'david@apexfin.com',
    phone: '+1 (555) 234-5678',
    source: 'Website',
    service: 'Custom Enterprise Software',
    description: 'Looking for a cloud-based CRM and automated invoicing integration.',
    budget: 25000,
    status: 'PROPOSAL_SENT',
    assignedTo: 'Manoj Vijay',
    followUpDate: '2026-10-15',
    notes: 'Proposal sent on Oct 1st. Waiting for board approval.',
    createdAt: '2026-09-28T10:00:00.000Z'
  },
  {
    id: 'enq-2',
    clientName: 'Vanguard Retail Tech',
    contactPerson: 'Sarah Jenkins',
    email: 'sarah@vanguardtech.io',
    phone: '+1 (555) 876-5432',
    source: 'LinkedIn',
    service: 'Mobile App Development',
    description: 'Requires iOS and Android app for retail inventory management.',
    budget: 18000,
    status: 'IN_PROGRESS',
    assignedTo: 'Priya Sharma',
    followUpDate: '2026-10-08',
    notes: 'Initial scope meeting completed.',
    createdAt: '2026-09-30T14:30:00.000Z'
  },
  {
    id: 'enq-3',
    clientName: 'BioHealth Solutions',
    contactPerson: 'Dr. Alan Vance',
    email: 'alan@biohealth.org',
    phone: '+1 (555) 345-6789',
    source: 'Referral',
    service: 'UI/UX Redesign',
    description: 'Complete overhaul of clinical portal workflow UI.',
    budget: 12500,
    status: 'NEW',
    assignedTo: 'Rahul Verma',
    followUpDate: '2026-10-05',
    notes: 'Received enquiry via partner referral.',
    createdAt: '2026-10-01T09:15:00.000Z'
  },
  {
    id: 'enq-4',
    clientName: 'Starlight Logistics',
    contactPerson: 'Karen Lee',
    email: 'karen@starlightlogistics.com',
    phone: '+1 (555) 901-2345',
    source: 'Google Ads',
    service: 'Cloud Migration & DevOps',
    description: 'Migration from legacy on-prem servers to AWS.',
    budget: 35000,
    status: 'CONVERTED',
    assignedTo: 'Manoj Vijay',
    followUpDate: null,
    notes: 'Contract signed! Onboarding starting next week.',
    createdAt: '2026-09-20T11:00:00.000Z'
  },
  {
    id: 'enq-5',
    clientName: 'Nexus E-Commerce',
    contactPerson: 'Mark Taylor',
    email: 'mtaylor@nexustore.com',
    phone: '+1 (555) 654-3210',
    source: 'Email Campaign',
    service: 'SEO & Performance Optimization',
    description: 'Optimization for high traffic seasonal sale.',
    budget: 5000,
    status: 'LOST',
    assignedTo: 'Priya Sharma',
    followUpDate: null,
    notes: 'Client went with lower cost agency.',
    createdAt: '2026-09-15T16:00:00.000Z'
  }
];

export const INITIAL_TEAM = [
  { id: 'usr-1', name: 'Manoj Vijay', email: 'admin@clientflow.com', role: 'ADMIN', activeDeals: 2 },
  { id: 'usr-2', name: 'Priya Sharma', email: 'priya@clientflow.com', role: 'MEMBER', activeDeals: 2 },
  { id: 'usr-3', name: 'Rahul Verma', email: 'rahul@clientflow.com', role: 'MEMBER', activeDeals: 1 }
];

export async function fetchEnquiriesFromApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`);
    if (!res.ok) throw new Error('API server returned error status');
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn('Backend API offline or unreachable, using local fallback:', err.message);
    return null;
  }
}

export async function fetchStatsFromApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!res.ok) throw new Error('API server returned error status');
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    return null;
  }
}
