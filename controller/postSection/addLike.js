const Post = require("../../models/Post/postModel")

module.exports = async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post)
            return res.status(404).json("POST NOT FOUND")
        const newLike = {
            user: req.user.id
        }
        if (post.likes.find(like => like.user.toString() === req.user.id.toString())) {
            await post.likes.shift(newLike);
            await post.save()
            return res.json(post)
        }
        await post.likes.unshift(newLike);
        await post.save()
        res.json(post)
    } catch (error) {
        console.error(error)
        res.status(500).json("SERVER ERROR")
    }
}