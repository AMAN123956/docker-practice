const Post = require("../../models/Post/postModel");

module.exports = async (req, res) => {
    const update = req.body
    try {
        let post = await Post.findById(req.params.post_id);
        if (!post)
            return res.status(404).json("POST NOT FOUND...")
        if (req.user.id.toString() !== post.user.toString()) {
            // console.log(req.user)
            // console.log(post.user)
            return res.status(401).json("USER NOT AUTHORISED...")
        }
        await Post.findByIdAndUpdate(req.params.post_id, update);
        let updatedPost = await Post.findById(req.params.post_id)
        console.log(updatedPost)
        return res.status(201).json({
            success: true,
            data: updatedPost
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json("SERVER ERROR...")
    }
}