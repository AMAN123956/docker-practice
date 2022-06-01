const router=require('express').Router()
const { protect } = require('../middleware/authMiddleware')
const { getBlogs, addBlogs ,getBlog ,updateBlog,deleteBlog} = require('../controller/blogSection/blog')
const { getBlogComments, addBlogComments } = require("../controller/blogSection/blogComment")
const {getBlogLikes, addBlogLikes}   = require("../controller/blogSection/blogLike")

router.route('/').get(getBlogs)
router.route('/').post(protect, addBlogs)
router.route('/:id').get(getBlog).put(protect,updateBlog).delete(protect,deleteBlog)
/* Comments */
router.route('/getComment/:id').get(getBlogComments)
router.route('/saveComment/:id').post(protect, addBlogComments)
/* Likes */
router.route('/getLikes/:id').get(getBlogLikes)
router.route('/saveLike/:id').post(protect, addBlogLikes)

/* Router Exported */

module.exports=router