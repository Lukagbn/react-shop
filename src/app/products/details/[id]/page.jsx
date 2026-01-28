"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import layout from "@/app/layout.module.css";
import Image from "next/image";
import StarRating from "@/components/StarRating/StarRating";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import Link from "next/link";
import { addToCart } from "@/lib/slices/cartSlice";

function page() {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [hasToken, setHasToken] = useState(false);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(singleProduct));
  };
  const checkUser = async () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (localUser || sessionUser) {
      setHasToken(!hasToken);
    }
  };
  useEffect(() => {
    checkUser();
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((resp) => setSingleProduct(resp));
  }, []);
  if (!singleProduct) {
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
    <section className={`${layout.container} ${styles.cardSection}`}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1>{singleProduct.title}</h1>
          <Image
            width={200}
            height={200}
            alt={singleProduct.title}
            src={singleProduct.image}
          />
        </div>
        <div className={styles.cardBody}>
          <StarRating
            className={styles.star}
            rating={singleProduct.rating.rate}
            count={singleProduct.rating.count}
          />
          <h3 className={styles.category}>{singleProduct.category}</h3>
          <p>{singleProduct.description}</p>
          <div className={styles.btnContainer}>
            <span className={styles.productPrice}>${singleProduct.price}</span>
            {user.isLoggedIn || hasToken ? (
              <button onClick={handleAddToCart}>Add to cart</button>
            ) : (
              <Link href={"/login"}>Log in to use cart</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
