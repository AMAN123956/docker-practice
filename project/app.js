const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('colors')
require('dotenv').config({ path: './config/dev.env' })
const connectDB = require('./db/db')
const app = express()
app.use(express.json())
app.use(cors())
connectDB()
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'))
}

// BLOG ROUTER
const blogRouter = require('./routes/blogRoutes')
app.use('/blogs', blogRouter)

// USER ROUTER
const userRouter = require('./routes/userRoutes')
app.use('/users', userRouter)

// POST ROUTER
const postRouter = require('./routes/postRoutes')
app.use('/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`.yellow) })