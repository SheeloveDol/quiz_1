const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

// const knex = require('./db/client');





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
    res.render('clucks/index');
});

// To create cookie after clicking sign_in
app.post('/sign_in', (req, res) => {
    const COOKIE_EXPIRE = 1000 * 60 * 60 * 24;
    const username = req.body.username;
    res.cookie('username', username, { maxAge: COOKIE_EXPIRE });
    res.redirect('/create');
});

app.post('/sign_out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/welcome');
});

app.get('/sign_in', (req, res) => {
    res.render('sign_in')
})


// app.get('/clucks/new', (req, res) => {
//     res.render('/clucks/new');
// });

const cluckRouter = require('./routes/clucks');
app.use('/clucks', cluckRouter);
// const knex = require('./db/client');





const ADDRESS = 'localhost';
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
    console.log(`Server is live and listening at ${ADDRESS}: ${PORT}`);
})