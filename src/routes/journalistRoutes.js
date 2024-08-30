const express = require('express');
const router = express.Router();
const journalistController = require('../controllers/journalistControllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/add', authMiddleware, journalistController.addJournalist);
router.get('/', authMiddleware, journalistController.getJournalist);
router.get('/:id', authMiddleware, journalistController.getJournalistById);
router.put('/:id', authMiddleware, journalistController.updateJournalist);
router.delete('/:id', authMiddleware, journalistController.deleteJournalist);

module.exports = router;