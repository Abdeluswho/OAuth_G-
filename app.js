const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose');

const app = express();

//set up view engine

app.set('view engine', 'ejs');

//connect to mongodb (need a setup)
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoUserOAuth";
mongoose.connect(MONGODB_URI, ()=>{
    console.log('connected to mongodb')
    
});


//setup routes
app.use("/auth",authRoutes);

//create home route
app.get('/', (req, res) =>{
    res.render('home');
})



app.listen(3000, () => {
    console.log('app now listening fon port 3000')
})