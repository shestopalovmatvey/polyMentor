const { model, Schema } = require("mongoose");

const StudentSchema = new Schema({
  user_id: { type: String, unique: true, required: true },
  department: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  favoriteAnnouncements: [{ type: Schema.Types.ObjectId, ref: "Announcement" }],
});

module.exports = model("Student", StudentSchema);
