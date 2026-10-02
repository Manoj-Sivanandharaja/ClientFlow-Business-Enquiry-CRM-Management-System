const { errorResponse } = require('../utils/apiResponse');

const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const formattedErrors = {};
      error.errors.forEach((err) => {
        const fieldName = err.path.join('.') || 'general';
        if (!formattedErrors[fieldName]) {
          formattedErrors[fieldName] = err.message;
        }
      });
      const firstErrorMessage = error.errors[0]?.message || 'Validation failed';
      return errorResponse(res, 400, firstErrorMessage, formattedErrors);
    }
    next(error);
  }
};

module.exports = validate;
