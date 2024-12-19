import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000 || process.env.PORT;
app.use(express.static('/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req,res)=>{
    res.render('index.ejs');
});
app.listen(port, (req, res) => {
    console.log(`Server running on ${port}`); 
});