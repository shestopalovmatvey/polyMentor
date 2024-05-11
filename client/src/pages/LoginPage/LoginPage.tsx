import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./LoginPage.module.scss";
import { Header } from "../../components/Header/Header";
import { RolePick } from "../../types";
import $api from "../../http";
import { setUser } from "../../store/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { RootState } from "../../store";

interface userData {
  role: string;
  password: string;
  email: string;
}

export const LoginPage = () => {
  const { isAuth } = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [userInfo, setUserInfo] = useState<userData>({
    role: "Студент",
    password: "",
    email: "",
  });

  const handleClickRole = () => {
    userInfo.role === RolePick.student
      ? setUserInfo({ ...userInfo, role: RolePick.teacher })
      : setUserInfo({ ...userInfo, role: RolePick.student });
  };

  const login = async (data: userData) => {
    try {
      const response = await $api.post("/login", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      dispatch(setUser(response.data.user));
      setMessage("Вы успешно авторизовались!");
      setModalActive(true);
    } catch (e) {
      console.log(e);
      setMessage(e.response.data.message);
      setModalActive(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userInfo);
  };

  const onClickOk = () => {
    if (isAuth) {
      setUserInfo({
        role: "Студент",
        password: "",
        email: "",
      });
      setModalActive(false);
      navigate("/profile");
    } else {
      setUserInfo({ ...userInfo, password: "" });
      setModalActive(false);
    }
  };

  return (
    <>
      <Header ishome={false} />
      <section className={style.section}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.title__form}>
            <h3>Авторизация</h3>
          </div>
          <div className={style.userRolePick}>
            <label htmlFor="userRolePick">Авторизироваться как:</label>
            <button id="userRolePick" type="button" onClick={handleClickRole}>
              <p>{userInfo.role}</p>
            </button>
          </div>
          <div className={`${style.input__field} ${style.email__field}`}>
            <p>Email:</p>
            <input
              type="email"
              placeholder="Ваш email"
              autoComplete="email"
              className={`${style.input} ${style.input__email}`}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value.trim() })
              }
            />
          </div>
          <div className={`${style.input__field} ${style.input__field}`}>
            <p>Пароль:</p>
            <input
              type="password"
              placeholder="Ваш пароль"
              autoComplete="password"
              className={`${style.input}`}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value.trim() })
              }
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
      <Modal
        title="Процесс авторизации"
        centered
        open={modalActive}
        onOk={onClickOk}
        onCancel={() => setModalActive(false)}
        width={700}
        footer={[
          <Button key="submit" type="primary" onClick={onClickOk}>
            Понятно
          </Button>,
        ]}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
};
