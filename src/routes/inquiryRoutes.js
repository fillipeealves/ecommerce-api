const express = require('express');
const { list, create, getById, update, remove } = require('../controllers/inquiriesController');
const { authRequired, requireRole } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { inquiryCreateSchema, inquiryUpdateSchema } = require('../utils/schemas');

const router = express.Router();

router.use(authRequired);

router.get('/', list);
router.post('/', validate(inquiryCreateSchema), create);
router.get('/:id', getById);
router.put('/:id', validate(inquiryUpdateSchema), update);
router.delete('/:id', requireRole('admin'), remove);

module.exports = router;
