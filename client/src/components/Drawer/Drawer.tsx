import { useEffect, useState } from "react";
import styles from "./Drawer.module.scss";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { Menu } from "../Menu/Menu";

export const Drawer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClickBtn = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      {!isMenuOpen ? (
        <RiMenuUnfoldLine
          className={styles.humburger__btn}
          onClick={handleClickBtn}
        />
      ) : (
        <div className={styles.container}>
          <Menu handle={handleClickBtn} />
        </div>
      )}
    </>
  );
};
