const mongoose = require('mongoose')
const Blog = require('./blogModel')
const Comment = require('./blogCommentModel')

const userBlogLikeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, {
  timestamps: true
})

// const UserBlogLike=mongoose.model('UserBlogLike',userBlogLikeSchema)
module.exports = userBlogLikeSchema