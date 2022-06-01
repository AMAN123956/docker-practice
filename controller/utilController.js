const UserData = require('../models/userDataModel')


const checkUsername = async (req, res) => {
    const username = req.params.id
    console.log(username);
    UserData.find({ username: username }, (err, data) => {
        if (err)
            console.log(err)
        else {
            if (data == "") {
               return res.status(201).json({
                    success: true
                })
            }
            else{
                return res.status(201).json({
                    success: false
                })
            }
        }
   })
}


module.exports = { checkUsername }