const mongoose = require('mongoose');

// Định nghĩa khuôn mẫu (Schema) cho sản phẩm
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm không được để trống'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: [0, 'Giá sản phẩm không thể âm']
    },
    quantity: {
        type: Number,
        default: 0,
        min: [0, 'Số lượng không thể âm']
    }
}, {
    timestamps: true // Tự động thêm ngày tạo (createdAt) và ngày sửa (updatedAt)
});

// Tạo Model từ Schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;