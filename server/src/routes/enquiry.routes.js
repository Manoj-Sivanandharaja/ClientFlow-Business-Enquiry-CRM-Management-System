const express = require('express');
const router = express.Router();
const {
  getEnquiries,
  getEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiry.controller');
const validate = require('../middleware/validate.middleware');
const { authenticate } = require('../middleware/auth.middleware');
const { createEnquirySchema, updateEnquirySchema } = require('../validators/enquiry.validator');

router.use(authenticate);

router.get('/', getEnquiries);
router.get('/:id', getEnquiryById);
router.post('/', validate(createEnquirySchema), createEnquiry);
router.put('/:id', validate(updateEnquirySchema), updateEnquiry);
router.delete('/:id', deleteEnquiry);

module.exports = router;
