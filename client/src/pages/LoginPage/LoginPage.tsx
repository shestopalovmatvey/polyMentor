import { FormEvent } from "react";
import { Link } from "react-router-dom";
import style from "./LoginPage.module.scss";
import { Header } from "../../components/Header/Header";

export const LoginPage = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={style.container}>
      <Header ishome={false} />
      <section className={style.section} onSubmit={handleSubmit}>
        <form className={style.form}>
          <div className={style.title__form}>
            <h3>Авторизация</h3>
          </div>
          <div className={`${style.input__field} ${style.email__field}`}>
            <p>Email:</p>
            <input
              type="email"
              placeholder="Ваш email"
              autoComplete="email"
              className={`${style.input} ${style.input__email}`}
            />
          </div>
          <div className={`${style.input__field} ${style.input__field}`}>
            <p>Пароль:</p>
            <input
              type="password"
              placeholder="Ваш пароль"
              autoComplete="password"
              className={`${style.input}`}
            />
          </div>
          <button type="submit" className={style.submit__btn}>
            <p>Войти</p>
          </button>

          <p className={style.no__acc}>
            У вас нет учетной записи?
            <br />
            <Link to={"/signUp"}>Зарегистрироваться</Link>
          </p>
        </form>
      </section>
    </div>
  );
};
