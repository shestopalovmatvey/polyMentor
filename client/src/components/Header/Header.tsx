import { FC, useState } from "react";
import styles from "./Header.module.scss";
import { Navbar } from "../Navbar/Navbar";
import { Buttonlogin } from "../../ElementUI/Buttonlogin/Buttonlogin";
import { Link } from "react-router-dom";
import { Drawer } from "../Drawer/Drawer";
import { Menu } from "../Menu/Menu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAnnouncement } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";

interface IProps {
  ishome: boolean;
}

export const Header: FC<IProps> = ({ ishome }) => {
  const [isLogin, setIsLogin] = useState(true);

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
        {ishome && <Navbar />}
      </div>

      {isLogin && ishome && <Drawer />}
      {!isLogin && ishome && <Buttonlogin />}
      {isLogin && !ishome && (
        <>
          <ul className={styles.list}>
            <li>
              <Link to={"/profile"} className={styles.link}>
                <CgProfile className={styles.logo} />
                <p>Профиль</p>
              </Link>
            </li>
            <li>
              <Link to={"/announcements"} className={styles.link}>
                <MdOutlineAnnouncement className={styles.logo} />
                <p>Мои объявления</p>
              </Link>
            </li>
            <li>
              <Link to={"/universities"} className={styles.link}>
                <RiFileList2Line className={styles.logo} />
                <p>Список институтов</p>
              </Link>
            </li>
          </ul>
        </>
      )}
    </header>
  );
};
