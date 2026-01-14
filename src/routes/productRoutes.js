const express = require('express');
const { list, create, getById, update, remove } = require('../controllers/productsController');
const { authRequired, requireRole } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { productCreateSchema, productUpdateSchema, paginationSchema } = require('../utils/schemas');

const router = express.Router();

router.use(authRequired);

router.get('/', validate(paginationSchema, 'query'), list);
router.post('/', requireRole('admin'), validate(productCreateSchema), create);
router.get('/:id', getById);
router.put('/:id', requireRole('admin'), validate(productUpdateSchema), update);
router.delete('/:id', requireRole('admin'), remove);

module.exports = router;
