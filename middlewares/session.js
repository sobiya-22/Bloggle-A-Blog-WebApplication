import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionConfig = session({
    secret: 'sobiya',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 180 * 60 * 1000 } 
});

export default sessionConfig;
