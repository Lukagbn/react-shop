"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.css";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import Image from "next/image";
function page() {
  const [userData, setUserData] = useState(null);
  const fetchData = async () => {
    const resp = await fetch("https://fakestoreapi.com/users/3");
    const user = await resp.json();
    setUserData(user);
  };
  const handleClick = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("sessionToken");
    window.location.reload();
  };
  const checkUser = () => {
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (!(token || sessionToken)) {
      redirect("/");
    }
  };
  useEffect(() => {
    fetchData();
    checkUser();
  }, []);
  if (!userData)
    return (
      <h2 className={`${layout.container} ${styles.loading}`}>
        Loading please wait…
      </h2>
    );
  return (
    <section className={`${layout.container} ${styles.profileContainer}`}>
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <Image
            src="/profile.jpg"
            alt="Profile picture"
            width={120}
            height={120}
            className={styles.avatar}
          />
        </div>
        <h1>Welcome, {userData.username}</h1>
        <div className={styles.section}>
          <h2>Personal Details</h2>
          <ul>
            <li>
              <span>First name:</span> {userData.name.firstname}
            </li>
            <li>
              <span>Last name:</span> {userData.name.lastname}
            </li>
            <li>
              <span>Phone:</span> {userData.phone}
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Location</h2>
          <ul>
            <li>
              <span>City:</span> {userData.address.city}
            </li>
            <li>
              <span>Street:</span> {userData.address.street}
            </li>
            <li>
              <span>Number:</span> {userData.address.number}
            </li>
            <li>
              <span>Zipcode:</span> {userData.address.zipcode}
            </li>
          </ul>
        </div>
        <button className={styles.logoutBtn} onClick={handleClick}>
          Log out
        </button>
      </div>
    </section>
  );
}

export default page;
