"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setsetPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  // if already logged in redirect to / page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, [router]);

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
      if (result?.token) {
        localStorage.setItem("token", JSON.stringify(result.token));
        router.push("/");
      }
    } catch (error) {
      setLoginError("error occured");
      console.error(error);
    }
  };
  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.formHeader}>log in</h1>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="password"
            onChange={(event) => setsetPassword(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <input className={styles.checkbox} type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">remember me</label>
        </div>
        <button className={styles.logInBtn} type="submit">
          log in
        </button>
        <p>
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
