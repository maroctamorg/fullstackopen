const mongoose = require('mongoose')
const { transform } = require('../utils/mongoose_helper')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
    },
    author: String,
    url: {
        type: String,
        required: [true, 'URL required'],
    },
    likes: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required'],
    },
})

blogSchema.set('toJSON', {
    transform: transform,
})

module.exports = mongoose.model('Blog', blogSchema)
