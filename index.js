import express from 'express';
import bodyParser from 'body-parser';
import CookieParser from 'cookie-parser';
import sessionConfig from './middlewares/session.js';
import connectDB from './db/dbConfig.js'
import userAccessRoute from './routes/userAccess.js';
import blogsRoute from './routes/blog.js';
import User from './models/userAccess.js';
import Blog from './models/blogs.js';
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = process.env.PORT || 3000; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set views directory and view engine
console.log('Current directory:', __dirname);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(sessionConfig);
app.use('/userAccess', userAccessRoute);
app.use('/blog', blogsRoute);
app.get('/', async (req, res) => {
  try {
    if (!req.session.userId) {
      // Redirect to sign-in page if the user is not logged in
      return res.render('index', { userData: null, allBlogs: [] });
    }

    const objID = req.session.userId.toString();
    const userData = await User.findById(objID);
    const blogs = await Blog.find({ createdBy: objID });

    res.render('index', {
      userData: userData,
      allBlogs: blogs,
    });
  } catch (error) {
    console.log('Error fetching data for homepage:', error);
    res.status(500).send('Internal Server Error');
  }
});


connectDB();
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

