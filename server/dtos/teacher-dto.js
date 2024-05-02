module.exports = class TeacherDto {
  userName;
  email;
  user_id;
  department;
  post;

  constructor(model) {
    this.email = model.email;
    this.user_id = model.user_id;
    this.userName = model.userName;
    this.department = model.department;
    this.post = model.post;
  }
};
