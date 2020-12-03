// tests/db-handler.js

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    const uri = await mongod.getConnectionString();

    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true

    };

    await mongoose.connect(uri, mongooseOpts,(err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}