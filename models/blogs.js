import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default:Date.now,
    }
});
const Blog = model('Blog', blogSchema);
export default Blog;