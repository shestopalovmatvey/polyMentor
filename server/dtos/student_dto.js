module.exports = class StudentDto {
  userName;
  email;
  user_id;
  department;
  id;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.user_id = model.user_id;
    this.userName = model.userName;
    this.department = model.department;
  }
};
