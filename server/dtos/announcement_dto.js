module.exports = class AnnouncementDto {
    theme;
    userName;
    post;
    communicationMethod;
    projectInfo;
    tags;
  
    constructor(model) {
      this.theme = model.theme;
      this.userName = model.userName;
      this.post = model.post;
      this.communicationMethod = model.communicationMethod;
      this.projectInfo = model.projectInfo;
      this.tags = model.tags
    }
  };
  