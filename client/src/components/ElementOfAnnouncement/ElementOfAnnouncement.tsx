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
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const ElementOfAnnouncement = ({
  data,
  isEditPage,
  setListOfAnnouncements,
  isFavorite,
  isUniversPage,
}) => {
  const { userInfo } = useSelector((store: RootState) => store.user);
  const role = localStorage.getItem("role");
  const [announcementInfo, setAnnouncementInfo] = useState({
    theme: "",
    communicationMethod: "",
    projectInfo: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
  const [messageAnnouncement, setMessageAnnouncement] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAnnouncementInfo({
      theme: "",
      communicationMethod: "",
      projectInfo: "",
      tags: "",
    });
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
      setAnnouncementInfo({
        theme: "",
        communicationMethod: "",
        projectInfo: "",
        tags: "",
      });
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

  const onAddToFavorites = async () => {
    try {
      const response = await $api.post(
        "/addToFavorites",
        {
          studentId: userInfo.id,
          announcementId: data._id,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      );
      setMessageAnnouncement(response.data.message);
      setIsModalOpenInfo(true);
    } catch (error) {
      setMessageAnnouncement(error);
      setIsModalOpenInfo(true);
    }
  };

  const onRemoveFromFavorites = async () => {
    try {
      await $api.post("/removeFromFavorites", {
        studentId: userInfo.id,
        announcementId: data._id,
      });
      const response = await $api.post("/getAllFavoriteAnnouncements", {
        studentId: userInfo.id,
      });
      setListOfAnnouncements(response.data);
    } catch (e) {
      console.log("e", e);
    }
  };
  return (
    <li className={style.listElementContainer}>
      <div className={style.announcementsmainInfo}>
        {isUniversPage && role === "Студент" && (
          <button className={style.addFavBtn} onClick={onAddToFavorites}>
            Добавить в избранное
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="7.5"
                fill="white"
                stroke="#F2F2F2"
              />
              <path
                d="M20.6653 15.1312H17.2021V11.6682C17.2021 10.3328 15.1311 10.3328 15.1311 11.6682V15.1312H11.668C10.3329 15.1312 10.3329 17.2022 11.668 17.2022H15.1311V20.6652C15.1311 22.0005 17.2021 22.0005 17.2021 20.6652V17.2022H20.6653C22.0005 17.2022 22.0005 15.1312 20.6653 15.1312Z"
                fill="#D3D3D3"
              />
            </svg>
          </button>
        )}
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
          {isFavorite && (
            <div className={style.button_list}>
              <button
                onClick={onRemoveFromFavorites}
                className={classNames(style.button, style.delete)}
              >
                Удалить
              </button>
            </div>
          )}
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
          title="Статус добавления"
          centered
          open={isModalOpenInfo}
          onOk={() => setIsModalOpenInfo(false)}
          onCancel={() => setIsModalOpenInfo(false)}
          width={500}
          className={style.parag}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => setIsModalOpenInfo(false)}
              className={`${style.btn} ${style.custom_btn} ${style.modal_btn}`}
            >
              Понятно
            </Button>,
          ]}
        >
          <p>{messageAnnouncement}</p>
        </Modal>
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
              value={announcementInfo.theme}
              onChange={(e) =>
                setAnnouncementInfo({
                  ...announcementInfo,
                  theme: e.target.value,
                })
              }
            />
            <Input
              style={{ fontSize: 15 }}
              placeholder="Введите способ связи..."
              value={announcementInfo.communicationMethod}
              onChange={(e) =>
                setAnnouncementInfo({
                  ...announcementInfo,
                  communicationMethod: e.target.value,
                })
              }
            />
            <TextArea
              placeholder="Введите информацию о проекте..."
              value={announcementInfo.projectInfo}
              style={{ height: 200, resize: "none", fontSize: 15 }}
              onChange={(e) =>
                setAnnouncementInfo({
                  ...announcementInfo,
                  projectInfo: e.target.value,
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
