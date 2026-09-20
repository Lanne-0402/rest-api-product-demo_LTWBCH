const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

// Khởi tạo ứng dụng
const app = express();

// Kết nối cơ sở dữ liệu MongoDB Atlas
connectDB();

// Middleware: Cho phép đọc dữ liệu JSON từ body request
app.use(express.json());
app.use(cors());

// Khai báo Routes
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Backend đang lắng nghe tại cổng ${PORT}`);
});