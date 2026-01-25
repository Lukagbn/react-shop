"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import layout from "@/app/layout.module.css";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/lib/hook";
import { restoreUser } from "@/lib/slices/userSlice";

function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
  const NAVBAR_LIST = [
    {
      name: "Products",
      url: "/",
      img: "/products.svg",
      className: styles.products,
    },
    {
      name: isLoggedIn ? "Profile" : "Log In",
      url: isLoggedIn ? "/profile" : "/login",
      img: "/profile.svg",
      className: styles.profile,
    },
    { name: "Cart", url: "/cart", img: "/cart.svg", className: styles.cart },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (token || sessionToken) {
      dispatch(restoreUser());
    }
  }, []);
  return (
    <header className={`${styles.header} ${layout.container}`}>
      <ul>
        {NAVBAR_LIST.map((item) => (
          <li
            key={item.name}
            className={`${pathname === item.url ? styles.active : null}`}
          >
            <Link href={`${item.url}`}>
              {item.name}
              <Image
                className={item.className}
                width={18}
                height={18}
                src={`${item.img}`}
                alt={`${item.name}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Navbar;
