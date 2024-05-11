module.exports = class AnnouncementDto {
  id;
  user;
  theme;
  userName;
  post;
  department;
  communicationMethod;
  projectInfo;
  tags;

  constructor(model) {
    this.id = model._id;
    this.user = model.user;
    this.theme = model.theme;
    this.userName = model.userName;
    this.post = model.post;
    this.department = model.department;
    this.communicationMethod = model.communicationMethod;
    this.projectInfo = model.projectInfo;
    this.tags = model.tags;
  }
};
