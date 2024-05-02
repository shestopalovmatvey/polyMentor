const { model, Schema } = require("mongoose");

const TeacherSchema = new Schema({
  user_id: { type: String, unique: true, required: true },
  userName: { type: String, required: true },
  department: { type: String, required: true },
  post: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model("Teacher", TeacherSchema);
