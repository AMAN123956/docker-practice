const mongoose=require('mongoose')
const userBlogCommentSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    comment:{
        type:String
    }
},{
    timestamps:true
})

// const UserBlogComment=mongoose.model('UserBlogComment',userBlogCommentSchema)
module.exports=userBlogCommentSchema