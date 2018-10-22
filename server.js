const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const classes = require('./routes/api/classes');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const subjects = require('./routes/api/subjects');
const teachers = require('./routes/api/teachers');
const timetables = require('./routes/api/timetables');

const app = express();

// DB config
//const db = require('./config/keys').mongoURI;
const db = 'mongodb://localhost:27017/MERN'
//Body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connect to mongoDB
mongoose
    .connect(db, {useNewUrlParser:true})
    .then(()=> console.log('MongoDB connected'))
    .catch(err=>console.log(err));

app.get('/', (req,res)=>{
    res.send('Hello')
});

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

// use routes
app.use('/api/users',users);
app.use('/api/classes',classes);
app.use('/api/profile',profile);
app.use('/api/subjects',subjects);
app.use('/api/teachers',teachers);
app.use('/api/timetables',timetables);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`listening to ${port}`)
});