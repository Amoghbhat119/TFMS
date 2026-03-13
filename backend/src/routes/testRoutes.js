const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/admin', protect, authorizeRoles('Admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

router.get('/recruiter', protect, authorizeRoles('Recruiter', 'Admin'), (req, res) => {
  res.json({ message: 'Welcome Recruiter or Admin' });
});

module.exports = router;