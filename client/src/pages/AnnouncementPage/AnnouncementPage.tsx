import { useEffect, useState } from "react";
import styles from "./AnnouncementPage.module.scss";
import { Header } from "../../components/Header/Header";
import { CreateAnnouncement } from "../../components/CreateAnnouncement/CreateAnnouncement";
import $api from "../../http";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Result } from "antd";
import { ElementOfAnnouncement } from "../../components/ElementOfAnnouncement/ElementOfAnnouncement";

export const AnnouncementPage = () => {
  const { userInfo } = useSelector((store: RootState) => store.user);
  const [listOfAnnouncement, setListOfAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState("myAnnouncements");

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.get("/getAnnouncementsByUser", {
          params: {
            userId: userInfo.id,
          },
        });
        setListOfAnnouncements(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    if (currentPage === "myAnnouncements") {
      fetchData();
    }
  }, [currentPage, userInfo.id]);
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
            {listOfAnnouncement.length ? (
              <ul className={styles.listOfMyAnnouncements}>
                {listOfAnnouncement.map((elem, index) => (
                  <ElementOfAnnouncement
                    key={elem.id}
                    data={elem}
                    isEditPage={true}
                    setListOfAnnouncements={setListOfAnnouncements}
                  />
                ))}
              </ul>
            ) : (
              <Result
                status="404"
                title="У вас нет обявлений, хотите создать?"
                extra={
                  <div className={styles.container_btn}>
                    <button
                      onClick={() => handleButtonClick("createAnnouncement")}
                      className={styles.btn_primery}
                    >
                      Создать
                    </button>
                  </div>
                }
              />
            )}
          </div>
        )}
        {currentPage === "createAnnouncement" && <CreateAnnouncement />}
      </section>
    </section>
  );
};
