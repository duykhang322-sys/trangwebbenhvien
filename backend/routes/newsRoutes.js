const express = require('express');
const router = express.Router();
const News = require('../models/News');

// 1. Lấy danh sách bài viết
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
});

// 2. Lấy 1 bài viết cụ thể (Dùng để hiển thị lên form Sửa)
router.get('/:id', async (req, res) => {
    try {
        const article = await News.findById(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu bài viết", error });
    }
});

// 3. Đăng bài mới
router.post('/', async (req, res) => {
    try {
        const newArticle = new News(req.body);
        await newArticle.save();
        res.status(201).json({ message: "Đăng bài thành công!", article: newArticle });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lưu vào Database", error });
    }
});

// 4. Cập nhật bài viết (Sửa)
router.put('/:id', async (req, res) => {
    try {
        await News.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "Cập nhật bài viết thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật", error });
    }
});

// 5. Xóa bài viết
router.delete('/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Đã xóa bài viết thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa bài", error });
    }
});

module.exports = router;