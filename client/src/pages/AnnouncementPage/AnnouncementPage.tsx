import { useState } from "react";
import styles from "./AnnouncementPage.module.scss";
import { Header } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { MyAnnouncements } from "../../components/MyAnnouncements/MyAnnouncements";
import { CreateAnnouncement } from "../../components/CreateAnnouncement/CreateAnnouncement";
export const AnnouncementPage = () => {
  const [currentPage, setCurrentPage] = useState("myAnnouncements");

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <section>
      <Header ishome={false} />
      <section className={styles.container}>
        <nav className={styles.nav}>
          <button
            className={`${styles.link} ${
              currentPage === "myAnnouncements" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("myAnnouncements")}
          >
            Мои объявления
          </button>
          <button
            className={`${styles.link} ${
              currentPage === "createAnnouncement" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("createAnnouncement")}
          >
            Создать объявление
          </button>
        </nav>
        {currentPage === "myAnnouncements" && (
          <div className={styles.containerOfList}>
            <ul className={styles.listOfMyAnnouncements}>
              <MyAnnouncements />
            </ul>
          </div>
        )}
        {currentPage === "createAnnouncement" && <CreateAnnouncement />}
      </section>
    </section>
  );
};
