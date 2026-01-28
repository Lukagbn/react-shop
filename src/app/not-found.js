import Link from "next/link";
import styles from "./not-found.module.css";

function NotFound() {
  return (
    <h2 className={styles.notFoundMessage}>
      Page not found!{" "}
      <Link className={styles.btnLink} href={"/products"}>
        Return to products
      </Link>
    </h2>
  );
}
export default NotFound;
