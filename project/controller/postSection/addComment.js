const { validationResult } = require("express-validator");
const Post = require("../../models/Post/postModel")

module.exports = async (req, res) => {
    const { commentText } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        let post = await Post.findById(req.params.post_id)
        if (!post)
            return res.status(404).json("POST NOT FOUND")
        const newComment = {
            commentText,
            user: req.user.id,
            commenterName: req.user.name,
            commenterImg: req.user.userImg,
        }
        await post.comments.unshift(newComment)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        console.error(error)
        res.status(500).json("SERVER ERROR")
    }
}