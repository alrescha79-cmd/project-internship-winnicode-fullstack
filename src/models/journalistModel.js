const { admin, db } = require('../config/Firebase');

const Journalist = {
    async createJournalist({ name, phone, email }) {
        const password = "12345678";
        const profilePicture = "https://randomuser.me/api/portraits/lego/5.jpg";

        const journalistRecord = await admin.auth().createUser({
            email,
            password,
            phoneNumber: phone,
            displayName: name,
            emailVerified: false,
            disabled: false
        });

        await db.collection('journalist').doc(journalistRecord.uid).set({
            name,
            phone,
            email,
            profilePicture,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return journalistRecord.uid;
    },

    async getAllJournalists() {
        const journalistSnapshot = await db.collection('journalist').get();
        const journalists = [];
        journalistSnapshot.forEach(doc => {
            journalists.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return journalists;
    },

    async getJournalistById(journalistId) {
        const journalistDoc = await db.collection('journalist').doc(journalistId).get();
        if (!journalistDoc.exists) {
            throw new Error('Journalist not found');
        }
        return {
            id: journalistDoc.id,
            ...journalistDoc.data()
        };
    },

    async updateJournalist(journalistId, { name, phone, email, password, profilePicture }) {
        const journalistDoc = db.collection('journalist').doc(journalistId);
        const journalist = await journalistDoc.get();
        if (!journalist.exists) {
            throw new Error('Journalist not found');
        }

        const updates = { name, phone, email };

        if (profilePicture) {
            const bucket = admin.storage().bucket();
            const profileRef = bucket.file(`profilePictures/${journalistId}`);
            await profileRef.save(profilePicture.buffer, {
                metadata: { contentType: profilePicture.mimetype }
            });

            const profilePictureURL = await profileRef.getSignedUrl({
                action: 'read',
                expires: '03-09-2491'
            });

            updates.profilePicture = profilePictureURL[0];
        }

        if (password) {
            await admin.auth().updateUser(journalistId, { password });
        }

        await journalistDoc.update(updates);
    },

    async deleteJournalist(journalistId) {
        const journalistDoc = db.collection('journalist').doc(journalistId);
        const journalist = await journalistDoc.get();
        if (!journalist.exists) {
            throw new Error('Journalist not found');
        }

        await admin.auth().deleteUser(journalistId);
        await journalistDoc.delete();
    },

    async getPostCount(journalistId) {
        const newsSnapshot = await db.collection('news').where('authorId', '==', journalistId).get();
        return newsSnapshot.size;
    }
};

module.exports = Journalist;