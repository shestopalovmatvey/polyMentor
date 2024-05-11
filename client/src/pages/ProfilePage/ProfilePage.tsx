import { FC, useState } from "react";
import styles from "./ProfilePage.module.scss";
import { Header } from "../../components/Header/Header";
import { ImgUpload } from "../../components/ImgUpload/ImgUpload";
import { Select } from "antd";

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
              <label htmlFor="selectDepartment">Ваш институт:</label>
              <Select
                id="selectDepartment"
                defaultValue="Гуманитарный институт"
                className={styles.select}
                onChange={(value) =>
                  setUserInfo({ ...userInfo, department: value })
                }
                options={[
                  {
                    value: "Физико-механический институт",
                    label: "Физико-механический институт",
                  },
                  {
                    value: "Гуманитарный институт",
                    label: "Гуманитарный институт",
                  },
                  {
                    value: "Инженерно-строительный институт",
                    label: "Инженерно-строительный институт",
                  },
                  {
                    value: "Институт биомедицинских систем и биотехнологий",
                    label: "Институт биомедицинских систем и биотехнологий",
                  },
                  {
                    value: "Институт компьютерных наук и кибербезопасности",
                    label: "Институт компьютерных наук и кибербезопасности",
                  },
                  {
                    value: "Институт машиностроения, материалов и транспорта",
                    label: "Институт машиностроения, материалов и транспорта",
                  },
                  {
                    value: "Институт передовых производственных технологий",
                    label: "Институт передовых производственных технологий",
                  },
                  {
                    value: "Институт физической культуры, спорта и туризма",
                    label: "Институт физической культуры, спорта и туризма",
                  },
                  {
                    value: "Институт электроники и телекоммуникаций",
                    label: "Институт электроники и телекоммуникаций",
                  },
                  {
                    value: "Институт энергетики",
                    label: "Институт энергетики",
                  },
                  {
                    value:
                      "Институт промышленного менеджмента, экономики и торговли",
                    label:
                      "Институт промышленного менеджмента, экономики и торговли",
                  },
                ]}
              />
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
