# **Library Management System**

A RESTful API for managing books and borrow records using **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

# **Setup Instructions**

## **1. Clone and Install**

```bash
git clone https://github.com/Eshrak20/lib-mgmt-ts
cd  lib-mgmt-ts
npm install


PORT=5000
DATABASE_URL=mongodb://127.0.0.1:27017/library_db

# Development
npm run dev

# Production
npm run build
npm start
```

# **Optional but helpful.**

# For Clear cache and run eslint

npx eslint . --ext .ts --no-cache
