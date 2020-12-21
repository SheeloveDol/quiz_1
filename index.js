const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(logger('dev'));

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
    console.log('🍪:', req.cookies);
    const username = req.cookies.username;
    res.locals.username = "";
    if (username) {
        res.locals.username = username
        console.log(`Signed in as ${username}`);
    }
    next();
})



app.get('/', (req, res) => {
    res.render('landing');
});

app.post('/sign_in', (req, res) => {
    const COOKIE_EXPIRE = 1000 * 60 * 60 * 24;
    const username = req.body.username;
    res.cookie('username', username, { maxAge: COOKIE_EXPIRE });
    res.redirect('/create');
});

app.get('/create', (req, res) => {
    res.render('create');
});

const ADDRESS = 'localhost';
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
    console.log(`Server is live and listening at ${ADDRESS}: ${PORT}`);
})