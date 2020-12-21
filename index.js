const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));



app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

const ADDRESS = 'localhost';
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
    console.log(`Server is live and listening at ${ADDRESS}: ${PORT}`);
})