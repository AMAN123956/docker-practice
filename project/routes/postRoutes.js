const router = require('express').Router()
const post = require('../models/Post/postModel')
const { protect } = require('../middleware/authMiddleware')
const createPost = require('../controller/postSection/createPost')
const getPosts = require('../controller/postSection/getPosts')
const getSinglePost = require('../controller/postSection/getSinglePost')
const removePost = require('../controller/postSection/removePost')
const getUserPostsByID = require('../controller/postSection/getUserPostsByID')
const updatePost = require('../controller/postSection/updatePost')
const addLike = require('../controller/postSection/addLike')
const addCommentLike = require('../controller/postSection/addCommentLike')
const addComment = require('../controller/postSection/addComment')
const deleteComment = require('../controller/postSection/deleteComment')

// ROUTE FOR POSTING A NEW POST IN FEED
router.route('/').post(protect, createPost)

// ROUTE FOR GETTING ALL POSTS IN FEED
router.route('/').get(getPosts)

// ROUTE FOR GETTING A SINGLE POST BY ID IN FEED
router.route('/single_post/:post_id').get(getSinglePost).put(protect, updatePost);

// ROUTE FOR DELETING A SINGLE POST BY ID IN FEED
router.route('/delete_post/:post_id').delete(protect, removePost)


// ROUTE FOR GETTING ALL POSTS BY USER ID IN FEED
router.route('/user_posts/:user_id').get(getUserPostsByID);


// ROUTE FOR ADDING A LIKE TO POST IN FEED
router.route('/add_like/:post_id').put(protect, addLike)

// ROUTE FOR ADDING A LIKE TO POST IN FEED
router.route('/add_like/:post_id/:comment_id').put(protect, addCommentLike)


// ROUTE FOR ADDING A COMMENT TO A POST IN FEED
router.route('/add_comment/:post_id').put(protect, addComment)

// ROUTE FOR DELETING A COMMENT OF A POST IN FEED
router.route('/delete_comment/:post_id/:comment_id').delete(protect, deleteComment)

module.exports = router