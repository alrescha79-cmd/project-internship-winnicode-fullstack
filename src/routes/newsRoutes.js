const express = require('express');
const multer = require('multer');
const router = express.Router();

const newsController = require('../controllers/newsControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', newsController.getAllNews);
router.get('/search', newsController.searchNews);
router.get('/author/:authorId', newsController.getNewsByAuthor);
router.get('/category/:category', newsController.getNewsByCategory);
router.patch('/category', authMiddleware, newsController.updateCategory);
router.get('/:slug', newsController.getNewsBySlug);
router.post('/', authMiddleware, upload.single('thumbnail'), newsController.createNews);
router.put('/:slug', authMiddleware, upload.single('thumbnail'), newsController.updateNews);
router.delete('/:id', authMiddleware, newsController.deleteNews);

module.exports = router;