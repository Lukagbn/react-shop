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
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (token || sessionToken) {
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
    return <div className={styles.loadingData}>Loading product</div>;
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
          <span className={styles.productPrice}>${singleProduct.price}</span>
          {user.isLoggedIn || hasToken ? (
            <button onClick={handleAddToCart}>Add to cart</button>
          ) : (
            <Link href={"/login"}>Log in to add use cart</Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default page;
