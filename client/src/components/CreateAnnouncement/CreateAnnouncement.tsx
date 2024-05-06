import React, { useState } from "react";
import style from "./CreateAnnouncement.module.scss";
import { Button, ConfigProvider, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { optionsTag } from "../../pages/ListOfAnnouncements/ListOfAnnouncements";

const modalStyles = {
  header: {
    fontSize: "20",
  },
  footer: {
    display: "flex",
    justifyContent: "end",
  },
};

export const CreateAnnouncement = () => {
  const [announcementInfo, setAnnouncementInfo] = useState({
    theme: '',
    communicationMethod: '',
    projectInfo: '',
    tags: ''
  })
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setAnnouncementInfo({...announcementInfo, tags: value})
  }

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 3000);
  };
  console.log(announcementInfo)
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
            <Input style={{ fontSize: 15 }} placeholder="Введите тему..." />
            <Input
              style={{ fontSize: 15 }}
              placeholder="Введите способ связи..."
            />
            <TextArea
              placeholder="Введите информацию о проекте..."
              style={{ height: 200, resize: "none", fontSize: 15 }}
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
