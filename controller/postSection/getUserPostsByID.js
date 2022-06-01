const Post = require("../../models/Post/postModel")

module.exports = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.user_id })
        res.json(posts)
    } catch (error) {
        console.error(error);
        return res.status(500).json("SERVER ERROR...")
    }
}