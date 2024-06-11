import { FC, useState } from "react";
import styles from "./Header.module.scss";
import { Navbar } from "../Navbar/Navbar";
import { Buttonlogin } from "../../ElementUI/Buttonlogin/Buttonlogin";
import { Link } from "react-router-dom";
import { Drawer } from "../Drawer/Drawer";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAnnouncement } from "react-icons/md";
import { RiFileList2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { IHeaderProps } from "../../types";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import $api from "../../http";
import { logoutUser } from "../../store/user/user.slice";

export const Header: FC<IHeaderProps> = ({ ishome }) => {
  const { confirm } = Modal;
  const { isAuth } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const role = localStorage.getItem("role");
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

      {isAuth && ishome && <Drawer />}
      {!isAuth && ishome && <Buttonlogin />}
      {isAuth && !ishome && (
        <>
          <ul className={styles.list}>
            <li>
              <Link to={"/universities"} className={styles.link}>
                <RiFileList2Line className={styles.logo} />
                <p>Список институтов</p>
              </Link>
            </li>
            <li>
              {role === "Студент" ? (
                <Link to={"/favoriteAnnouncement"} className={styles.link}>
                  <MdOutlineAnnouncement className={styles.logo} />
                  <p>Избранные объявления</p>
                </Link>
              ) : (
                <Link to={"/announcements"} className={styles.link}>
                  <MdOutlineAnnouncement className={styles.logo} />
                  <p>Мои объявления</p>
                </Link>
              )}
            </li>
            <li>
              <Link to={"/profile"} className={styles.link}>
                <CgProfile className={styles.logo} />
                <p>Профиль</p>
              </Link>
            </li>
            <li>
              <button onClick={showConfirm}>
                <RiLogoutCircleRLine />
                <p>Выйти</p>
              </button>
            </li>
          </ul>
        </>
      )}
    </header>
  );
};
