import { FC } from "react";
import { Header } from "../../components/Header/Header";
import { MainInfo } from "../../components/MainInfo/MainInfo";

export const HomePage: FC = () => {
  return (
    <div>
      <Header ishome={true} />
      <MainInfo />
    </div>
  );
};
