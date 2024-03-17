import { FC } from "react";
import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
export const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link to={""} className={styles.menu__item}>
        <p>О нас</p>
      </Link>
      <Link to={""} className={styles.menu__item}>
        <p>Как это работает</p>
      </Link>
    </nav>
  );
};
