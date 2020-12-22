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

// To create cluck from create form and send info to database
router.post('/new', (req, res) => {
    knex('clucks')
        .insert({
            username: req.cookies.username,
            image_url: req.body.image_url,
            content: req.body.content
        })
        .returning('*')
        .then(cluck => {
            res.send(cluck);
        });
});

module.exports = router;