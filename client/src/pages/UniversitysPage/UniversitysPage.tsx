import { Header } from "../../components/Header/Header";
import { ListOfUniversities } from "../../components/ListOfUniversities/ListOfUniversities";
import styles from "./UniversitysPage.module.scss";

export const UniversitysPage = () => {
  return (
    <>
      <Header ishome={false} />
      <ListOfUniversities />
    </>
  );
};
