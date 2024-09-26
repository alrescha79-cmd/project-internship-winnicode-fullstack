const { db, admin } = require('../config/Firebase');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');
const { ref, uploadBytes, getDownloadURL } = require('firebase-admin/storage');

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

    async createNews({ title, content, authorName, authorId, category, thumbnail }) {
        // Check if title already exists
        const existingNews = await db.collection('news').where('title', '==', title).get();
        if (!existingNews.empty) {
            throw new Error('Title already exists');
        }

        const slug = slugify(title, { lower: true });

        // Upload thumbnail to Cloud Storage
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

        // Check if title already exists (excluding the current news)
        const existingNews = await db.collection('news').where('title', '==', title).get();
        if (!existingNews.empty && existingNews.docs[0].id !== doc.id) {
            throw new Error('Title already exists');
        }

        let thumbnailURL = doc.data().thumbnailURL;
        if (thumbnail) {
            // Upload new thumbnail to Cloud Storage
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
    }
};

module.exports = NewsModel;