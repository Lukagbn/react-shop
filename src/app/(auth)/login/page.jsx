"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { updateUser } from "@/lib/slices/userSlice";

function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setsetPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const handleCheck = async () => {
    setChecked(!checked);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (token || sessionToken) {
      router.replace("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length < 4 || password.length < 7) {
      return setLoginError("incorrect login information!");
    }
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      const result = await res.json();
      const userData = await fetch("https://fakestoreapi.com/users/1");
      const parsedUserData = await userData.json();
      dispatch(updateUser(parsedUserData));
      if (result?.token && checked) {
        localStorage.setItem("token", JSON.stringify(result.token));
        router.push("/");
      } else {
        sessionStorage.setItem("sessionToken", JSON.stringify(result.token));
        router.push("/");
      }
    } catch (error) {
      setLoginError("error occured");
      console.error(error);
    }
  };
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} noValidate>
        <h1 className={styles.formHeader}>log in</h1>
        <div className={styles.formGroup}>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            required
            onChange={(e) => setsetPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="checkbox"
            checked={checked}
            onChange={handleCheck}
          />
          <label htmlFor="checkbox">Remember me</label>
        </div>
        <button className={styles.logInBtn} type="submit">
          log in
        </button>
        <p className={styles.link}>
          Dont have an account?{" "}
          <Link className={styles.singupLink} href={"/register"}>
            Sign up
          </Link>
        </p>
        {loginError && <div>{loginError}</div>}
      </form>
    </div>
  );
}

export default page;
