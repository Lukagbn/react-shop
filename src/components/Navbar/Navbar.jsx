"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import layout from "@/app/layout.module.css";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(null);
  const NAVBAR_LIST = [
    {
      name: "Products",
      url: "/",
      img: "/products.svg",
      className: styles.products,
    },
    {
      name: hasToken ? "Profile" : "Log In",
      url: hasToken ? "/profile" : "/login",
      img: "/profile.svg",
      className: styles.profile,
    },
    { name: "Cart", url: "/cart", img: "/cart.svg", className: styles.cart },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(!!token);
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
