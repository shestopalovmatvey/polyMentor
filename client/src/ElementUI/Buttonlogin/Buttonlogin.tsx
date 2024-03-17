import styles from "./Buttonlogin.module.scss";
import { useNavigate } from "react-router-dom";

export const Buttonlogin = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <button className={styles.button__login} onClick={handleClick}>
      <p>Войти</p>
    </button>
  );
};
