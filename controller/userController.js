const login = async (req, res) => {
    let pageTitle = "Login | JssCircle";
    let cssName = "css/login.css";
    let username = "Guest";
    let email = "";
    let picture = "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png";

    let message = "";
    if (req.query.message != "") {
        message = req.query.message;
      }
    // if (req.isAuthenticated()) {
    //     username = req.user.name;
    //     picture = req.user.picture;
    //     email = req.user.email;
    // }

    res.render('login', { pageTitle, cssName, username, picture, email, message });
}

const register = async (req, res) => {
    let pageTitle = "Login | JssCircle";
    let cssName = "css/login.css";
    let username = "Guest";
    let email = "";
    let picture = "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png";

    let message = "";
    if (req.query.message != "") {
        message = req.query.message;
      }
    // if (req.isAuthenticated()) {
    //     username = req.user.name;
    //     picture = req.user.picture;
    //     email = req.user.email;
    // }

    res.render('register', { pageTitle, cssName, username, picture, email ,message});
}
module.exports = { login,register }