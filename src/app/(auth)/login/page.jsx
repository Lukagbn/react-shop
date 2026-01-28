"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hook";
import { updateUser } from "@/lib/slices/userSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
});

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleCheck = async () => {
    setChecked(!checked);
  };
  const handleLogIn = async (data) => {
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setLoginError("Incorrect login information");
        return;
      }
      const result = await res.json();
      const userData = await fetch("https://fakestoreapi.com/users/1");
      const parsedUserData = await userData.json();
      dispatch(updateUser(parsedUserData));
      if (checked) {
        localStorage.setItem("token", result.token);
      } else {
        sessionStorage.setItem("sessionToken", result.token);
      }
      router.push("/");
    } catch (error) {
      setLoginError("Something went wrong. Try again.");
    }
  };
  const checkUser = async () => {
    const token = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("sessionToken");
    if (token || sessionToken) {
      redirect("/");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(handleLogIn)} noValidate>
        <h1 className={styles.formHeader}>log in</h1>
        <div className={styles.formGroup}>
          <input type="text" {...register("username")} />
          <label>Username</label>
          {errors.username && (
            <span className={styles.errorMessage}>
              {errors.username.message}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type={passwordVisible ? "text" : "password"}
            {...register("password")}
          />
          <label>Password</label>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
          <button
            className={styles.passwordVisible}
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? "show" : "hide"}
          </button>
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
        {loginError && <div className={styles.errorMessage}>{loginError}</div>}
      </form>
    </div>
  );
}

export default page;
