const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST /products - Thao tác Create trong CRUD
router.post('/products', async (req, res) => {
    try {
        // Chặng 1 & 2: Nhận dữ liệu từ Client gửi lên
        const { name, price, quantity } = req.body;
        console.log('--- NHẬN DỮ LIỆU TỪ CLIENT ---', req.body);

        // Chặng 3: Model kiểm tra hợp lệ và ghi vào MongoDB Atlas
        const newProduct = await Product.create({
            name,
            price,
            quantity
        });

        console.log('--- ĐÃ GHI VÀO ATLAS THÀNH CÔNG ---', newProduct._id);

        // Chặng 4: Phản hồi mã 201 Created cùng dữ liệu kèm mã định danh _id
        res.status(201).json({
            success: true,
            message: 'Tạo mới sản phẩm thành công!',
            data: newProduct
        });

    } catch (error) {
        // Bắt lỗi nếu dữ liệu không thỏa mãn Schema (ví dụ thiếu tên hoặc giá âm)
        res.status(400).json({
            success: false,
            message: 'Dữ liệu gửi lên không hợp lệ',
            error: error.message
        });
    }
});

module.exports = router;