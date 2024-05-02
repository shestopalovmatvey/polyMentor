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
              <input type="text" id="profileName" placeholder="Введите ФИО" />
            </div>
            <div className={styles.userName__field}>
              <label htmlFor="profileUniver">Институт:</label>
              <input type="text" placeholder="Введите ФИО" id="profileUniver" />
            </div>
            <div className={styles.userName__field}>
              <label htmlFor="profileRole">Ваша должность:</label>
              <input type="text" placeholder="Введите ФИО" id="profileUniver" />
            </div>
            <div className={styles.userName__field}>
              <label htmlFor="profileText">Напишите про исследования:</label>
              <textarea name="info" id="profileText"></textarea>
            </div>
          </div>
        </div>
        <div className={styles.buttonBlock}>
          <button className={styles.saveButton}>Сохранить</button>
        </div>
      </section>
    </>
  );
};
