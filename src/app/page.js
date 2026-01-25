"use client";
import { redirect } from "next/navigation";
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
  return <div>page</div>;
}

export default page;
