const Post = require("../../models/Post/postModel");

module.exports = async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        res.json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
};