"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Firstname is required!")
    .min(4, "Firstname must be at least 4 symbols!")
    .max(20, "Firstname must be maximum 20 symbols!"),
  lastName: yup
    .string()
    .required("Lastname is required!")
    .min(4, "Lastname must be at least 4 symbols!")
    .max(20, "Lastname must be maximum 20 symbols!"),
  age: yup
    .number()
    .required("Age is required!")
    .min(13, "Your age must be at least 13!")
    .max(120, "Your age must be maximum 120!"),
  email: yup.string().required("Email is required!").email("Incorrect email!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be minimum 6 symbols!")
    .max(12, "Password must be maximum 12 symbols!")
    .matches(/(?=.*[A-Z])/, "At least one uppercase letter required!")
    .matches(/(?=.*[a-z])/, "At least one lowercase letter required!"),
  phone: yup
    .string()
    .required("Phone number is required!")
    .matches(/^\d+$/, "Phone number must contain only digits!")
    .min(10, "Phone number must be at least 10 digits!")
    .max(100, "Phone number must be maximum 100 digits!"),
});

function page() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const handleRegister = async (data) => {
    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result?.id) {
        reset();
        console.log("success!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className={styles.formContainer}>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <h1 className={styles.formHeader}>Register</h1>
        <div className={styles.formGroup}>
          <div className={styles.formInnerGroup}>
            <input {...register("firstName")} type="text" required />
            <label>First name</label>
          </div>
          {errors.firstName && (
            <p className={styles.errorMessage}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formInnerGroup}>
            <input {...register("lastName")} type="text" required />
            <label>Last name</label>
          </div>
          {errors.lastName && (
            <p className={styles.errorMessage}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formInnerGroup}>
            <input {...register("age")} type="number" required />
            <label>Age</label>
          </div>
          {errors.age && (
            <p className={styles.errorMessage}>{errors.age.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formInnerGroup}>
            <input {...register("email")} type="email" required />
            <label>Email</label>
          </div>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formInnerGroup}>
            <input
              {...register("password")}
              type={passwordVisible ? "text" : "password"}
              required
            />
            <label>Password</label>
            <button
              type="button"
              className={styles.passwordVisible}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "hide" : "show"}
            </button>
          </div>
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.formInnerGroup}>
            <input {...register("phone")} type="tel" required />
            <label>Phone</label>
          </div>
          {errors.phone && (
            <p className={styles.errorMessage}>{errors.phone.message}</p>
          )}
        </div>
        <button className={styles.logInBtn} type="submit">
          Create account
        </button>
      </form>
    </main>
  );
}

export default page;
