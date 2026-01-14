const express = require('express');
const Joi = require('joi');
const { list, create, getById, update, remove } = require('../controllers/ordersController');
const { authRequired, requireRole } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { orderCreateSchema, orderUpdateSchema } = require('../utils/schemas');

const router = express.Router();

const orderListQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0),
  userId: Joi.number().integer().positive().optional()
});

router.use(authRequired);

router.get('/', validate(orderListQuerySchema, 'query'), list);
router.post('/', validate(orderCreateSchema), create);
router.get('/:id', getById);
router.put('/:id', requireRole('admin'), validate(orderUpdateSchema), update);
router.delete('/:id', requireRole('admin'), remove);

module.exports = router;
