import { RiFileList2Line, RiMenuFoldLine } from "react-icons/ri";
import styles from "./Menu.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAnnouncement } from "react-icons/md";

interface IPropsMenu {
  handle: () => void;
}

export const Menu: FC<IPropsMenu> = ({ handle }) => {
  return (
    <aside className={styles.menu}>
      <div className={styles.container}>
        <h2>Меню Навигации</h2>
        <RiMenuFoldLine className={styles.humburger__btn} onClick={handle} />
      </div>
      <div className={styles.list__container}>
        <ul>
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
      </div>
    </aside>
  );
};
