const { model, Schema } = require("mongoose");

const StudentSchema = new Schema({
  user_id: { type: String, unique: true, required: true },
  department: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
});

module.exports = model("Student", StudentSchema);
