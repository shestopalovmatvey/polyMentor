import { FC, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { Header } from "../../components/Header/Header";
import { ImgUpload } from "../../components/ImgUpload/ImgUpload";

export const ProfilePage: FC = () => {
  return (
    <>
      <Header ishome={false} />
      <section className={styles.section}>
        <div className={styles.mainInfo}>
          <ImgUpload />
          <div className={styles.container}>
            <div className={styles.userName__field}>
              <label htmlFor="profileName">ФИО:</label>
              <p id="profileName">Шестопалов Матвей Юрьевич</p>
            </div>
            <div className={styles.userName__field}>
              <label htmlFor="profileUniver">Институт:</label>
              <p id="profileUniver">
                Институт компьютерных наук и кибербезопасности
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
