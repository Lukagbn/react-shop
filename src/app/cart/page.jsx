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
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const [hasToken, setHasToken] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [checkOut, setCheckOut] = useState(false);
  const totalPrice = () => {
    return cartProducts.reduce(
      (total, item) =>
        total + item.price * item.quantity * (1 - discount / 100),
      0,
    );
  };
  const checkDiscount = (item) => {
    if (item.target.value == 2026) {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };
  const getItemTotal = (item) => (item.price * item.quantity).toFixed(2);
  const checkUser = async () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (localUser || sessionUser) {
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
        <Link className={styles.btnLink} href={"/login"}>
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
        <Link className={styles.btnLink} href={"/products"}>
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
          <div
            className={checkOut ? styles.overlay : styles.invisible}
            onClick={() => setCheckOut(false)}
          ></div>
          <div
            className={checkOut ? `${styles.checkOut}` : `${styles.invisible}`}
          >
            <button
              className={styles.checkOutBtnClose}
              type="button"
              onClick={() => setCheckOut(!checkOut)}
            >
              X
            </button>
            <h2>Total</h2>
            <p>
              Original Price: <span>${totalPrice().toFixed(2)}</span>
            </p>
            <p>
              Discounted: <span>{discount ? ` ${discount}%` : `0%`}</span>
            </p>
            <div>
              <label>Card Numbers</label>
              <input className={styles.numberInput} type="text" required />
            </div>
            <div>
              <label>CVV</label>
              <input className={styles.numberInput} type="text" required />
            </div>
            <div>
              <label>Expire Date</label>
              <input className={styles.dateInput} type="date" required />
            </div>
            <button
              className={styles.checkOutBtn}
              type="button"
              onClick={() => router.push("/")}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
      <div className={styles.cartSummary}>
        <div className={styles.formGroup}>
          <input
            type="text"
            onChange={(event) => checkDiscount(event)}
            required
          />
          <label>Promo Code</label>
        </div>
        <h3>
          Total: ${totalPrice().toFixed(2)}
          {discount ? ` (With ${discount}% discount)` : ""}
        </h3>
        <button onClick={() => setCheckOut(!checkOut)}>
          Proceed to checkout
        </button>
      </div>
    </main>
  );
}

export default page;
