module.exports = class StudentDto {
  userName;
  email;
  user_id;
  department;

  constructor(model) {
    this.email = model.email;
    this.user_id = model.user_id;
    this.userName = model.userName;
    this.department = model.department;
  }
};
