const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');


// POST /products - Create: Tạo mới sản phẩm

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


// GET /products - Read All: Lấy danh sách toàn bộ sản phẩm

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ khi lấy danh sách sản phẩm',
            error: error.message
        });
    }
});


// GET /products/:id - Read One: Lấy chi tiết 1 sản phẩm theo _id

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra định dạng ObjectId hợp lệ (chuỗi hex 24 ký tự)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID không hợp lệ. Phải là chuỗi hex 24 ký tự.'
            });
        }

        const product = await Product.findById(id);

        // Nếu không tìm thấy document nào khớp _id
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm với ID này.'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ khi lấy chi tiết sản phẩm',
            error: error.message
        });
    }
});

// PATCH /products/:id - Update: Cập nhật một phần thông tin sản phẩm

router.patch('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID không hợp lệ. Phải là chuỗi hex 24 ký tự.'
            });
        }

        // { new: true }         → trả về document SAU khi cập nhật (không phải bản cũ)
        // { runValidators: true } → kích hoạt validation của Schema khi update
        //                          (bắt lỗi nếu price âm, quantity âm, v.v.)
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm với ID này.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật sản phẩm thành công!',
            data: updatedProduct
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Dữ liệu cập nhật không hợp lệ',
            error: error.message
        });
    }
});


// DELETE /products/:id - Delete: Xóa sản phẩm theo _id

router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID không hợp lệ. Phải là chuỗi hex 24 ký tự.'
            });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm với ID này.'
            });
        }

        res.status(200).json({
            success: true,
            message: `Đã xóa sản phẩm "${deletedProduct.name}" thành công.`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ khi xóa sản phẩm',
            error: error.message
        });
    }
});

module.exports = router;