import React, { useState } from "react";
import style from "./CreateAnnouncement.module.scss";
import { Button, ConfigProvider, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import $api from "../../http";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { modalStyles, optionsTag } from "../../data/universData";

export const CreateAnnouncement = () => {
  const { userInfo } = useSelector((store: RootState) => store.user);
  const [announcementInfo, setAnnouncementInfo] = useState({
    theme: "",
    communicationMethod: "",
    projectInfo: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAnnouncementInfo({
      theme: "",
      communicationMethod: "",
      projectInfo: "",
      tags: [],
    });
  };
  console.log("announcementInfo", announcementInfo);
  const handleChange = (value: string[]) => {
    setAnnouncementInfo({ ...announcementInfo, tags: value });
  };

  const handleOk = async () => {
    try {
      const data = {
        ...announcementInfo,
        user: userInfo.id,
        userName: userInfo.userName,
        department: userInfo.department,
        post: userInfo.post,
      };
      setLoading(true);
      await $api.post("/createAnnouncement", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
      setLoading(false);
      setIsModalOpen(false);
      setAnnouncementInfo({
        theme: "",
        communicationMethod: "",
        projectInfo: "",
        tags: "",
      });
    } catch (error) {
      console.error("Error creating announcement:", error);
      setLoading(false);
    }
  };
  return (
    <div className={style.container}>
      <Button
        className={`${style.btn} ${style.custom_btn}`}
        type="primary"
        onClick={showModal}
      >
        Создать
      </Button>
      <ConfigProvider
        modal={{
          styles: modalStyles,
        }}
      >
        <Modal
          className={style.modal}
          keyboard
          centered
          title="Создание объявления"
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
              Создать
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
                  theme: e.target.value.trim(),
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
                  communicationMethod: e.target.value.trim(),
                })
              }
            />
            <TextArea
              placeholder="Введите информацию о проекте..."
              style={{ height: 200, resize: "none", fontSize: 15 }}
              value={announcementInfo.tags}
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
    </div>
  );
};
