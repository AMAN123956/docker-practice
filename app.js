const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const mongoose = require("mongoose");
const url = require('url')
//passport configuration
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
require('colors')
// .env required
require('dotenv').config({ path: './config/dev.env' })
// Database Sonnection
const connectDB = require('./db/db')
connectDB();



const app = express()

app.use(cors());
// Rendering static files
app.use(express.static("public"));
// EJS Render
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: false }));
// Setting up Passport.js
// using cookie-parser and session 
app.use(cookieSession({
    secret: "thisis",
    maxAge: 24 * 60 * 60 * 60
}));

// User Data Model
const UserData = require('./models/userDataModel')
// Strict order to be followed
const UserSchema = mongoose.Schema({
    
    username:{
        type:String
    },
    password: {
        type:String
    }

}, {
    timestamps: true
})

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema)

// passport local configuration

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport.js configuration ends


if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'))
}
//body-parser
app.use(bodyParser.json());
app.use(express.json());
// General ROUTER
const landingRouter = require('./routes/landingRoutes')
app.use('/', landingRouter)

// login ROUTER
const userRouter = require('./routes/userRoutes');
app.use('/', userRouter);

// BLOG ROUTER
const blogRouter = require('./routes/blogRoutes')
app.use('/blogs', blogRouter)

// POST ROUTER
const postRouter = require('./routes/postRoutes')
app.use('/posts', postRouter)

// Validation Utilities
const utilRouter = require('./routes/utilRoutes')
app.use('/validate',utilRouter)

// Register

app.post("/register", async (req, res) => {
    console.log("post made");
    await User.register({ username: req.body.username }, req.body.password, async(err, data) => {
        const user = new User(req.body);
        const userData = await UserData.create(
            {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                username: req.body.username,
                cardImg:req.body.cardImg
            });

        if (err) {
            console.log(err);
            res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect(`/posts/`);
            });
        }
    });
});

//   Login

app.post("/login", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect(url.format({
            pathname: `/`,
            query: {
                message: "You are already logged in."
            }
        }));
    }
    else {
        passport.authenticate("local")(req, res, function (err) {
            if (err) {
                console.log(err);
                let errName = "Invalid Username / Password";
                let errCode = "Error 400";
                res.render("error", { errCode: errCode, errName: errName });
            }
            else {
                res.redirect(`/posts/`);
            }
        });
    }
});

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect("/");
})


const PORT = process.env.PORT || 7500

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`.yellow) })