const { db, admin } = require('../config/Firebase');
const slugify = require('slugify');

const NewsModel = {
    async getAllNews() {
        const snapshot = await db.collection('news').get();
        const newsList = [];
        snapshot.forEach(doc => {
            newsList.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return newsList;
    },

    async getNewsById(newsId) {
        const doc = await db.collection('news').doc(newsId).get();
        if (!doc.exists) {
            throw new Error('News not found');
        }
        return {
            id: doc.id,
            ...doc.data()
        };
    },

    async createNews({ title, content, authorName, authorId, category }) {
        // Check if title already exists
        const existingNews = await db.collection('news').where('title', '==', title).get();
        if (!existingNews.empty) {
            throw new Error('Title already exists');
        }

        const slug = slugify(title, { lower: true });
        const newsRef = db.collection('news');
        const doc = await newsRef.add({
            title,
            content,
            author: authorName,
            authorId: authorId,
            slug,
            category,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Increment post count for the journalist
        await db.collection('journalist').doc(authorId).update({
            postCount: admin.firestore.FieldValue.increment(1)
        });

        return {
            id: doc.id,
            title,
            content,
            author: authorName,
            authorId: authorId,
            slug,
            category
        };
    },

    async updateNews(newsId, { title, content, category }) {
        const newsRef = db.collection('news').doc(newsId);
        const doc = await newsRef.get();
        if (!doc.exists) {
            throw new Error('News not found');
        }

        // Check if title already exists (excluding the current news)
        const existingNews = await db.collection('news').where('title', '==', title).get();
        if (!existingNews.empty && existingNews.docs[0].id !== newsId) {
            throw new Error('Title already exists');
        }

        const slug = slugify(title, { lower: true });

        await newsRef.update({
            title,
            content,
            slug,
            category,
            lastEdit: admin.firestore.FieldValue.serverTimestamp()
        });
        return { id: newsId, title, content, slug, category };
    },

    async deleteNews(newsId) {
        const newsRef = db.collection('news').doc(newsId);
        const doc = await newsRef.get();
        if (!doc.exists) {
            throw new Error('News not found');
        }
        await newsRef.delete();
        return { id: newsId, ...doc.data() };
    }
};

module.exports = NewsModel;