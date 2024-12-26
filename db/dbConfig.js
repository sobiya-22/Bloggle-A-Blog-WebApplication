import mongoose from 'mongoose';

async function connectDB() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error('MongoDB URI is not defined in environment variables.');
        process.exit(1); // Exit if no URI is provided
    }

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Connected!');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit process on connection failure
    }
}

export default connectDB;
