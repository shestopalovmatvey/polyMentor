export interface IElementOfList {
  id: string;
  title: string;
  imgSrc: string;
}

export const optionsTag = [
  {
    label: "Искусственный интеллект и машинное обучение",
    value: "Искусственный интеллект и машинное обучение",
  },
  {
    label: "Информационная безопасность",
    value: "Информационная безопасность",
  },
  {
    label: "Разработка программного обеспечения",
    value: "Разработка программного обеспечения",
  },
  { label: "Большие данные (Big Data)", value: "Большие данные (Big Data)" },
  {
    label: "Разработка виртуальной и дополненной реальности",
    value: "Разработка виртуальной и дополненной реальности",
  },
  {
    label: "Робототехника",
    value: "Робототехника",
  },
];

export const modalStyles = {
  header: {
    fontSize: "16",
  },
  footer: {
    display: "flex",
    justifyContent: "end",
  },
};

export const listOfUnivers: IElementOfList[] = [
  {
    id: "hum.spbstu",
    title: "Гуманитарный институт",
    imgSrc: "images/logo/univer1.svg",
  },
  {
    id: "ice.spbstu",
    title: "Инженерно-строительный институт",
    imgSrc: "images/logo/univer2.svg",
  },
  {
    id: "ibmst.spbstu",
    title: "Институт биомедицинских систем и биотехнологий",
    imgSrc: "images/logo/univer3.svg",
  },
  {
    id: "dl.spbstu",
    title: "Институт компьютерных наук и кибербезопасности",
    imgSrc: "images/logo/univer4.svg",
  },
  {
    id: "immit.spbstu",
    title: "Институт машиностроения, материалов и транспорта",
    imgSrc: "images/logo/univer5.svg",
  },
  {
    id: "iamt.spbstu",
    title: "Институт передовых производственных технологий",
    imgSrc: "images/logo/univer6.svg",
  },
  {
    id: "ifkst.spbstu",
    title: "Институт физической культуры, спорта и туризма",
    imgSrc: "images/logo/univer7.svg",
  },
  {
    id: "et.spbstu",
    title: "Институт электроники и телекоммуникаций",
    imgSrc: "images/logo/univer8.svg",
  },
  {
    id: "ie.spbstu",
    title: "Институт энергетики",
    imgSrc: "images/logo/univer9.svg",
  },
  {
    id: "physmech.spbstu",
    title: "Физико-механический институт",
    imgSrc: "images/logo/univer10.svg",
  },
  {
    id: "imet.spbstu",
    title: "Институт промышленного менеджмента, экономики и торговли",
    imgSrc: "images/logo/univer11.svg",
  },
];
