const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.activity.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🧹 Cleaned existing database records.');

  // Create Users
  const hashedPassword = await bcrypt.hash('Admin@123', 10);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Manoj Vijay',
      email: 'admin@clientflow.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const teamMember1 = await prisma.user.create({
    data: {
      name: 'Priya Sharma',
      email: 'priya@clientflow.com',
      password: hashedPassword,
      role: 'MEMBER',
    },
  });

  const teamMember2 = await prisma.user.create({
    data: {
      name: 'Rahul Verma',
      email: 'rahul@clientflow.com',
      password: hashedPassword,
      role: 'MEMBER',
    },
  });

  const teamMember3 = await prisma.user.create({
    data: {
      name: 'Anita Patel',
      email: 'anita@clientflow.com',
      password: hashedPassword,
      role: 'MEMBER',
    },
  });

  console.log(`👤 Created ${4} seed users.`);

  // Dates setup
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 5);
  const nextMonth = new Date(today); nextMonth.setDate(today.getDate() + 14);
  const pastDate = new Date(today); pastDate.setDate(today.getDate() - 3);

  // Seed Enquiries
  const sampleEnquiries = [
    {
      clientName: 'ABC Furniture',
      contactPerson: 'Rajesh Kumar',
      email: 'rajesh@abcfurniture.com',
      phone: '+91 98765 43210',
      source: 'WhatsApp',
      service: 'Website Development',
      description: 'Looking for a modernized e-commerce web platform to showcase custom furniture catalog with AR preview options.',
      budget: 85000,
      status: 'NEW',
      assignedTo: adminUser.id,
      followUpDate: today,
      notes: 'Initial inquiry via WhatsApp business line. High intent client.',
    },
    {
      clientName: 'Nova Technologies',
      contactPerson: 'Sarah Jenkins',
      email: 's.jenkins@novatech.io',
      phone: '+1 415 555 0192',
      source: 'Website',
      service: 'Custom Software',
      description: 'Need a multi-tenant client portal with automated invoicing and API integrations.',
      budget: 150000,
      status: 'QUALIFIED',
      assignedTo: teamMember1.id,
      followUpDate: tomorrow,
      notes: 'Scope review call completed. Requirements document approved.',
    },
    {
      clientName: 'GreenLeaf Interiors',
      contactPerson: 'Ananya Deshmukh',
      email: 'ananya@greenleaf.design',
      phone: '+91 91234 56789',
      source: 'Instagram',
      service: 'UI/UX Design',
      description: 'Complete UI revamp for eco-friendly architectural design portfolio app.',
      budget: 45000,
      status: 'CONTACTED',
      assignedTo: teamMember2.id,
      followUpDate: nextWeek,
      notes: 'Sent initial presentation deck. Awaiting feedback.',
    },
    {
      clientName: 'Skyline Solutions',
      contactPerson: 'Vikram Mehta',
      email: 'v.mehta@skylinesolutions.com',
      phone: '+91 99887 76655',
      source: 'Referral',
      service: 'Mobile App Development',
      description: 'Cross-platform React Native app for logistics tracking and fleet management.',
      budget: 200000,
      status: 'PROPOSAL_SENT',
      assignedTo: adminUser.id,
      followUpDate: tomorrow,
      notes: 'Commercial proposal sent via email. Follow up scheduled.',
    },
    {
      clientName: 'Urban Retail',
      contactPerson: 'Karan Singh',
      email: 'karan@urbanretail.in',
      phone: '+91 97654 32109',
      source: 'Direct Conversation',
      service: 'Digital Marketing',
      description: 'SEO strategy, paid search management, and content creation for retail expansion.',
      budget: 35000,
      status: 'NEGOTIATION',
      assignedTo: teamMember3.id,
      followUpDate: today,
      notes: 'Discussing milestone payments and campaign timeline.',
    },
    {
      clientName: 'PixelCraft Studio',
      contactPerson: 'Elena Rostova',
      email: 'elena@pixelcraft.co',
      phone: '+44 20 7946 0912',
      source: 'Email',
      service: 'Website Development',
      description: 'Creative portfolio website build with 3D WebGL interactions and fast loading times.',
      budget: 60000,
      status: 'WON',
      assignedTo: teamMember1.id,
      followUpDate: null,
      notes: 'Contract signed! Project kickoff set for next Monday.',
    },
    {
      clientName: 'Nexa Global',
      contactPerson: 'David Chen',
      email: 'dchen@nexaglobal.com',
      phone: '+1 650 332 9801',
      source: 'Website',
      service: 'Cloud Services',
      description: 'AWS migration and Kubernetes cluster deployment for microservices backend.',
      budget: 120000,
      status: 'QUALIFIED',
      assignedTo: adminUser.id,
      followUpDate: nextMonth,
      notes: 'Cloud architecture assessment completed.',
    },
    {
      clientName: 'Apex Healthcare',
      contactPerson: 'Dr. Ramesh Rao',
      email: 'contact@apexhealth.org',
      phone: '+91 94433 22110',
      source: 'Referral',
      service: 'Custom Software',
      description: 'Patient appointment booking & telemedicine software compliant with data security norms.',
      budget: 180000,
      status: 'NEW',
      assignedTo: teamMember2.id,
      followUpDate: pastDate,
      notes: 'Referred by Dr. Kapoor. Requires urgent follow-up.',
    },
    {
      clientName: 'BlueSky Logistics',
      contactPerson: 'Marcus Vance',
      email: 'marcus@blueskylogistics.net',
      phone: '+1 212 555 0178',
      source: 'Email',
      service: 'Software Development',
      description: 'Warehouse inventory tracking software with barcode scanner integration.',
      budget: 95000,
      status: 'LOST',
      assignedTo: teamMember3.id,
      followUpDate: null,
      notes: 'Client decided to delay software procurement until Q4.',
    },
    {
      clientName: 'Synergy Marketing',
      contactPerson: 'Pooja Hegde',
      email: 'pooja@synergyagency.in',
      phone: '+91 98112 23344',
      source: 'WhatsApp',
      service: 'UI/UX Design',
      description: 'Design system creation and Figma component library for marketing SaaS app.',
      budget: 50000,
      status: 'CONTACTED',
      assignedTo: teamMember1.id,
      followUpDate: nextWeek,
      notes: 'Shared design portfolio samples.',
    },
    {
      clientName: 'Crestline Corp',
      contactPerson: 'Robert Miller',
      email: 'rmiller@crestlinecorp.com',
      phone: '+1 312 555 0144',
      source: 'Direct Conversation',
      service: 'Cloud Services',
      description: 'DevOps automation pipeline setup with CI/CD and automated testing.',
      budget: 70000,
      status: 'PROPOSAL_SENT',
      assignedTo: adminUser.id,
      followUpDate: today,
      notes: 'Proposal under internal board review.',
    },
    {
      clientName: 'Zenith Media',
      contactPerson: 'Sofia Al-Mansoor',
      email: 'sofia@zenithmedia.ae',
      phone: '+971 4 321 8899',
      source: 'Instagram',
      service: 'Mobile App Development',
      description: 'Media streaming app for Android and iOS with offline download functionality.',
      budget: 220000,
      status: 'WON',
      assignedTo: teamMember2.id,
      followUpDate: null,
      notes: 'Advance deposit received. Sprint 1 started.',
    },
  ];

  for (const item of sampleEnquiries) {
    const enquiry = await prisma.enquiry.create({
      data: item,
    });

    // Create initial activity log
    await prisma.activity.create({
      data: {
        enquiryId: enquiry.id,
        userId: adminUser.id,
        action: 'ENQUIRY_CREATED',
        description: `Enquiry created for ${enquiry.clientName} (${enquiry.service}) with status ${enquiry.status}.`,
      },
    });
  }

  console.log(`📋 Created ${sampleEnquiries.length} seed enquiries with activity timeline records.`);
  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
