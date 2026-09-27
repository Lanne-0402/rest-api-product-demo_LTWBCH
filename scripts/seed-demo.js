// Explicit opt-in: npm run seed:demo (uses the configured MONGO_URI).
require('dotenv').config();
const dns = require('dns');
const mongoose = require('mongoose');
const Product = require('../models/Product');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const products = [
    ['Demo - Bàn phím', 650000, 20],
    ['Demo - Chuột', 250000, 30],
    ['Demo - Màn hình', 3200000, 8],
    ['Demo - Tai nghe', 890000, 15],
    ['Demo - Webcam', 1200000, 12],
    ['Demo - Lót chuột', 120000, 40]
];

async function main() {
    if (!process.env.MONGO_URI) throw new Error('Cần cấu hình MONGO_URI trước khi chạy seed.');
    await mongoose.connect(process.env.MONGO_URI);
    for (const [name, price, quantity] of products) {
        await Product.updateOne({ name }, { $setOnInsert: { name, price, quantity } }, { upsert: true });
    }
    console.log('Đã đảm bảo 6 sản phẩm Demo (không tạo trùng khi chạy lại).');
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
}).finally(() => mongoose.disconnect());
