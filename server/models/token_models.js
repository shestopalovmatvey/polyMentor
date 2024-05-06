const { Schema, model } = require("mongoose");

const StudentSchema = require("./student_models");
const TeacherSchema = require("./teacher_models");

const UserSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  refreshToken: { type: String, required: true },
});

module.exports = model("Token", TokenSchema);
