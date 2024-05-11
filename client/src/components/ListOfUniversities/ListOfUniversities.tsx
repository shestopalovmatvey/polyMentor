import { useEffect, useState } from "react";
import Spin from "antd/es/spin";
import { LoadingOutlined } from "@ant-design/icons/lib/icons";
import styles from "./ListOfUniversities.module.scss";
import { IElementOfList, listOfUnivers } from "../../data/universData";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ListOfUniversities = () => {
  const [university, setUniversity] = useState<IElementOfList[]>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const getUniversity = async () => {
      const data = await axios
        .get("http://localhost:5000/api/universities")
        .then((res) => res.data);

      if (data) {
        setLoading(false);
        setUniversity(listOfUnivers);
      }
    };

    getUniversity();
  }, []);

  const onClickUniversity = (id: string) => {
    navigate(`/universities/${id}`);
  };

  return (
    <section className={styles.section__university}>
      <h2 className={styles.section__title}>Выберите институт:</h2>
      <div className={styles.container}>
        {loading ? (
          <Spin
            size="large"
            indicator={
              <LoadingOutlined
                style={{ fontSize: 50, color: "#105d3b" }}
                spin
              />
            }
            className={styles.spin}
          />
        ) : (
          <>
            <ul className={styles.university__list}>
              {university?.map((elem) => (
                <li
                  key={elem.id}
                  className={styles.university__element}
                  onClick={() => onClickUniversity(elem.id)}
                >
                  <img src={elem.imgSrc} alt="" />
                  <p>{elem.title}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};
