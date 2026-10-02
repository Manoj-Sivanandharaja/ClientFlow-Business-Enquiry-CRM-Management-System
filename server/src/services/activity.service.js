const prisma = require('../config/db');

/**
 * Log an activity timeline entry for an enquiry
 */
const logActivity = async ({ enquiryId, userId, action, description }) => {
  try {
    return await prisma.activity.create({
      data: {
        enquiryId,
        userId: userId || null,
        action,
        description,
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error.message);
    // Silent fail so main transaction isn't broken
    return null;
  }
};

module.exports = { logActivity };
