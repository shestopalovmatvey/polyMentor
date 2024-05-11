import style from "./ListOfAnnouncements.module.scss";
import { Header } from "../../components/Header/Header";
import { Checkbox, GetProp } from "antd";
import { ElementOfAnnouncement } from "../../components/ElementOfAnnouncement/ElementOfAnnouncement";
import { optionsTag } from "../../data/universData";
import { FormEvent, useEffect, useState } from "react";
import $api from "../../http";
import { useParams } from "react-router-dom";
import { findDepartment } from "../../helpers";

export const ListOfAnnouncements = () => {
  const { universitiesId } = useParams();
  const [listOfAnnouncement, setListOfAnnouncements] = useState([]);
  const department = findDepartment(universitiesId);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await $api.get("/getAllByDepartment", {
          params: {
            department: department,
          },
        });
        setListOfAnnouncements(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchAnnouncements();
  }, [department]);

  const [searchInfo, setSearchInfo] = useState({
    inputInfo: "",
    tags: [],
  });

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setSearchInfo({ ...searchInfo, tags: checkedValues });
  };

  const searchAnnouncements = async () => {
    try {
      const response = await $api.post("/searchAnnouncements", {
        inputValue: searchInfo.inputInfo,
        tags: searchInfo.tags,
      });
      setListOfAnnouncements(response.data);
    } catch (e) {
      console.log("e", e);
    }
  };

  const resetFilters = async () => {
    setSearchInfo({ inputInfo: "", tags: [] });
    const response = await $api.get("/getAllByDepartment", {
      params: {
        department: department,
      },
    });
    setListOfAnnouncements(response.data);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchAnnouncements();
  };
  return (
    <section className={style.ListOfAnnouncements}>
      <Header ishome={false} />
      <div className={style.container}>
        <div className={style.searchContainer}>
          <form className={style.searchMain} onSubmit={onSubmit}>
            <div className={style.inputContainer}>
              <label className={style.searchLabel} htmlFor="searchInput">
                Поиск наставника:
              </label>
              <input
                id="searchInput"
                className={style.searchInput}
                placeholder="Введите тематику или ФИО наставника"
                value={searchInfo.inputInfo}
                onChange={(e) =>
                  setSearchInfo({
                    ...searchInfo,
                    inputInfo: e.target.value.trim(),
                  })
                }
              />
            </div>
            <button type="submit" className={style.submit__btn}>
              Поиск
            </button>
          </form>
        </div>
        <div className={style.section}>
          <div className={style.checkboxContainer}>
            <div>
              <h3 className={style.checkboxGroupTitle}>Выберите тематику</h3>
              <Checkbox.Group
                options={optionsTag}
                onChange={onChange}
                className={style.checkboxGroup}
              />
            </div>
            <button
              onClick={resetFilters}
              type="button"
              className={style.reset__btn}
            >
              Сбросить фильтры
            </button>
          </div>
          <div className={style.announcements}>
            <ul className={style.listOfAnnouncements}>
              {listOfAnnouncement.map((elem) => (
                <ElementOfAnnouncement
                  data={elem}
                  isEditPage={false}
                  setListOfAnnouncements={null}
                  key={elem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
