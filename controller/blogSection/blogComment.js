const UserBlog=require('../../models/blogModel')

/* We will find each blog comment using filter by id 
@desc: id will be passed in url while getting blogComment
*/
const getBlogComments=async(req,res,next)=>{
    try{
        /* const user=req.user._id */
        const _id = req.params.id
        console.log(_id[0])
        result_id=""
        for (let i = 1; i < _id.length; i++)
            result_id += _id[i];
        
        const commentData = await UserBlog.find({ _id: result_id })
        console.log(commentData)
        console.log(commentData[0].comments)
        console.log(commentData[0].comments.length)
        const frontendCommentData = commentData[0].comments
        res.status(200).json({
            success:true,
            count:commentData[0].comments.length,
            data:frontendCommentData
        })
    }catch(e){
        console.log(`Error occured ${e}`)
        return res.status(500).json({
            success:false,
            error:e
        })
    }
}

const addBlogComments=async(req,res,next)=>{
    try{
        const _id = req.params.id
        console.log(_id[0])
        result_id=""
        for (let i = 1; i < _id.length; i++)
            result_id += _id[i];
        const update = req.body
        const author = req.user._id
        // console.log(author)
    let myComments = [];

    UserBlog.find({ _id: result_id }, async (err, data) => {
      if (err)
        console.log(err);
      else {
          console.log(data)
        myComments.push(...data[0].comments,update);
         await UserBlog.updateOne({ _id: result_id }, { comments: myComments }, async(err, result) => {
          if (err) {
            console.log(err)
          } else {
              console.log("Result :", result)
              const blog = await UserBlog.findById({ _id: result_id })
              return res.status(201).json({
                  success:true,
                  data:blog
              })
            
          }
        });
    }
    });

    }catch(e){
        if(e.name==='ValidationError'){
            console.log(e)
            const messages=Object.values(e.errors).map(val=>val.message)
            res.status(400).json({
                success:false,
                error:messages
            })

        }else{        
            console.log(`Error occured ${e}`)
            return res.status(500).json({
                success:false,
                error:e
            })
        }
    }
}



module.exports={getBlogComments,addBlogComments}