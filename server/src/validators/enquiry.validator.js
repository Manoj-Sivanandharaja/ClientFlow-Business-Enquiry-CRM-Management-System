const { z } = require('zod');

const ALLOWED_SOURCES = [
  'WhatsApp',
  'Instagram',
  'Email',
  'Website',
  'Referral',
  'Direct Conversation',
];

const ALLOWED_SERVICES = [
  'Website Development',
  'Mobile App Development',
  'Software Development',
  'UI/UX Design',
  'Cloud Services',
  'Digital Marketing',
  'Custom Software',
  'Other',
];

const ALLOWED_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'PROPOSAL_SENT',
  'NEGOTIATION',
  'WON',
  'LOST',
];

const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;

const createEnquirySchema = z.object({
  clientName: z.string({ required_error: 'Client name is required' }).trim().min(1, 'Client name is required'),
  contactPerson: z.string({ required_error: 'Contact person is required' }).trim().min(1, 'Contact person is required'),
  email: z.string({ required_error: 'Email is required' }).trim().email('Please enter a valid email address'),
  phone: z.string({ required_error: 'Phone number is required' })
    .trim()
    .min(5, 'Please enter a valid phone number')
    .refine((val) => phoneRegex.test(val), { message: 'Please enter a valid phone number' }),
  source: z.enum(ALLOWED_SOURCES, {
    errorMap: () => ({ message: 'Please select a valid enquiry source' }),
  }),
  service: z.enum(ALLOWED_SERVICES, {
    errorMap: () => ({ message: 'Please select a valid service' }),
  }),
  description: z.string().optional().nullable(),
  budget: z.coerce.number().min(0, 'Budget cannot be negative').optional().default(0),
  status: z.enum(ALLOWED_STATUSES, {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }).optional().default('NEW'),
  assignedTo: z.string().optional().nullable(),
  followUpDate: z.string().or(z.date()).optional().nullable().transform((val) => {
    if (!val) return null;
    const date = new Date(val);
    return isNaN(date.getTime()) ? null : date;
  }),
  notes: z.string().optional().nullable(),
});

const updateEnquirySchema = createEnquirySchema.partial();

module.exports = {
  createEnquirySchema,
  updateEnquirySchema,
  ALLOWED_SOURCES,
  ALLOWED_SERVICES,
  ALLOWED_STATUSES,
};
