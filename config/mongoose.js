const mongoose = require('mongoose');                              //Importing ODM Mongoose
mongoose.connect('mongodb://localhost/habitTracker_db');           //Connecting to database
const db = mongoose.connection;                                    //accquiring the connection

db.on('error', console.error.bind(console, 'Error In Connecting To MongoDB'));  


db.once('open', function(){                                         //connection is done
    console.log("Successfully Connected To Database");
});