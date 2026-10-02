const prisma = require('../config/db');
const { successResponse } = require('../utils/apiResponse');

const getDashboardStats = async (req, res, next) => {
  try {
    const allEnquiries = await prisma.enquiry.findMany({
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalEnquiries = allEnquiries.length;

    const newEnquiries = allEnquiries.filter((e) => e.status === 'NEW').length;

    const activeStatuses = ['CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION'];
    const activeEnquiries = allEnquiries.filter((e) => activeStatuses.includes(e.status)).length;

    const wonEnquiries = allEnquiries.filter((e) => e.status === 'WON').length;
    const lostEnquiries = allEnquiries.filter((e) => e.status === 'LOST').length;

    // Follow-ups due today or overdue (followUpDate <= end of today and status is not WON/LOST)
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const followUpsDue = allEnquiries.filter((e) => {
      if (!e.followUpDate) return false;
      if (e.status === 'WON' || e.status === 'LOST') return false;
      const fDate = new Date(e.followUpDate);
      return fDate <= endOfToday;
    }).length;

    // Calculate total pipeline value (sum of budgets for active and won enquiries)
    const totalPipelineValue = allEnquiries
      .filter((e) => e.status !== 'LOST')
      .reduce((sum, e) => sum + (e.budget || 0), 0);

    // Distribution by Status
    const statusCounts = {};
    const ALL_STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST'];
    ALL_STATUSES.forEach((s) => (statusCounts[s] = 0));

    allEnquiries.forEach((e) => {
      if (statusCounts[e.status] !== undefined) {
        statusCounts[e.status] += 1;
      } else {
        statusCounts[e.status] = 1;
      }
    });

    const statusDistribution = Object.keys(statusCounts).map((status) => ({
      name: status,
      count: statusCounts[status],
    }));

    // Distribution by Source
    const sourceCounts = {};
    allEnquiries.forEach((e) => {
      sourceCounts[e.source] = (sourceCounts[e.source] || 0) + 1;
    });

    const sourceDistribution = Object.keys(sourceCounts).map((source) => ({
      name: source,
      count: sourceCounts[source],
    }));

    // Recent 5 enquiries
    const recentEnquiries = allEnquiries.slice(0, 5);

    // Upcoming follow-ups (followUpDate >= beginning of today, sorted by followUpDate ascending)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const upcomingFollowUps = allEnquiries
      .filter((e) => e.followUpDate && new Date(e.followUpDate) >= startOfToday && e.status !== 'WON' && e.status !== 'LOST')
      .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate))
      .slice(0, 5);

    const stats = {
      metrics: {
        totalEnquiries,
        newEnquiries,
        activeEnquiries,
        wonEnquiries,
        lostEnquiries,
        followUpsDue,
        totalPipelineValue,
      },
      statusDistribution,
      sourceDistribution,
      recentEnquiries,
      upcomingFollowUps,
    };

    return successResponse(res, 200, 'Dashboard statistics fetched successfully', stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
