const NewsModel = require('../models/newsModel');
const Journalist = require('../models/journalistModel');
const { db, admin } = require('../config/Firebase');
const slugify = require('slugify');

exports.getAllNews = async (req, res, next) => {
    try {
        const newsList = await NewsModel.getAllNews();
        if (newsList.length === 0) {
            return res.status(404).json({ message: 'No news found' });
        }
        res.status(200).json({
            message: 'News retrieved successfully',
            data: newsList
        });
    } catch (error) {
        next(error);
    }
};

exports.getNewsBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug || req.query.slug;
        if (!slug) {
            return res.status(400).json({ message: 'News slug is required' });
        }

        const news = await NewsModel.getNewsBySlug(slug);
        res.status(200).json({
            message: 'News retrieved successfully',
            data: news
        });
    } catch (error) {
        if (error.message === 'News not found') {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};

// exports.getNewsById = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const news = await NewsModel.getNewsById(id);
//         res.status(200).json({
//             message: 'News retrieved successfully',
//             data: news
//         });
//     } catch (error) {
//         if (error.message === 'News not found') {
//             return res.status(404).json({ message: error.message });
//         }
//         next(error);
//     }
// };


exports.getNewsByCategory = async (req, res, next) => {
    try {
        const category = req.params.category;
        if (!category) {
            return res.status(400).json({ message: 'News category is required' });
        }

        const newsList = await NewsModel.getNewsByCategory(category);

        if (newsList.length === 0) {
            return res.status(404).json({ message: 'No news found' });
        }

        res.status(200).json({
            message: 'News retrieved successfully',
            data: newsList
        });
    } catch (error) {
        next(error);
    }
};

exports.getNewsByAuthor = async (req, res, next) => {
    try {
        const { authorId } = req.params;

        if (!authorId) {
            return res.status(400).json({ message: 'Author ID is required' });
        }

        const newsList = await NewsModel.getNewsByAuthor(authorId);

        if (newsList.length === 0) {
            return res.status(404).json({ message: 'No news found for this author' });
        }

        res.status(200).json({
            message: 'News retrieved successfully',
            data: newsList
        });
    } catch (error) {
        next(error);
    }
};

exports.searchNews = async (req, res, next) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const newsList = await NewsModel.searchNews(query);

        if (newsList.length === 0) {
            return res.status(404).json({ message: 'No news found' });
        }

        res.status(200).json({
            message: 'Search results retrieved successfully',
            data: newsList
        });
    } catch (error) {
        next(error);
    }
};


exports.createNews = async (req, res, next) => {
    try {
        const { title, content, category } = req.body;
        const userId = req.user.uid;
        const thumbnail = req.file;

        const userDoc = await db.collection('journalist').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'Journalist not found' });
        }
        const authorName = userDoc.data().name;

        const slug = slugify(title, { lower: true });

        const news = await NewsModel.createNews({ title, content, authorName, authorId: userId, category, thumbnail });
        res.status(201).json({
            message: 'News created successfully',
            data: news
        });

        const postCount = await Journalist.getPostCount(userId);
        await db.collection('journalist').doc(userId).update({
            postCount: postCount
        });
    } catch (error) {
        if (error.message === 'Title already exists') {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

exports.updateNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;
        const thumbnail = req.file;
        const slug = slugify(title, { lower: true });
        const updatedNews = await NewsModel.updateNews(id, { title, content, category, thumbnail });

        res.status(200).json({
            message: 'News updated successfully',
            data: updatedNews
        });

        const userId = req.user.uid;
        const postCount = await Journalist.getPostCount(userId);
        await db.collection('journalist').doc(userId).update({
            postCount: postCount
        });
    } catch (error) {
        if (error.message === 'News not found' || error.message === 'Title already exists') {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

exports.deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedNews = await NewsModel.deleteNews(id);
        res.status(200).json({
            message: 'News deleted successfully',
            data: deletedNews
        });

        const userId = req.user.uid;
        const postCount = await Journalist.getPostCount(userId);
        await db.collection('journalist').doc(userId).update({
            postCount: postCount
        });
    } catch (error) {
        if (error.message === 'News not found') {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { oldCategory, newCategory } = req.body;

        if (!oldCategory || !newCategory) {
            return res.status(400).json({ message: 'Both oldCategory and newCategory are required' });
        }

        const result = await NewsModel.updateCategory(oldCategory, newCategory);
        res.status(200).json({
            message: 'Category updated successfully',
            data: result
        });
    } catch (error) {
        if (error.message === 'Category not found') {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};
