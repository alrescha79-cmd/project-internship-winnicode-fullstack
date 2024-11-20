const slugify = require('slugify');
const { db, admin, storage } = require('../config/Firebase');
const { v4: uuidv4 } = require('uuid');

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

    async getNewsBySlug(slug) {
        const snapshot = await db.collection('news').where('slug', '==', slug).get();
        if (snapshot.empty) {
            throw new Error('News not found');
        }
        const doc = snapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data()
        };
    },

    async getNewsByCategory(category) {
        const snapshot = await db.collection('news').where('category', '==', category).get();
        const newsList = [];
        snapshot.forEach(doc => {
            newsList.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return newsList;
    },

    async getNewsByAuthor(authorId) {
        const snapshot = await db.collection('news').where('authorId', '==', authorId).get();
        const newsList = [];
        snapshot.forEach(doc => {
            newsList.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return newsList;
    },    

    async searchNews(query) {
        const snapshot = await db.collection('news')
            .where('title', '>=', query)
            .where('title', '<=', query + '\uf8ff')
            .get();
    
        const newsList = [];
        snapshot.forEach(doc => {
            newsList.push({
                id: doc.id,
                ...doc.data()
            });
        });
    
        return newsList;
    },    

    async createNews({ title, content, authorName, authorId, category, thumbnail }) {
        const existingNews = await db.collection('news').where('title', '==', title).get();
        if (!existingNews.empty) {
            throw new Error('Title already exists');
        }

        const slug = slugify(title, { lower: true });

        const bucket = storage.bucket();
        const thumbnailRef = bucket.file(`thumbnails/${uuidv4()}`);
        await thumbnailRef.save(thumbnail.buffer, {
            metadata: {
                contentType: thumbnail.mimetype
            }
        });
        const thumbnailURL = await thumbnailRef.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });

        const newsRef = db.collection('news');
        const doc = await newsRef.add({
            title,
            content,
            author: authorName,
            authorId: authorId,
            slug,
            category,
            thumbnailURL: thumbnailURL[0],
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

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
            category,
            thumbnailURL: thumbnailURL[0]
        };
    },

    async updateNewsBySlug(slug, { title, content, category, thumbnail, newSlug }) {
        const snapshot = await db.collection('news').where('slug', '==', slug).get();
        if (snapshot.empty) {
            throw new Error('News not found');
        }
        const doc = snapshot.docs[0];
        const newsRef = db.collection('news').doc(doc.id);

        const existingNews = await db.collection('news').where('title', '==', title).get();
        if (!existingNews.empty && existingNews.docs[0].id !== doc.id) {
            throw new Error('Title already exists');
        }

        let thumbnailURL = doc.data().thumbnailURL;
        if (thumbnail) {
            const bucket = storage.bucket();
            const thumbnailRef = bucket.file(`thumbnails/${uuidv4()}`);
            await thumbnailRef.save(thumbnail.buffer, {
                metadata: {
                    contentType: thumbnail.mimetype
                }
            });
            thumbnailURL = (await thumbnailRef.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            }))[0];
        }

        await newsRef.update({
            title,
            content,
            slug: newSlug,
            category,
            thumbnailURL,
            lastEdit: admin.firestore.FieldValue.serverTimestamp()
        });
        return { id: doc.id, title, content, slug: newSlug, category, thumbnailURL };
    },

    async deleteNews(newsId) {
        const newsRef = db.collection('news').doc(newsId);
        const doc = await newsRef.get();
        if (!doc.exists) {
            throw new Error('News not found');
        }
        await newsRef.delete();
        return { id: newsId, ...doc.data() };
    },

    async updateCategory(oldCategory, newCategory) {
        const snapshot = await db.collection('news').where('category', '==', oldCategory).get();
        if (snapshot.empty) {
            throw new Error('Category not found');
        }
    
        const batch = db.batch();
        snapshot.forEach(doc => {
            const newsRef = db.collection('news').doc(doc.id);
            batch.update(newsRef, { category: newCategory });
        });
    
        await batch.commit();
        return { oldCategory, newCategory, count: snapshot.size };
    }
    
};

module.exports = NewsModel;