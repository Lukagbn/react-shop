"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.css";
import styles from "./page.module.css";
import CartItem from "@/components/CartItem/CartItem";

function page() {
  const [cartData, setCartData] = useState(null);
  const [hasToken, setHasToken] = useState(false);
  const fetchCartData = async () => {
    const res = await fetch("https://fakestoreapi.com/carts/2");
    const response = await res.json();
    return setCartData(response.products);
  };
  useEffect(() => {
    fetchCartData();
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(!hasToken);
    }
  }, []);
  if (!hasToken) {
    return <div>you must log in ro continiue!</div>;
  }
  if (!cartData) {
    return <div className={styles.loadingData}>loading cart</div>;
  }
  return (
    <main className={`${styles.cartContainer} ${layout.container}`}>
      <div className={styles.cartItemsHeader}>
        <div>PRODUCTS</div>
        <div>QUANTITY</div>
        <div>PRICE</div>
      </div>
      {cartData.map((item) => (
        <CartItem
          key={item.productId}
          item={item}
          cartData={cartData}
          setCartData={setCartData}
        />
      ))}
    </main>
  );
}

export default page;
