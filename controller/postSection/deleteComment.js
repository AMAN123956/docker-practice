const Post = require("../../models/Post/postModel");

module.exports = async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post)
            return res.status(400).json("POST NOT FOUND")
        let comment = await post.comments.find(commentId => commentId.id.toString() === req.params.comment_id.toString())
        // console.log(post)
        // console.log(comment)
        // console.log(req.user.id.toString())
        // console.log(post.user.toString())
        if (!comment)
            return res.status(400).json("COMMENT NOT FOUND")
        if ((comment.user.toString() !== req.user.id.toString()) || (post.user.toString() !== req.user.id.toString()))
            return res.status(401).json("YOU ARE NOT AUTHORISED TO DELETE THIS COMMENT")

        await post.comments.pop(comment);
        await post.save()
        res.json(post)

    } catch (error) {
        console.error(error)
        return res.status(500).json("SERVER ERROR")
    }
}