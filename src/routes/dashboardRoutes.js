const express = require('express');
const { summary } = require('../controllers/dashboardController');
const { authRequired } = require('../middlewares/auth');

const router = express.Router();

router.use(authRequired);
router.get('/summary', summary);

module.exports = router;
