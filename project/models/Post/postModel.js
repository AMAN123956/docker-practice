var mongoose = require('mongoose');

var userPostSchema = new mongoose.Schema({
    // REFERENCE TO USER POSTING THE CONTENT
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: { type: String, lowercase: true, },
    userName: { type: String },
    userImg: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    permission: { type: String },
    imageUrl: { type: String },
    videoUrl: { type: String },
    textPost: { type: String, required: true },
    location: {},
    social: {
        website: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String }
    },
    likes: [{

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        commenterName: { type: String, trim: true },
        commentText: { type: String, trim: true, required: true },
        date: { type: Date, default: Date.now },
        commenterImg: { type: String },
        likes: [{

            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        }],
    }
    ]
}, { timestamps: true });

const userPost = mongoose.model('post', userPostSchema);
module.exports = userPost