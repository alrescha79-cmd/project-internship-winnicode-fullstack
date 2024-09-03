const NewsModel = require('../models/newsModel');
const { db } = require('../config/Firebase');

exports.getAllNews = async (req, res) => {
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

exports.getNewsById = async (req, res) => {
    try {
        const newsId = req.params.id;
        const news = await NewsModel.getNewsById(newsId);
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

exports.createNews = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.uid;

        const userDoc = await db.collection('journalist').doc(userId).get();
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'journalist not found' });
        }
        const authorName = userDoc.data().name;

        const news = await NewsModel.createNews({ title, content, authorName, authorId: userId });
        res.status(201).json({
            message: 'News created successfully',
            data: news
        });
    } catch (error) {
        next(error);
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNews = await NewsModel.updateNews(id, { title, content });
        res.status(200).json({
            message: 'News updated successfully',
            data: updatedNews
        });
    } catch (error) {
        if (error.message === 'News not found') {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNews = await NewsModel.deleteNews(id);
        res.status(200).json({
            message: 'News deleted successfully',
            data: deletedNews
        });
    } catch (error) {
        if (error.message === 'News not found') {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};
