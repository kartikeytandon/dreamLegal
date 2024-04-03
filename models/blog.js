const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true,
    },
    costumerSegment: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    isBookmarked: {
        type: Boolean,
        default: false
    },
    isSponsored: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
    }
})

module.exports = mongoose.model('Blog', blogSchema);