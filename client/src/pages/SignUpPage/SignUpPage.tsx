import { useState } from "react";
import { Header } from "../../components/Header/Header";
import style from "./SignUpPage.module.scss";
import { Link } from "react-router-dom";

enum RolePick {
  student = "Студент",
  teacher = "Преподаватель",
}

export const SignUpPage = () => {
  const [role, setRole] = useState("Студент");

  const handleClickRole = () => {
    role === RolePick.student
      ? setRole(RolePick.teacher)
      : setRole(RolePick.student);
  };

  return (
    <>
      <Header ishome={false} />
      <section className={style.section}>
        <form className={style.form}>
          <div className={style.title__form}>
            <h3>Регистрация</h3>
          </div>
          <div className={style.userRolePick}>
            <label htmlFor="userRolePick">Регистрация как:</label>
            <button id="userRolePick" type="button" onClick={handleClickRole}>
              <p>{role}</p>
            </button>
          </div>
          <div className={`${style.input__field} ${style.userName__field}`}>
            <p>ФИО:</p>
            <input
              type="text"
              placeholder="Введите ФИО"
              className={`${style.input} ${style.input__userName}`}
            />
          </div>
          <div className={`${style.input__field} ${style.userLastName__field}`}>
            <p>Ваша должность:</p>
            <input
              type="text"
              placeholder="Введите должность"
              className={`${style.input} ${style.input__userLastName}`}
            />
          </div>
          <div className={`${style.input__field} ${style.email__field}`}>
            <p>Email:</p>
            <input
              type="email"
              placeholder="Введите email"
              className={`${style.input} ${style.input__email}`}
            />
          </div>
          <div className={`${style.input__field} ${style.input__field}`}>
            <p>Пароль:</p>
            <input
              type="password"
              placeholder="Введите пароль"
              className={`${style.input}`}
            />
          </div>
          <button type="submit" className={style.submit__btn}>
            <p>Зарегистрироваться</p>
          </button>

          <p className={style.no__acc}>
            У вас уже есть учетная запись? <Link to={"/login"}>Войти</Link>
          </p>
        </form>
      </section>
    </>
  );
};
