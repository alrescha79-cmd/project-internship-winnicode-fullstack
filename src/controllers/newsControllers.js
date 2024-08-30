const { admin, db } = require('../config/Firebase');


exports.getAllNews = async (req, res) => {
    try {
        const newsRef = db.collection('news');
        const snapshot = await newsRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ message: 'No news found' });
        }

        const newsList = [];
        snapshot.forEach(doc => {
            newsList.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json({
            message: 'News retrieved successfully',
            data: newsList
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const newsId = req.params.id;
        const newsRef = db.collection('news').doc(newsId);
        const doc = await newsRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json({
            message: 'News retrieved successfully',
            data: {
                id: doc.id,
                ...doc.data()
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
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

        const newsRef = db.collection('news');
        const doc = await newsRef.add({
            title,
            content,
            author: authorName,
            authorId: userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(201).json({
            message: 'News created successfully',
            data: {
                id: doc.id,
                title,
                content,
                author: authorName,
                authorId: userId
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const newsRef = db.collection('news').doc(id);
        const doc = await newsRef.get();

        if (!doc.exists) {
            res.status(404).json({ message: 'News not found' });
        } else {
            await newsRef.update({ title, content });

            res.status(200).json({
                message: 'News updated successfully',
                data: {
                    id: doc.id,
                    title,
                    content,
                    lastEdit: admin.firestore.FieldValue.serverTimestamp()
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const newsRef = db.collection('news').doc(id);
        const doc = await newsRef.get();

        if (!doc.exists) {
            res.status(404).json({ message: 'News not found' });
        } else {
            await newsRef.delete();

            res.status(200).json({
                message: 'News deleted successfully',
                data: {
                    id: doc.id,
                    ...doc.data()
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


