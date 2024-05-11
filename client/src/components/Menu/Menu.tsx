import {
  RiFileList2Line,
  RiLogoutCircleRLine,
  RiMenuFoldLine,
} from "react-icons/ri";
import styles from "./Menu.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAnnouncement } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { logoutUser } from "../../store/user/user.slice";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import $api from "../../http";

interface IPropsMenu {
  handle: () => void;
}

export const Menu: FC<IPropsMenu> = ({ handle }) => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const handleClickLogoutBtn = async () => {
    try {
      await $api.post(
        "/logout",
        {
          role: localStorage.getItem("role"),
        },
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      dispatch(logoutUser());
    } catch (e) {
      console.log(e);
    }
  };
  const showConfirm = () => {
    confirm({
      title: "Выход из аккаунта",
      icon: <ExclamationCircleFilled />,
      content: "Вы уверены что хотите выйти из аккаунта?",
      centered: true,
      onOk() {
        handleClickLogoutBtn();
      },
      onCancel() {},
    });
  };
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
          <li>
            <button onClick={showConfirm} className={styles.link}>
              <RiLogoutCircleRLine className={styles.logo} />
              <p>Выйти</p>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
