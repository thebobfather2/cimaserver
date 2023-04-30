const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1); // exit the Node.js process with a non-zero exit code
    }
}

module.exports = connectDB;