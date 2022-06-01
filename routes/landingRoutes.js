const router = require('express').Router()
const { protect } = require('../middleware/authMiddleware')

// Landing Page
router.get('/', (req, res) => {

    let pageTitle = "Home | JssCircle";
    let cssName = "css/landing.css";
    let username = "Guest";
    let email = "";
    let picture = "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png";
    // if (req.isAuthenticated()) {
    //     username = req.user.name;
    //     picture = req.user.picture;
    //     email = req.user.email;
    // }

    res.render('landing', { pageTitle, cssName, username, picture, email });
});



module.exports = router