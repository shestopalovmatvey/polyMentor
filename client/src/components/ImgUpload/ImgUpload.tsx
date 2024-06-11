import { FC, useState } from "react";
import styles from "./ImgUpload.module.scss";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Image } from "antd";

export const ImgUpload: FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.avatarBlock}>
      <div className={styles.container}>
        <div className={styles.container}>
          <Avatar shape="square" size={180} icon={<UserOutlined />} />
          <div className={styles.inputUpload}>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        {/* {profileImage ? (
          <div>
            <Image width={200} src={profileImage} />
          </div>
        ) : (
          <div className={styles.imageUpload}>
            <Avatar shape="square" size={180} icon={<UserOutlined />} />
            
          </div>
        )} */}
      </div>
    </div>
  );
};
