const express = require('express');
const router = express.Router();
const journalistController = require('../controllers/journalistControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', authMiddleware, journalistController.getJournalist);
router.post('/add', authMiddleware, journalistController.addJournalist);
router.get('/:id', authMiddleware, journalistController.getJournalistById);
router.put('/:id', authMiddleware, upload.single('profilePicture'), journalistController.updateJournalist);
router.delete('/:id', authMiddleware, journalistController.deleteJournalist);

module.exports = router;