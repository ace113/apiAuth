const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// connect mongodb
const URL = 'mongodb://localhost:27017/apiAuth';
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('Database is ready'))
.catch(err => console.log(err))


const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

// Routes
app.use('/users',require('./routes/users'))

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log('Server is running on 3000'))