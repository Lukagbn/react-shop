# 🛒 The Daily Haul

A simple e-commerce application built with Next.js (App Router), React, Redux Toolkit, and Yup.
The app fetches products from FakeStoreAPI, supports authentication, product details, and a fully working shopping cart.

## ✨ Features

### 🛍️ Products page

- Fetches products from FakeStoreAPI
- Displays product list with ratings

### 🔍 Product details

- Dynamic route using [id]
- Detailed product view

### 🔐 Authentication

- Login & Signup pages
- Built with React Hook Form + Yup validation
- Login checks credentials against fakestoreapi.com/users/{id}

### 🛒 Shopping Cart

- Add / remove products
- Increase / decrease quantity (max 10)
- Cart state managed with Redux

### 👤 User State Management

- User data stored globally using Redux Toolkit

### 💅 Modern UI

- CSS Modules
- Animated inputs & interactions

## 🧠 State Management (Redux)

User Slice

```
initialState:
{
  name: null,
  surname: null,
  age: null,
  isLoggedIn: false
}
```

Actions:

- updateUser – stores user info and marks user as logged in
- deleteUser – logs user out
- restoreUser – restores login state

Cart Slice

```
initialState:
{
  cartProducts: []
}
```

Actions:

- addToCart – adds product or increases quantity
- deleteFromCart – removes product
- decreaseQuantity – decreases quantity (minimum 1)

## 📁 Project Structure

```
public
├── bin.svg
├── cart.svg
├── products.svg
├── profile.jpg
├── profile.svg
└── star.svg

src
├── app
│   ├── (auth)
│   │   ├── login
│   │   │   ├── page.jsx
│   │   │   └── page.module.css
│   │   └── register
│   │       ├── page.jsx
│   │       └── page.module.css
│   ├── cart
│   │   ├── page.jsx
│   │   └── page.module.css
│   ├── products
│   │   ├── page.jsx
│   │   ├── page.module.css
│   │   └── details
│   │       └── [id]
│   │           ├── page.jsx
│   │           └── page.module.css
│   ├── profile
│   │   ├── page.jsx
│   │   └── page.module.css
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── layout.module.css
│   ├── not-found.js
│   ├── not-found.module.css
│   ├── page.js
│   ├── page.module.css
│   └── StoreProvider.js
│
├── components
│   ├── Footer
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   ├── Navbar
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.css
│   └── StarRating
│       ├── StarRating.jsx
│       └── StarRating.module.css
│
├── lib
│   ├── slices
│   │   ├── cartSlice.js
│   │   └── userSlice.js
│   ├── hook.js
│   └── store.js

.gitignore
eslint.config.mjs
jsconfig.json
next.config.json
package.json
readme.md
```

## 🧰 Tech Stack

- Next.js 16 (App Router)
- React 19
- Redux Toolkit
- React Redux
- React Hook Form
- Yup
- CSS Modules
- FakeStoreAPI

## 📦 Dependencies

```
{
  "next": "16.1.1",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0",
  "react-hook-form": "^7.71.1",
  "@hookform/resolvers": "^5.2.2",
  "yup": "^1.7.1"
}
```

## 🚀 Getting Started

```
npm install
npm run dev
```

Open:
http://localhost:3000

## 📝 Notes

- This project is frontend-only
- Authentication is simulated using FakeStoreAPI
- Tokens are stored in localStorage or sessionStorage
