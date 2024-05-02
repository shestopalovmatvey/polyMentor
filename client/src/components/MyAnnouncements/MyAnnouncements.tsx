import React from "react";
import styles from "./MyAnnouncements.module.scss";
import { ElementOfAnnouncement } from "../ElementOfAnnouncement/ElementOfAnnouncement";

export const MyAnnouncements = () => {
  return (
    <div>
      <ul>
        <ElementOfAnnouncement />
      </ul>
    </div>
  );
};
