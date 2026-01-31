"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import layout from "@/app/layout.module.css";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating/StarRating";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { addToCart } from "@/lib/slices/cartSlice";

function Page() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [hasToken, setHasToken] = useState(false);
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const result = await res.json();
    setProducts(result);
    setFilteredProducts(result);
  };
  const checkUser = async () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (localUser || sessionUser) {
      setHasToken(!hasToken);
    }
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    console.log(item);
  };
  const filterProducts = (item) => {
    const category = item.target.value;
    let filtered;
    if (category === "all") {
      filtered = products;
    } else {
      filtered = products.filter((product) => product.category === category);
    }
    setFilteredProducts(filtered);
  };
  useEffect(() => {
    checkUser();
    fetchProducts();
  }, []);
  if (!products) {
    return (
      <h2 className={styles.loadingMessage}>
        loading, please wait{" "}
        <div className={styles.dotContainer}>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </div>
      </h2>
    );
  }
  return (
    <section className={`${layout.container} ${styles.section}`}>
      <div className={styles.filterProductsContainer}>
        <span>Filter Products By Category:</span>
        <select
          className={styles.filterProducts}
          name="category"
          id="category"
          onChange={(item) => filterProducts(item)}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="men's clothing">Men's Clothing</option>
        </select>
      </div>
      <div className={styles.cardContainer}>
        {filteredProducts?.map((item) => (
          <div key={item.id}>
            <div className={styles.card}>
              <Link href={`/products/details/${item.id}`}>
                <Image
                  src={item.image}
                  width={150}
                  height={150}
                  alt={item.title}
                />
              </Link>
              <div className={styles.cardBody}>
                <p className={styles.location}>Ships to ukraine</p>
                <h3>{item.title}</h3>
                <StarRating
                  rating={item.rating.rate}
                  count={item.rating.count}
                />
                <h2>${item.price}</h2>
                {user.isLoggedIn || hasToken ? (
                  <button onClick={() => handleAddToCart(item)}>
                    Add to cart
                  </button>
                ) : (
                  <Link href={"/login"}>Log in to use cart</Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Page;
