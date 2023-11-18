const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
const PORT = 8080;

const passport = require('passport');
const session = require('express-session');

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// const role = require('./Models/roleModel');
// const user = require('./Models/userModel');
// const item = require('./Models/itemDonationModel');
// const donation = require('./Models/donationModel');
// const pay = require('./Models/paymentModel');
// const bini = require('./Models/beneficiariesModel');

const userLog = require('./Routes/authonticationRoutes');
app.use(userLog);

// const fb = require('./Models/feedbackModel')
mongoose.connect(`mongodb+srv://${process.env.Mongo_USER}:${process.env.MONGO_PASSWORD}@cluster0.w4eb3k0.mongodb.net/charity?retryWrites=true&w=majority`)
.then(() => {
    console.log("connect successfully");
}).catch((error) => {
    console.log(error, "error in connection");
});

app.listen(PORT,console.log(`server is running in ${PORT}`));