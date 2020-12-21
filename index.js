const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('landing');
});


const ADDRESS = 'localhost';
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
    console.log(`Server is live and listening at ${ADDRESS}: ${PORT}`);
})