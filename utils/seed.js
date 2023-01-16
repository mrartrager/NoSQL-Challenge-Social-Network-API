const connection = require('../config/connection');
const { User, Thought } = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});

    await User.collection.insertOne({
        username: 'testuser',
        email: 'testuser@email.com'
    });

    console.info('Seeding complete! 🌱');
    process.exit(0);
});


