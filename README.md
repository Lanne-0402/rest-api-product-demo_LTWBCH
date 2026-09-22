## Cấu trúc hệ thống
```text
├── config/
│   └── db.js            # Kết nối MongoDB Atlas qua Mongoose
├── models/
│   └── Product.js       # Định nghĩa Product Schema & Model
├── routes/
│   └── productRoutes.js # Khai báo route POST /products
├── .env                 # Chứa chuỗi kết nối và cổng server
├── .gitignore
├── package.json
└── server.js            # Khởi động Express server