const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Ban Biên Tập' },
    imageUrl: { type: String } // Link ảnh đại diện
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);