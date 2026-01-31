<img width="1920" height="1080" alt="products" src="https://github.com/user-attachments/assets/7d3e91e5-7bb0-45c4-a4dc-4f5263542e7a" /># 🛒 The Daily Haul

A high-performance, fully responsive e-commerce application built with Next.js (App Router) and React. This project features a seamless shopping experience across all device sizes, utilizing Redux Toolkit for robust state management and FakeStoreAPI for dynamic data fetching. The app includes secure authentication, detailed product views, and a persistent shopping cart, with client-side form validation powered by Yup.

## 🛠️ Google PageSpeed Insights Score:

<img width="470" height="107" alt="score" src="https://github.com/user-attachments/assets/82e06d4e-61ba-4311-8bd3-b32991945f2d" />

## ✨ Features

### 🛍️ Products page

<img width="1920" height="1080" alt="products2" src="https://github.com/user-attachments/assets/a018b16b-8d3a-4c9e-900d-ef98b67fa652" />

- Fetches products from FakeStoreAPI
- Displays product list with ratings

### 🔍 Product details

<img width="1920" height="1080" alt="details" src="https://github.com/user-attachments/assets/f39290ba-1066-4e91-b709-2a4007ed7c44" />

- Dynamic route using [id]
- Detailed product view

### 🔐 Authentication

<img width="1920" height="1080" alt="login" src="https://github.com/user-attachments/assets/af23fc06-684c-437c-b9dc-543872dc3269" />

- Login & Signup pages
- Built with React Hook Form + Yup validation
- Login checks credentials against fakestoreapi.com/users/{id}

### 🛒 Shopping Cart

<img width="1920" height="1080" alt="cart" src="https://github.com/user-attachments/assets/d166a7e9-dafb-486f-a8ea-fb333329a13a" />

- Add / remove products
- Increase / decrease quantity (max 10)
- Cart state managed with Redux

### 👤 User State Management / Profile Page

<img width="1920" height="1080" alt="profile" src="https://github.com/user-attachments/assets/bf8f8340-f252-4882-9267-b0dfc10b121e" />

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
