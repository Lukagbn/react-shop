"use client";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import React, { useEffect } from "react";

function page() {
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (token || sessionToken) {
      redirect("/products");
    } else {
      redirect("/login");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return <h2 className={styles.loadingMessage}>Loading please wait...</h2>;
}

export default page;
