import { FC } from "react";
import styles from "./MainInfo.module.scss";
import { useNavigate } from "react-router-dom";

export const MainInfo: FC = () => {
  const navigate = useNavigate();
  const handleClickLink = () => {
    navigate("login");
  };
  return (
    <main>
      <section className={styles.section__intro}>
        <div className={styles.container__intro}>
          <div className={styles.intro__title}>
            <h3>Платформа</h3>
            <p>
              для организации учебно-исследовательской деятельности студента в
              СПбПУ
            </p>
          </div>
          <button className={styles.button__moreInfo} onClick={handleClickLink}>
            <p>Перейти</p>
          </button>
        </div>

        <div className={styles.container}></div>
      </section>

      <section className={styles.section__mission}>
        <h2 className={styles.mission__title}>Миссия проекта</h2>

        <div className={styles.container}>
          <ul className={styles.mission__list}>
            <li className={styles.mission__element}>
              <p>
                Систематизировать
                <br /> научную деятельность в институте
              </p>
            </li>
            <li className={styles.mission__element}>
              <p>
                Сэкономить время, затрачиваемое на организацию научной
                деятельности
              </p>
            </li>
            <li className={styles.mission__element}>
              <p>
                Оптимизировать взаимодействие преподавателей и <br />
                студентов
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.section__instructions}></section>
    </main>
  );
};
