import mongoose from 'mongoose';

async function connectDB() {
    mongoose.connect('mongodb://localhost:27017/bloggle', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('DB Connected!');
    }).catch((error) => console.error('MongoDb Connection Error:', error));
}

export default connectDB;

