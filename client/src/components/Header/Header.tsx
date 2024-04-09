import { FC, useState } from "react";
import styles from "./Header.module.scss";
import { Navbar } from "../Navbar/Navbar";
import { Buttonlogin } from "../../ElementUI/Buttonlogin/Buttonlogin";
import { Link } from "react-router-dom";
import { Drawer } from "../Drawer/Drawer";
import { Menu } from "../Menu/Menu";

interface IProps {
  ishome: boolean;
}

export const Header: FC<IProps> = ({ ishome }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__nav}>
        <Link to={"/"}>
          <img
            className={styles.logo}
            src="../../../public/images/logo/main-logo.svg"
            alt="logo"
            width={310}
            height={60}
          />
        </Link>
        {!!ishome && <Navbar />}
      </div>

      {isLogin ? <Buttonlogin /> : <Drawer />}
    </header>
  );
};
