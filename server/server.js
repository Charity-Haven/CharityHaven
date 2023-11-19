const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
// const response = require('./Models/responseModel');
// const feedback = require('./Models/feedbackModel');

const userLog = require('./Routes/authonticationRoutes');
const feddbackRewsponse = require('./Routes/feedbackResponseRoutes');
app.use(userLog);
app.use(feddbackRewsponse);

mongoose.connect(`mongodb+srv://${process.env.Mongo_USER}:${process.env.MONGO_PASSWORD}@cluster0.w4eb3k0.mongodb.net/charity?retryWrites=true&w=majority`)
.then(() => {
    console.log("connect successfully");
  })
  .catch((error) => {
    console.log(error, "error in connection");
  });

const donationsRoute = require("./Routes/donationsRoute");
const itemDonationsRoute = require("./Routes/itemDonationsRoute");

app.use(donationsRoute);
app.use(itemDonationsRoute);

app.listen(PORT, console.log(`server is running in ${PORT}`));

const beneficiariesRoute = require('./Routes/beneficiariesRoute');
app.use(beneficiariesRoute)









module.exports = app;

