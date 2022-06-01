const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const authUser = async (req, res) => {
    try {
        const { collegeId, password } = req.body
        const user = await User.findOne({ collegeId })
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                collegeId: user.collegeId,
                token: generateToken(user._id),
            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    } catch (e) {
        console.log(e)
        res.json({ error: `${e}` })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, collegeId, password } = req.body
        const userExists = await User.findOne({ collegeId })
        try {
            if (userExists) {
                res.status(400)
                throw new Error('User already exists')
            }
            const user = await User.create({
                name,
                collegeId,
                password,
            })
            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    collegeId: user.collegeId,
                    token: generateToken(user._id),
                })
            } else {
                res.status(400)
                throw new Error('Invalid user data')
            }
        } catch (e) {
            res.status(400)
            throw new Error(e)
        }
    }
    catch (e) {
        console.log(e)
        res.status(400).json({ error: `${e}` })
    }
}

const getUserProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                collegeId: user.collegeId,
            })
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    } catch (e) {
        console.log(e)
        res.json()
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            user.name = req.body.name || user.name
            user.collegeId = req.body.collegeId || user.collegeId
            if (req.body.password) {
                user.password = req.body.password
            }
            const updatedUser = await user.save()
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                collegeId: updatedUser.collegeId,
                token: generateToken(updatedUser._id),
            })
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    } catch (e) {
        console.log(e)
        res.json(e)
    }
}


module.exports = { authUser, getUserProfile, registerUser, updateUserProfile }