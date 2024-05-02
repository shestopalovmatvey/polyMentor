import React from "react";
import style from "./ListOfAnnouncements.module.scss";
import { Header } from "../../components/Header/Header";
import { Checkbox, GetProp } from "antd";
import { ElementOfAnnouncement } from "../../components/ElementOfAnnouncement/ElementOfAnnouncement";

export const optionsTag = [
  {
    label: "Искусственный интеллект и машинное обучение",
    value: "Искусственный интеллект и машинное обучение",
  },
  {
    label: "Информационная безопасность",
    value: "Информационная безопасность",
  },
  {
    label: "Разработка программного обеспечения",
    value: "Разработка программного обеспечения",
  },
  { label: "Большие данные (Big Data)", value: "Большие данные (Big Data)" },
  {
    label: "Разработка виртуальной и дополненной реальности",
    value: "Разработка виртуальной и дополненной реальности",
  },
  {
    label: "Робототехника",
    value: "Робототехника",
  },
];

const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
  checkedValues
) => {
  console.log("checked = ", checkedValues);
};

export const ListOfAnnouncements = () => {
  return (
    <section className={style.ListOfAnnouncements}>
      <Header ishome={false} />
      <div className={style.container}>
        <div className={style.searchContainer}>
          <form className={style.searchMain}>
            <label className={style.searchLabel} htmlFor="searchInput">
              Поиск наставника:
            </label>
            <input
              id="searchInput"
              className={style.searchInput}
              placeholder="Введите тематику или ФИО наставника"
            />
          </form>
          <button type="submit" className={style.submit__btn}>
            Поиск
          </button>
        </div>
        <div className={style.section}>
          <div className={style.checkboxContainer}>
            <h3 className={style.checkboxGroupTitle}>Выберите тематику</h3>
            <Checkbox.Group
              options={optionsTag}
              defaultValue={["Разработка программного обеспечения"]}
              onChange={onChange}
              className={style.checkboxGroup}
            />
          </div>
          <div className={style.announcements}>
            <ul>
              <ElementOfAnnouncement />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
