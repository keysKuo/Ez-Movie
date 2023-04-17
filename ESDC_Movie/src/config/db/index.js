const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(
            // `mongodb://localhost:27017/Movie`,
            'mongodb+srv://ezmovie:Dung1247@movie.y6mjdws.mongodb.net/ezmovie',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Connected');
    } catch (error) {
        console.log('Disconnected');
    }
}

module.exports = { connect };