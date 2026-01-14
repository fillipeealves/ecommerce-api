const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().max(160).required(),
  password: Joi.string().min(6).max(72).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(160).required(),
  password: Joi.string().min(6).max(72).required()
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(120),
  email: Joi.string().email().max(160),
  password: Joi.string().min(6).max(72),
  role: Joi.string().valid('admin', 'customer')
}).min(1);

const productCreateSchema = Joi.object({
  name: Joi.string().min(2).max(180).required(),
  sku: Joi.string().min(3).max(64).required(),
  price: Joi.number().precision(2).positive().required(),
  purchases: Joi.number().integer().min(0).default(0),
  dateAdded: Joi.date().optional()
});

const productUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(180),
  sku: Joi.string().min(3).max(64),
  price: Joi.number().precision(2).positive(),
  purchases: Joi.number().integer().min(0),
  dateAdded: Joi.date()
}).min(1);

const orderCreateSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  status: Joi.string().valid('pending', 'paid', 'shipped', 'cancelled').default('pending'),
  currency: Joi.string().length(3).default('USD'),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().min(1).required()
      })
    )
    .min(1)
    .required()
});

const orderUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'paid', 'shipped', 'cancelled'),
  currency: Joi.string().length(3)
}).min(1);

const inquiryCreateSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  subject: Joi.string().min(3).max(160).required(),
  message: Joi.string().min(3).required(),
  status: Joi.string().valid('open', 'in_progress', 'closed').default('open')
});

const inquiryUpdateSchema = Joi.object({
  subject: Joi.string().min(3).max(160),
  message: Joi.string().min(3),
  status: Joi.string().valid('open', 'in_progress', 'closed')
}).min(1);

const paginationSchema = Joi.object({
  search: Joi.string().allow('').optional(),
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0)
});

module.exports = {
  registerSchema,
  loginSchema,
  userUpdateSchema,
  productCreateSchema,
  productUpdateSchema,
  orderCreateSchema,
  orderUpdateSchema,
  inquiryCreateSchema,
  inquiryUpdateSchema,
  paginationSchema
};
