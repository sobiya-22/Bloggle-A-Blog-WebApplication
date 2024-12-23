import express from 'express';
import Blog from '../models/blogs.js';
const router = express.Router();

router.get('/addBlogForm', async (req, res) => {
    res.render('addBlogForm');
});
router.post('/addBlogPost', async(req, res) => {
    const data = req.body;
    let title = data['blog-title'];
    let desc = data['blog-description'];
    let createdBy = req.session.userId;
    try {
        await Blog.create({
            title: title,
            description: desc,
            createdBy: createdBy,
        });
        console.log('Blog posted successfully!');
        return res.redirect('/');
    }catch (error) {
        console.log('Error adding blog:', error);
        res.status(500).send('Error adding blog');
    }
});
export default router;
