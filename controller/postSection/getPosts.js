const Post = require("../../models/Post/postModel");

module.exports = async (req, res) => {
    try {
        let posts = await Post.find();
        res.render("posts");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server Error...");
    }
};