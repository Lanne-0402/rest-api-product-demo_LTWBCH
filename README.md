# RESTful API Design & Database Demo

Dự án mô phỏng thiết kế **RESTful API** kết nối cơ sở dữ liệu **MongoDB Atlas** thông qua thư viện **Mongoose**.
Chức năng chính: **Tạo mới sản phẩm (`POST /api/products`)** và quản trị dữ liệu theo chuẩn REST.

---

## 🛠 Yêu cầu môi trường
* Đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản 18.x hoặc 20.x trở lên).
* Đã cài đặt [Git](https://git-scm.com/).
* Đã cài đặt công cụ kiểm thử API: [Postman Desktop App](https://www.postman.com/downloads/) hoặc extension **Thunder Client** trên VS Code.

---
```text
rest-api-product-demo/
├── config/
│   └── db.js            # Khởi tạo kết nối Mongoose đến MongoDB Atlas
├── models/
│   └── Product.js       # Product Schema & Model Validation
├── routes/
│   └── productRoutes.js # Xử lý các tuyến đường dẫn API cho Product
├── .env                 # File cấu hình biến môi trường (không đẩy lên Git)
├── .gitignore           # Danh sách file loại trừ khỏi Git
├── package.json         # Danh sách dependencies và scripts
├── README.md            # Tài liệu hướng dẫn sử dụng
└── server.js            # Khởi tạo Express server
```

## 🚀 Hướng dẫn cài đặt dự án

### Bước 1: Clone mã nguồn về máy tính
Mở Terminal trên máy và chạy lệnh:
```bash
git clone https://github.com/Lanne-0402/rest-api-product-demo_LTWBCH.git
cd rest-api-product-demo
git checkout feat/product-demo
```
### Bước 2: Cài đặt các thư viện phụ thuộc
Cài đặt toàn bộ các gói package cần thiết (express, mongoose, dotenv, cors, nodemon):
```bash
npm install
```
### Bước 3: Cấu hình biến môi trường kết nối Database
- Tạo một file mới tên là .env tại thư mục gốc của dự án (ngang hàng với package.json).
- Dán nội dung cấu hình sau vào file .env:
```bash
PORT=5000
MONGO_URI=mongodb+srv://admin:Admin244466666@hlancluster0.ndk8wqs.mongodb.net/shop_db?appName=HLanCluster0
```
### Bước 4: Khởi chạy máy chủ Backend
```bash
npm run dev
```
Nếu màn hình Terminal hiển thị 2 dòng thông báo sau là hệ thống đã kết nối thành công:
```bash
[Server] Đang lắng nghe tại cổng http://localhost:5000
[Database] Đã kết nối thành công tới MongoDB Atlas: cluster0-shard-00-00...
```

## Hướng dẫn Import vào Postman
- Chạy  
```bash 
git pull origin feat/product-demo
```
- Mở Postman -> Nhìn lên góc trên bên trái (cạnh nút New hoặc ngay trên danh sách Collections), bấm nút Import -> Kéo thả file products_api.postman_collection.json từ thư mục dự án vào cửa sổ Postman.
- Toàn bộ thư mục RESTful API Demo - Products, route POST /api/products và các dòng script test bạn đã cấu hình sẽ xuất hiện đầy đủ trên máy của 2 bạn.

## 📡 Hướng dẫn kiểm thử HTTP Methods với Postman

### 1. Thao tác Thêm mới sản phẩm (Create - POST)
* URL: http://localhost:5000/api/products
* HTTP Method: POST
* Headers:
- Content-Type: application/json
- Body: Chọn tab Body -> chọn raw -> chọn định dạng JSON -> Dán gói tin có dạng tương tự:
```bash
{
  "name": "Tai nghe Sony WH-1000XM5",
  "price": 6990000,
  "quantity": 12
}
```
* Phản hồi thành công:
- HTTP Status Code: 201 Created
- Response Body:
```bash
{
  "success": true,
  "message": "Tạo mới sản phẩm thành công!",
  "data": {
    "_id": "66xxxxxx...",
    "name": "Tai nghe Sony WH-1000XM5",
    "price": 6990000,
    "quantity": 12,
    "createdAt": "2026-09-20T...",
    "updatedAt": "2026-09-20T..."
  }
}
```
### 2. Kiểm thử cơ chế Validation của Schema (Bắt lỗi - 400 Bad Request)
*Để kiểm tra tính chặt chẽ của Product Schema, thử gửi yêu cầu với dữ liệu sai quy chuẩn:
- Trường hợp Giá âm:
```bash
{
  "name": "Chuột máy tính",
  "price": -50000,
  "quantity": 5
}
```
* Kết quả kỳ vọng::
- HTTP Status Code: 400 Bad Request
- Response Body:
```bash
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "error": "Product validation failed: price: Giá sản phẩm không thể là số âm"
}
```