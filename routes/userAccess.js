import express from 'express';
import comparePasswords from '../middlewares/authentication.js';
import User from '../models/userAccess.js'
const router = express.Router();

router.get('/signUp', (req, res) => {
    res.render('signUp'); 
});

router.get('/signIn', (req, res) => {
    res.render('signIn');
    
});

router.post('/signUp', async (req, res) => {
    const data = req.body;
    let fName = data.fname;
    let lName = data.lname;
    let email = data.email;
    let oldPass = data['old-password'];
    let confirmPass = data['confirm-password'];
    if (oldPass !== confirmPass) {
        console.log('Passwords do not match!');
        return res.redirect('/signUp').send('Passwords do not match!');
    }
    try {
        await User.create({
            fName: fName,
            lName: lName,
            email: email,
            password: confirmPass, 
        });
        console.log('Account created successfully!');
        res.redirect('/userAccess/signIn');
    } catch (error) {
        console.log('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
});

router.post('/signIn', async (req, res) => {
    const data = req.body;
    let email = data.email;
    let password = data.password;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found!');
            return res.redirect('/userAccess/signIn');
        }
        const isMatch = await comparePasswords(email,password);
        if (!isMatch) {
            console.log('Passwords do not match!')
            
            return res.redirect('/userAccess/signIn');
        } 
        req.session.userId = user._id;
        // console.log(req.session.userId.toString());
        console.log('Login successful!')
        return res.redirect('/');
    } catch (e) {
        console.log('Error: ', e);
        return res.send('Error!');

    }
});
//protecting routes
router.use((req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('userAccess/signIn');
    } 
    next();
});

//logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.status(500).send('Error during logout');
        } res.redirect('/');
    })
});
export default router;
