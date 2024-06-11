import React, { useEffect, useState } from "react";
import styles from "./FavoriteAnnouncementPage.module.scss";
import { Header } from "../../components/Header/Header";
import { ElementOfAnnouncement } from "../../components/ElementOfAnnouncement/ElementOfAnnouncement";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import $api from "../../http";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
export const FavoriteAnnouncementPage = () => {
  const { userInfo } = useSelector((store: RootState) => store.user);
  const [listOfAnnouncement, setListOfAnnouncements] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $api.post("/getAllFavoriteAnnouncements", {
          studentId: userInfo.id,
        });
        setListOfAnnouncements(response.data);
      } catch (e) {
        console.log("e", e);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Header ishome={false} />
      <section className={styles.container}>
        <h2 className={styles.title}>Избранные объявления</h2>
        <div className={styles.containerOfList}>
          <ul className={styles.listOfMyAnnouncements}>
            {listOfAnnouncement.length ? (
              listOfAnnouncement.map((elem, index) => (
                <ElementOfAnnouncement
                  key={elem.id}
                  data={elem}
                  isEditPage={false}
                  isFavorite={true}
                  isUniversPage={false}
                  setListOfAnnouncements={setListOfAnnouncements}
                />
              ))
            ) : (
              <Result
                status="404"
                title="Избранных объявлений нет"
                subTitle="Вам необходимо добавить объявления в избранное"
                extra={
                  <div className={styles.container_btn}>
                    <button
                      onClick={() => navigate("/universities")}
                      className={styles.btn_primery}
                    >
                      Добавить
                    </button>
                  </div>
                }
              />
            )}
          </ul>
        </div>
      </section>
    </>
  );
};
