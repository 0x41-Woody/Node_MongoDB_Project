const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');
const authenticate = require('./middleware/authenticate');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const express = require('express');
const Joi = require('joi');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//Db work...
dbDebugger('Connected to the database...');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);

// Configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

app.use(logger);
app.use(authenticate);



// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));