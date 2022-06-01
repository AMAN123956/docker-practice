const Post = require("../../models/Post/postModel");

module.exports = async (req, res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post)
            return res.status(404).json("POST NOT FOUND...")

        if (post.user.toString() !== req.user.id.toString())
            return res.status(401).json("YOU ARE NOT AUTHORISED TO DELETE THIS POST...")

        await post.remove();
        res.json("POST IS REMOVED...")
    } catch (error) {
        console.error(error)
        return res.status(500).json("SERVER ERROR...")
    }
}
