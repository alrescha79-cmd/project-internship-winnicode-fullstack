const { db, admin } = require('../config/Firebase');

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

    async createNews({ title, content, authorName, authorId }) {
        const newsRef = db.collection('news');
        const doc = await newsRef.add({
            title,
            content,
            author: authorName,
            authorId: authorId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return {
            id: doc.id,
            title,
            content,
            author: authorName,
            authorId: authorId
        };
    },

    async updateNews(newsId, { title, content }) {
        const newsRef = db.collection('news').doc(newsId);
        const doc = await newsRef.get();
        if (!doc.exists) {
            throw new Error('News not found');
        }
        await newsRef.update({
            title,
            content,
            lastEdit: admin.firestore.FieldValue.serverTimestamp()
        });
        return { id: newsId, title, content };
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
