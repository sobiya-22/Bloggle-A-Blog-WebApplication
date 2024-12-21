import express from 'express';
import User from '../models/userAccess.js';
const router = express.Router();

router.get('/signUp', (req, res) => {
    res.render('signUp'); // No need to include .ejs extension
});

router.get('/signIn', (req, res) => {
    res.render('signIn'); // No need to include .ejs extension
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
        return res.status(400).send('Passwords do not match!'); // Send error response if passwords do not match
    }
    try {
        await User.create({
            fName: fName,
            lName: lName,
            email: email,
            password: oldPass, // Use the oldPass as the password
        });
        console.log('Account created successfully!');
        res.redirect('/');
    } catch (error) {
        console.log('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
});

router.post('/signIn', async (req, res) => {
    console.log(`Login Successful: ${req.body.email}, Password: ${req.body.password}`);
    return res.redirect('/');
});

export default router;
