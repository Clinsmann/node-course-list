//require('dotenv').config();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const productsRoute = require('./controllers/products');
const CourseRoute = require('./controllers/course');




mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to database'));





app.set('view engine', 'ejs');
app.use(cors());//using cors for all api endpoint
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use('/products', productsRoute);
app.use('/course', CourseRoute);

app.listen(port, () => console.log('listening to port: ' + port + '...'));