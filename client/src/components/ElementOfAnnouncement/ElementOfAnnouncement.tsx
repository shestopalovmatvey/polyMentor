import React from "react";
import style from "./ElementOfAnnouncement.module.scss";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
export const ElementOfAnnouncement = () => {
  return (
    <li className={style.listElementContainer}>
      <div className={style.announcementsmainInfo}>
        <Avatar shape="square" size={300} icon={<UserOutlined />} />
        <div>
          <h4>Учебно-исследовательские проекты в области ИИ</h4>
          <p className={style.message}>Преподаватель:</p>
          <p className={style.teacher}>Богач Наталья Владимировна</p>
          <p className={style.post}>Занимаемые должности:</p>
          <p>
            Доцент - Высшая школа компьютерных технологий и информационных
            систем
          </p>
          <p className={style.message}>Предпочтительный способ связи:</p>
          <p>Моя почта example@mail.ru</p>
          <div className={style.projectInfo}>
            <h5>Информация о проекте:</h5>
            <p>
              Мы собираемся начать учебно-исследовательские проекты в области
              [указать область, например, информационных технологий, медицины,
              инженерии и т. д.], и мы ищем талантливых и мотивированных
              студентов, которые хотели бы принять участие в этом увлекательном
              исследовательском путешествии.
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};
