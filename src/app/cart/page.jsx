"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.css";
import styles from "./page.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Image from "next/image";
import {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
} from "@/lib/slices/cartSlice";

function page() {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const [hasToken, setHasToken] = useState(false);
  const getItemTotal = (item) => (item.price * item.quantity).toFixed(2);
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (token || sessionToken) {
      setHasToken(!hasToken);
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };
  const handleIncrease = (item) => {
    dispatch(addToCart(item));
  };
  const handleDecrease = (item) => {
    dispatch(decreaseQuantity(item));
  };
  useEffect(() => {
    checkUser();
  }, []);
  if (!hasToken) {
    return (
      <h2 className={styles.loadingMessage}>
        you must{" "}
        <Link className={styles.loginBtn} href={"/login"}>
          log in
        </Link>{" "}
        to continiue!
      </h2>
    );
  }
  if (hasToken && cartProducts.length === 0) {
    return (
      <h2 className={styles.loadingMessage}>
        Cart is empty.{" "}
        <Link className={styles.loginBtn} href={"/products"}>
          Add products
        </Link>
      </h2>
    );
  }
  return (
    <main className={`${styles.cartContainer} ${layout.container}`}>
      <div className={styles.cartItemsHeader}>
        <div>PRODUCTS</div>
        <div>QUANTITY</div>
        <div>PRICE</div>
      </div>
      {cartProducts?.map((item) => (
        <div className={styles.cartItem} key={item.id}>
          <div className={styles.cartHeadWrapper}>
            <Link href={`/products/details/${item.productId}`}>
              <Image src={item.image} width={80} height={90} alt={item.title} />
            </Link>
            <div className={styles.cartImgTextWrapper}>
              <p>{item.title}</p>
              <h5>{item.category}</h5>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={styles.substract}
              onClick={() => handleDecrease(item)}
            >
              -
            </button>
            <p className={styles.quantity}>{item.quantity}</p>
            <button
              className={styles.plus}
              onClick={() => handleIncrease(item)}
            >
              +
            </button>
          </div>
          <div className={styles.priceContainer}>
            <span>${getItemTotal(item)}</span>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => handleDelete(item.id)}
          >
            <Image src={"/bin.svg"} width={20} height={20} alt="bin" />
          </button>
        </div>
      ))}
      <div className={styles.cartSummary}>
        <h3>
          Total: $
          {cartProducts
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
      </div>
    </main>
  );
}

export default page;
