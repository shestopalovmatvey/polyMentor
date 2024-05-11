import { listOfUnivers } from "../data/universData";

export const convertName = (fullName: string) => {
  const nameParts = fullName.trim().split(" ");
  let result = "";
  for (let i = 0; i < nameParts.length; i++) {
    if (i === 0) {
      result += nameParts[i] + " ";
    } else {
      result += nameParts[i][0] + ". ";
    }
  }
  return result;
};

export const findDepartment = (universitiesId: string | undefined) => {
  let res = "";
  Object.values(listOfUnivers).forEach((elem) => {
    if (elem.id === universitiesId) {
      res = elem.title;
    }
  });

  return res;
};
