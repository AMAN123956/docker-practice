const Post = require("../../models/Post/postModel")

module.exports = async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post)
            return res.status(400).json("POST NOT FOUND")
        let comment = await post.comments.find(comment => comment.id.toString() === req.params.comment_id.toString())
        if (!comment)
            return res.status(400).json("COMMENT NOT FOUND")
        const newLike = {
            user: req.user.id
        }
        if (comment.likes.find(like => like.user.toString() === req.user.id.toString())) {
            await comment.likes.shift(newLike)
            await post.save()
            return res.status(200).json({
                success: true,
                post: post,
            })
        }
        await comment.likes.unshift(newLike)
        await post.save()
        return res.status(200).json({
            success: true,
            post: post,
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json("SERVER ERROR")
    }
}