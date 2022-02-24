const express = require('express');                             //importing express server
// const port = process.env.PORT || 8000;                          //specifying the port on which server will run
const app = express();                                          //launching express server
const ejs = require('ejs');                                     //importing the template engine ejs
const expressLayouts = require('express-ejs-layouts');          //importing the ejs layouts
const session = require('express-session');                     //importing express session for session storage of a user
const flash = require('connect-flash');                         //importing flash for showing notifications
const mongoose = require('mongoose');                           //importing the ODM Mongoose
const db = require('./config/mongoose');                        //accquiring the connection to database




app.use(expressLayouts);                                        //using EJS layouts
app.use("/assets", express.static('./assets'));                 //linking static files with server
app.set('view engine', 'ejs');                                  //setting up the view as ejs
app.use(express.urlencoded({ extended: false }));               //using middleware provided by express
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true}));       
app.use(flash());
app.use(function (req, res, next) { res.locals.success_msg = req.flash('success_msg'); res.locals.error_msg = req.flash('error_msg'); res.locals.error = req.flash('error'); next(); });
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.listen(process.env.PORT || 8000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });