const express = require('express');
const knex = require('../db/client');

const router = express.Router();



router.get('/new', (req, res) => {
    res.render('clucks/new');
});


// Index
router.get('/', (req, res) => {
    knex('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks => {
        res.render('clucks/index', { clucks: clucks});
    })
})

router.get('/sign_in', (req, res) => {
    res.redirect('../sign_in');
})

// To create cluck from create form and send info to database
router.post('/', (req, res) => {
    knex('clucks')
        .insert({
            username: req.cookies.username,
            image_url: req.body.image_url,
            content: req.body.content
        })
        .returning('*')
        .then(cluck => {
            res.redirect('/');
        });
});

module.exports = router;