const express = require('express');
const { list, getById, update, remove } = require('../controllers/usersController');
const { authRequired, requireRole } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { userUpdateSchema } = require('../utils/schemas');

const router = express.Router();

router.use(authRequired);

router.get('/', requireRole('admin'), list);
router.get('/:id', getById);
router.put('/:id', validate(userUpdateSchema), update);
router.delete('/:id', remove);

module.exports = router;
