const mongoose=require('mongoose')
const likeSchema=require('./blogLikeModel')
const commentSchema = require('./blogCommentModel')

const userBlogSchema = new mongoose.Schema({
  title: {type: String},
  image: {type: String},
  shortDescription: {type: String},
  blogcontent: {type: String},
  author:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
  },
  likes:[{type:likeSchema}],
  comments:[{type:commentSchema}]
},{
  timestamps:true
})

const UserBlog=mongoose.model('UserBlog',userBlogSchema)
module.exports=UserBlog