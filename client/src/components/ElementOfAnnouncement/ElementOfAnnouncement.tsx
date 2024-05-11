import React, { useState } from "react";
import style from "./ElementOfAnnouncement.module.scss";
import {
  Avatar,
  Button,
  ConfigProvider,
  Input,
  Modal,
  Select,
  Tag,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import $api from "../../http";
import TextArea from "antd/es/input/TextArea";
import { modalStyles, optionsTag } from "../../data/universData";

export const ElementOfAnnouncement = ({
  data,
  isEditPage,
  setListOfAnnouncements,
}) => {
  const [announcementInfo, setAnnouncementInfo] = useState({
    theme: "",
    communicationMethod: "",
    projectInfo: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setAnnouncementInfo({ ...announcementInfo, tags: value });
  };
  const handleOk = async () => {
    try {
      setLoading(true);
      await $api.post(
        "/updateAnnouncement",
        {
          userId: data.user,
          announcementId: data.id,
          updatedData: announcementInfo,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );
      const response = await $api.get("/getAnnouncementsByUser", {
        params: {
          userId: data.user,
        },
      });
      setListOfAnnouncements(response.data);
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const deleteAnnouncement = async () => {
    try {
      await $api.post(
        "/deleteAnnouncement",
        {
          userId: data.user,
          announcementId: data.id,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );
      const response = await $api.get("/getAnnouncementsByUser", {
        params: {
          userId: data.user,
        },
      });
      setListOfAnnouncements(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  return (
    <li className={style.listElementContainer}>
      <div className={style.announcementsmainInfo}>
        <div>
          <h4 className={style.announcementTitle}>{data.theme}</h4>
          <ul className={style.listOfTags}>
            {data.tags.map((elem, index) => (
              <Tag key={index} color="rgb(52 112 61)" className={style.tags}>
                {elem}
              </Tag>
            ))}
          </ul>
          <div className={style.projectInfo}>
            <p>{data.projectInfo}</p>
          </div>
          <div className={style.teacherInfo}>
            <h5 className={style.teacherInfoTitle}>
              Преподавательский состав:
            </h5>
            <div className={style.teacherAvatar}>
              <Avatar size={50} icon={<UserOutlined />} />
              <div className={style.teacherText}>
                <p className={style.teacherName}>{data.userName}</p>
                <p>{data.post}</p>
              </div>
              <div className={style.teacherMail}>
                <p className={style.teacherMailTitle}>Контакты</p>
                <p>{data.communicationMethod}</p>
              </div>
            </div>
          </div>
          {isEditPage && (
            <div className={style.button_list}>
              <button
                onClick={showModal}
                className={classNames(style.button, style.edit)}
              >
                Редактировать
              </button>
              <button
                onClick={deleteAnnouncement}
                className={classNames(style.button, style.delete)}
              >
                Удалить
              </button>
            </div>
          )}
        </div>
      </div>
      <ConfigProvider
        modal={{
          styles: modalStyles,
        }}
      >
        <Modal
          className={style.modal}
          keyboard
          centered
          title="Редактировать объявление"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              className={`${style.btn} ${style.custom_btn} ${style.modal_btn}`}
            >
              Редактировать
            </Button>,
          ]}
        >
          <form className={style.form}>
            <Input
              style={{ fontSize: 15 }}
              placeholder="Введите тему..."
              onChange={(e) =>
                setAnnouncementInfo({
                  ...announcementInfo,
                  theme: e.target.value.trim(),
                })
              }
            />
            <Input
              style={{ fontSize: 15 }}
              placeholder="Введите способ связи..."
              onChange={(e) =>
                setAnnouncementInfo({
                  ...announcementInfo,
                  communicationMethod: e.target.value.trim(),
                })
              }
            />
            <TextArea
              placeholder="Введите информацию о проекте..."
              style={{ height: 200, resize: "none", fontSize: 15 }}
              onChange={(e) =>
                setAnnouncementInfo({
                  ...announcementInfo,
                  projectInfo: e.target.value.trim(),
                })
              }
            />
            <Select
              mode="multiple"
              size={"middle"}
              placeholder="Тег темы"
              defaultValue={[]}
              onChange={handleChange}
              style={{ width: "100%" }}
              options={optionsTag}
            />
          </form>
        </Modal>
      </ConfigProvider>
    </li>
  );
};
