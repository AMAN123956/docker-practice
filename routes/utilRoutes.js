const router = require('express').Router()
const { checkUsername }  = require('../controller/utilController')


// Validating Username is availabel or not
router.route("/check/:id").get(checkUsername)



module.exports = router