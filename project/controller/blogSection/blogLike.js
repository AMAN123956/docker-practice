const UserBlog = require('../../models/blogModel')

const getBlogLikes = async (req, res, next) => {
    try {
        /* const user = req.user._id */
        let myLikes = []
        const _id = req.params.id
        console.log(_id[0])
        result_id=""
        for (let i = 1; i < _id.length; i++)
            result_id += _id[i];

        const likeData = await UserBlog.find({ _id: result_id })
        /* like objet returned */
        console.log(likeData[0].likes)
        console.log(likeData[0].likes.length)
        const frontendData = likeData[0].likes
        res.status(200).json({
            success: true,
            count: likeData[0].likes.length,
            data: frontendData
        })
    } catch (e) {
        console.log(`Error occured ${e}`)
        return res.status(500).json({
            success: false,
            error: e
        })
    }
}

const addBlogLikes = async (req, res, next) => {
    try {
        /* const {text,amount} = req.body */
        const _id = req.params.id
        console.log(_id[0])
        result_id=""
        for (let i = 1; i < _id.length; i++)
            result_id += _id[i];
        const update = req.body
        const author = req.user._id
        console.log(author)
        console.log(req.body)
    let myLikes = [];

    UserBlog.findOne({_id: result_id}, async (err, data) => {
      if (err)
        console.log(err);
      else {
        console.log(data)
        myLikes.push(...data.likes,update);
         await UserBlog.updateOne({_id: result_id}, { likes: myLikes }, async(err, result)=> {
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
    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e)
            const messages = Object.values(e.errors).map(val => val.message)
            res.status(400).json({
                success: false,
                error: messages
            })

        } else {
            console.log(`Error occured ${e}`)
            return res.status(500).json({
                success: false,
                error: e
            })
        }
    }
}



module.exports = {
    getBlogLikes,
    addBlogLikes
}