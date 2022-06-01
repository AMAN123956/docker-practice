const UserBlog = require('../../models/blogModel')

const getBlog = async (req, res, next) => {
    try {
        const _id = req.params.id
        console.log(_id[0])
        result_id = ""
        for (let i = 1; i < _id.length; i++)
            result_id += _id[i];
        /* const author=req.user._id */
        console.log("r" + result_id)
        const blog = await UserBlog.findOne({ _id: result_id })
        console.log(blog)
        res.status(200).json({
            success: true,
            data: blog
        })
    } catch (e) {
        console.log(`Error occured ${e}`)
        return res.status(500).json({
            success: false,
            error: `${e}`
        })
    }
}


const getBlogs = async (req, res, next) => {
    try {
        /* const author=req.user._id  */
        const blogs = await UserBlog.find({})

        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        })
    } catch (e) {
        console.log(`Error occured ${e}`)
        return res.status(500).json({
            success: false,
            error: `${e}`
        })
    }
}

const addBlogs = async (req, res, next) => {
    try {
        const { title, image, shortDescription, blogContent, likes = [], comment = [] } = req.body
        const author = req.user._id
        console.log(author)
        const blogs = await UserBlog.create({ title, image, shortDescription, blogContent, likes, comment, author })

        return res.status(201).json({
            success: true,
            data: blogs
        })

    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e)
            const messages = Object.values(e.errors).map(val => val.message)
            res.status(400).json({
                success: false,
                error: messages
            })

        } else {
            console.log(`Error occured ${e}`)
            return res.status(500).json({
                success: false,
                error: `${e}`
            })
        }
    }
}

const updateBlog = async (req, res, next) => {
    try {
        const _id = req.params.id
        const update = req.body
        const author = req.user._id
        // console.log(author)
        const blogFound = await UserBlog.findById(_id)
        // console.log(typeof blogFound.author)
        if (blogFound) {
            if (JSON.stringify(blogFound.author) !== JSON.stringify(author)) {
                res.status(404)
                throw new Error('User not found')
            }
            await UserBlog.findByIdAndUpdate(_id, update)
            const blog = await UserBlog.findById(_id)
            return res.status(201).json({
                success: true,
                data: blog
            })
        } else {
            res.status(404)
            throw new Error('Blog not found')
        }
    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e)
            const messages = Object.values(e.errors).map(val => val.message)
            res.status(400).json({
                success: false,
                error: messages
            })

        } else {
            console.log(`Error ${e}`)
            return res.status(500).json({
                success: false,
                error: `${e}`
            })
        }
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const _id = req.params.id
        const author = req.user._id
        const blogFound = await UserBlog.findById(_id)
        // console.log(typeof blogFound.author)
        if (blogFound) {
            if (JSON.stringify(blogFound.author) !== JSON.stringify(author)) {
                res.status(404)
                throw new Error('User not found')
            }
            await UserBlog.findByIdAndDelete(_id)
            return res.status(201).json({
                success: true
            })
        } else {
            res.status(404)
            throw new Error('Blog not found')
        }
    } catch (e) {
        if (e.name === 'ValidationError') {
            console.log(e)
            const messages = Object.values(e.errors).map(val => val.message)
            res.status(400).json({
                success: false,
                error: messages
            })

        } else {
            console.log(`Error ${e}`)
            return res.status(500).json({
                success: false,
                error: `${e}`
            })
        }
    }
}

module.exports = { getBlogs, addBlogs, getBlog, updateBlog, deleteBlog }