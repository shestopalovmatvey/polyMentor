import { useState } from "react";
import styles from "./Drawer.module.scss";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { Menu } from "../Menu/Menu";

export const Drawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className={styles.container}>
      {!isMenuOpen ? (
        <RiMenuUnfoldLine className={styles.humburger__btn} />
      ) : (
        <>
          <RiMenuFoldLine className={styles.humburger__btn} />
          <Menu />
        </>
      )}
    </div>
  );
};
