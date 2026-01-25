"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import layout from "@/app/layout.module.css";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating/StarRating";
import { useAppSelector } from "@/lib/hook";

function Page() {
  const user = useAppSelector((state) => state.user);
  const [hasToken, setHasToken] = useState(false);
  const [product, setProduct] = useState(null);
  const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const result = await res.json();
    return setProduct(result);
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
    fetchProducts();
  }, []);
  if (!product) {
    return (
      <h2 className={styles.loadingData}>products loading, please wait...</h2>
    );
  }
  return (
    <section className={`${styles.cardContainer} ${layout.container}`}>
      {product?.map((item) => (
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
              <StarRating rating={item.rating.rate} count={item.rating.count} />
              <h2>${item.price}</h2>
              {user.isLoggedIn || hasToken ? (
                <button onClick={hadleAddToCart}>Add to cart</button>
              ) : (
                <Link href={"/login"}>Log in to add use cart</Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Page;
