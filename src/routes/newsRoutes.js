const express = require('express');
const multer = require('multer');
const router = express.Router();

const newsController = require('../controllers/newsControllers');
const authMiddleware = require('../middlewares/authMiddleware');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', newsController.getAllNews);
router.get('/:slug', newsController.getNewsBySlug);
router.get('/category/:category', newsController.getNewsByCategory);
router.post('/', authMiddleware, upload.single('thumbnail'), newsController.createNews);
router.put('/:slug', authMiddleware, upload.single('thumbnail'), newsController.updateNews);
router.delete('/:id', authMiddleware, newsController.deleteNews);

module.exports = router;