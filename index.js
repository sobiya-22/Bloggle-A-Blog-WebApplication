import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/dbConfig.js'
import userAccessRoute from './routes/userAccess.js';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/userAccess', userAccessRoute);

app.get('/', (req, res) => {
  res.render('index');
});



app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
connectDB();
