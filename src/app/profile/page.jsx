"use client";
import React, { useEffect, useState } from "react";
import layout from "@/app/layout.module.css";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const fetchData = async () => {
    const resp = await fetch("https://fakestoreapi.com/users/3");
    const user = await resp.json();
    return setUserData(user);
  };
  const handleClick = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("sessionToken");
    window.location.reload();
  };
  useEffect(() => {
    fetchData();
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (!(token || sessionToken)) {
      router.push("/");
    }
  });
  if (!userData) {
    return <div>loading user</div>;
  }
  return (
    <div className={`${styles.profileContainer} ${layout.container}`}>
      <h1>Welcome {userData.username}!</h1>
      <ul>
        <h2>Details:</h2>
        <li>
          <span>firstname:</span> {userData.name.firstname}
        </li>
        <li>
          <span>lastname:</span> {userData.name.lastname}
        </li>
        <li>
          <span>phone:</span> {userData.phone}
        </li>
        <h2>Location:</h2>
        <ul>
          <li>
            <span>city:</span> {userData.address.city}
          </li>
          <li>
            <span>street:</span> {userData.address.street}
          </li>
          <li>
            <span>number:</span> {userData.address.number}
          </li>
          <li>
            <span>zipcode:</span> {userData.address.zipcode}
          </li>
        </ul>
        <button onClick={handleClick}>log out</button>
      </ul>
    </div>
  );
}

export default page;
