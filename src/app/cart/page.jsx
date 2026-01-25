"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.css";
import styles from "./page.module.css";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Image from "next/image";
import { deleteFromCart } from "@/lib/slices/cartSlice";

function page() {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.cart.cartProducts);
  const [hasToken, setHasToken] = useState(false);
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (token || sessionToken) {
      setHasToken(!hasToken);
    }
  };
  const handleDelete = (id) => {
    console.log("Deleting ID:", id);
    dispatch(deleteFromCart(id));
  };
  useEffect(() => {
    checkUser();
  }, []);
  if (!hasToken) {
    return (
      <div className={layout.container}>you must log in ro continiue!</div>
    );
  }
  if (hasToken && cartProducts.length === 0) {
    return <div className={layout.container}>Cart is empty</div>;
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
          <div className={styles.cartBodyWrapper}>
            <div className={styles.cartQuantityContainer}>
              {/* disabled={number === 1} */}
              <button className={styles.plus}>-</button>
              <p>{item.quantity}</p>
              {/* disabled={number === 10} */}
              <button className={styles.subtract}>+</button>
            </div>
            <div>
              {/* {(item.price * number).toFixed(1)} */}
              <span>${item.price * item.quantity}</span>
            </div>
            <div>
              <button onClick={() => handleDelete(item.id)}>
                <Image src={"/bin.svg"} width={20} height={20} alt="bin" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

export default page;
