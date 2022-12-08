const mongoose = require('mongoose');

function connect(DB_URI) {
    mongoose.set('strictQuery', true);
    mongoose.connect(DB_URI, { useNewUrlParser: true});


    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error:'));
    db.once('open', () => {
        console.log('Connected to DB');
    });
}

module.exports = connect;