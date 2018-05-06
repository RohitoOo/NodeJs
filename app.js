const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')


// Database is placed in the config folder
mongoose.connect(config.database);


//Check database connection
mongoose.connection.on('connected' , ()=> {
  console.log("We Live Up In This Database")
})

mongoose.connection.on('error' , (err)=> {
  console.log("You got some Database Issues Son! " + err)
})


const app = express();

//USERS Routes
const users = require('./routes/users')


const port = 3000;



//Cors Middleware
app.use(cors());

//Statics Files
app.use(express.static(path.join(__dirname, 'public')));


//Body Parser Middleware
app.use(bodyParser.json());


//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());


//

require('./config/passport')(passport)

// Users Routes
app.use('/users' , users)

// Home Route
app.get('/', function(req, res){

  res.send("Yeeeaahhh BOY!!")
})



//Start Server
app.listen(port , () =>

  console.log("Listening on Port 3000 Mi Amour")
)
