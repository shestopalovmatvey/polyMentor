import { FormEvent, useState } from "react";
import { Header } from "../../components/Header/Header";
import style from "./SignUpPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Select from "antd/es/select";
import { RolePick } from "../../types";
import $api from "../../http";
import { Button, Modal } from "antd";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

interface IUserData {
  role: string;
  userName: string;
  department: string;
  password: string;
  email: string;
  post?: string;
}

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [message, setMessage] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserData>({
    role: "Студент",
    userName: "",
    department: "",
    password: "",
    email: "",
    post: "",
  });

  const handleClickRole = () => {
    userInfo.role === RolePick.student
      ? setUserInfo({ ...userInfo, role: RolePick.teacher })
      : setUserInfo({ ...userInfo, role: RolePick.student });
  };

  const removeInputValue = () => {
    setUserInfo({
      role: "Студент",
      userName: "",
      department: "",
      password: "",
      email: "",
      post: "",
    });
    setModalActive(false);
    navigate("/login");
  };

  const signUpUser = async <User extends IUserData>(data: User) => {
    try {
      const response = await $api.post("/registration", data);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      setMessage("Вы успешно зарегистрировались!");
      setModalActive(true);
      setConfettiActive(true);
      setTimeout(() => {
        setConfettiActive(false);
      }, 5000);
    } catch (e) {
      setMessage(e.response.data.message);
      setModalActive(true);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpUser(userInfo);
  };

  return (
    <>
      <Header ishome={false} />
      <section className={style.section}>
        <form className={style.form} onSubmit={onSubmit} autoComplete="on">
          <div className={style.title__form}>
            <h3>Регистрация</h3>
          </div>
          <div className={style.userRolePick}>
            <label htmlFor="userRolePick">Регистрация как:</label>
            <button id="userRolePick" type="button" onClick={handleClickRole}>
              <p>{userInfo.role}</p>
            </button>
          </div>
          <div className={`${style.input__field} ${style.userName__field}`}>
            <p>ФИО:</p>
            <input
              type="text"
              placeholder="Введите ФИО"
              className={`${style.input} ${style.input__userName}`}
              onChange={(e) =>
                setUserInfo({ ...userInfo, userName: e.target.value.trim() })
              }
              autoComplete="username"
            />
          </div>
          <div className={`${style.input__field} ${style.userLastName__field}`}>
            <p>Ваш институт:</p>
            <Select
              defaultValue="Гуманитарный институт"
              className={style.select}
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
          {userInfo.role === RolePick.teacher && (
            <div
              className={`${style.input__field} ${style.userLastName__field}`}
            >
              <p>Ваша должность:</p>
              <Select
                defaultValue="Преподаватель"
                className={style.select}
                onChange={(value) => setUserInfo({ ...userInfo, post: value })}
                options={[
                  {
                    value: "Научный сотрудник",
                    label: "Научный сотрудник",
                  },
                  {
                    value: "Преподаватель",
                    label: "Преподаватель",
                  },
                  {
                    value: "Старший преподаватель",
                    label: "Старший преподаватель",
                  },
                  {
                    value: "Доцент",
                    label: "Доцент",
                  },
                  {
                    value: "Профессор",
                    label: "Профессор",
                  },
                ]}
              />
            </div>
          )}
          <div className={`${style.input__field} ${style.email__field}`}>
            <p>Email:</p>
            <input
              type="email"
              placeholder="Введите email"
              className={`${style.input} ${style.input__email}`}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value.trim() })
              }
              autoComplete="username"
              required
            />
          </div>
          <div className={`${style.input__field} ${style.input__field}`}>
            <p>Пароль:</p>
            <input
              type="password"
              placeholder="Введите пароль"
              className={`${style.input}`}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value.trim() })
              }
              autoComplete="current-password"
              required
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
      {confettiActive && (
        <Confetti
          numberOfPieces={300}
          gravity={0.06}
          width={width}
          height={height}
        />
      )}
      <Modal
        title="Процесс регистрации"
        centered
        open={modalActive}
        onOk={removeInputValue}
        onCancel={removeInputValue}
        width={500}
        footer={[
          <Button key="submit" type="primary" onClick={removeInputValue}>
            Понятно
          </Button>,
        ]}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
};
