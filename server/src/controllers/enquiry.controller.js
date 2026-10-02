const prisma = require('../config/db');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { logActivity } = require('../services/activity.service');

const getEnquiries = async (req, res, next) => {
  try {
    const { search, status, source, assignedTo, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const whereClause = {};

    // Search by company, contact person, email, phone, or service
    if (search && search.trim() !== '') {
      const query = search.trim();
      whereClause.OR = [
        { clientName: { contains: query } },
        { contactPerson: { contains: query } },
        { email: { contains: query } },
        { phone: { contains: query } },
        { service: { contains: query } },
      ];
    }

    // Status filter
    if (status && status !== 'ALL') {
      whereClause.status = status;
    }

    // Source filter
    if (source && source !== 'ALL') {
      whereClause.source = source;
    }

    // Assigned person filter
    if (assignedTo && assignedTo !== 'ALL') {
      if (assignedTo === 'UNASSIGNED') {
        whereClause.assignedTo = null;
      } else {
        whereClause.assignedTo = assignedTo;
      }
    }

    const enquiries = await prisma.enquiry.findMany({
      where: whereClause,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc',
      },
    });

    return successResponse(res, 200, 'Enquiries retrieved successfully', enquiries);
  } catch (error) {
    next(error);
  }
};

const getEnquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        activities: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!enquiry) {
      return errorResponse(res, 404, 'Enquiry not found');
    }

    return successResponse(res, 200, 'Enquiry retrieved successfully', enquiry);
  } catch (error) {
    next(error);
  }
};

const createEnquiry = async (req, res, next) => {
  try {
    const enquiryData = req.body;
    const userId = req.user?.id;

    const enquiry = await prisma.enquiry.create({
      data: enquiryData,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Log Activity
    await logActivity({
      enquiryId: enquiry.id,
      userId,
      action: 'ENQUIRY_CREATED',
      description: `Created enquiry for ${enquiry.clientName} (${enquiry.service}) with status ${enquiry.status}.`,
    });

    return successResponse(res, 201, 'Enquiry created successfully', enquiry);
  } catch (error) {
    next(error);
  }
};

const updateEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user?.id;

    const existingEnquiry = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!existingEnquiry) {
      return errorResponse(res, 404, 'Enquiry not found');
    }

    const updatedEnquiry = await prisma.enquiry.update({
      where: { id },
      data: updateData,
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Log changes to activity timeline
    if (updateData.status && updateData.status !== existingEnquiry.status) {
      await logActivity({
        enquiryId: id,
        userId,
        action: 'STATUS_UPDATED',
        description: `Status changed from ${existingEnquiry.status} to ${updateData.status}.`,
      });
    }

    if (updateData.assignedTo !== undefined && updateData.assignedTo !== existingEnquiry.assignedTo) {
      const newAssignedName = updatedEnquiry.assignedUser?.name || 'Unassigned';
      await logActivity({
        enquiryId: id,
        userId,
        action: 'ASSIGNMENT_UPDATED',
        description: `Assigned person updated to ${newAssignedName}.`,
      });
    }

    if (updateData.followUpDate !== undefined && 
        new Date(updateData.followUpDate).getTime() !== new Date(existingEnquiry.followUpDate).getTime()) {
      const dateStr = updateData.followUpDate ? new Date(updateData.followUpDate).toLocaleDateString() : 'Cleared';
      await logActivity({
        enquiryId: id,
        userId,
        action: 'FOLLOWUP_UPDATED',
        description: `Follow-up date updated to ${dateStr}.`,
      });
    }

    if (updateData.notes !== undefined && updateData.notes !== existingEnquiry.notes) {
      await logActivity({
        enquiryId: id,
        userId,
        action: 'NOTES_UPDATED',
        description: `Enquiry notes were updated.`,
      });
    }

    return successResponse(res, 200, 'Enquiry updated successfully', updatedEnquiry);
  } catch (error) {
    next(error);
  }
};

const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingEnquiry = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!existingEnquiry) {
      return errorResponse(res, 404, 'Enquiry not found');
    }

    await prisma.enquiry.delete({
      where: { id },
    });

    return successResponse(res, 200, 'Enquiry deleted successfully', { id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
