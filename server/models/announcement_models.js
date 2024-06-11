const { model, Schema } = require("mongoose");

const AnnouncementSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  theme: { type: String, required: true },
  userName: { type: String, required: true },
  post: { type: String, required: true },
  department: { type: String, required: true },
  communicationMethod: { type: String, required: true },
  projectInfo: { type: String, required: true },
  tags: { type: [String], required: true },
});
AnnouncementSchema.index({ department: 1 });
module.exports = model("Announcement", AnnouncementSchema);
