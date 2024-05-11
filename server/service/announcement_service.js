const AnnouncementModel = require("../models/announcement_models");
const AnnouncementDto = require("../dtos/announcement_dto");
const ApiError = require("../exceptions/api-error");

class AnnouncementService {
  async createAnnouncement(
    user,
    theme,
    userName,
    post,
    department,
    communicationMethod,
    projectInfo,
    tags
  ) {
    const existingAnnouncement = await AnnouncementModel.findOne({
      user,
      theme,
    });
    if (existingAnnouncement) {
      throw ApiError.BadRequest("Вы уже создали объявление с такой темой");
    }

    const announcement = await AnnouncementModel.create({
      user,
      theme,
      userName,
      post,
      department,
      communicationMethod,
      projectInfo,
      tags,
    });
    const announcementDto = new AnnouncementDto(announcement);

    return {
      announcement: announcementDto,
    };
  }

  async getAnnouncementsByUser(userId) {
    const announcements = await AnnouncementModel.find({ user: userId });
    const announcementDtos = announcements.map(
      (announcement) => new AnnouncementDto(announcement)
    );
    return announcementDtos;
  }

  async deleteAnnouncement(userId, announcementId) {
    const announcement = await AnnouncementModel.findById(announcementId);
    if (!announcement) {
      throw ApiError.BadRequest("Объявление не найдено");
    }
    if (String(announcement.user) !== userId) {
      throw ApiError.BadRequest("Вы не можете удалить это объявление");
    }

    await AnnouncementModel.findByIdAndDelete(announcementId);

    return { message: "Объявление успешно удалено" };
  }

  async updateAnnouncement(userId, announcementId, updatedData) {
    const announcement = await AnnouncementModel.findById(announcementId);
    if (!announcement) {
      throw ApiError.BadRequest("Объявление не найдено");
    }
    if (String(announcement.user) !== userId) {
      throw ApiError.BadRequest("Вы не можете редактировать это объявление");
    }

    const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(
      announcementId,
      updatedData,
      { new: true }
    );

    return { announcement: updatedAnnouncement };
  }

  async getAllAnnouncementsByDepartment(department) {
    const existingAnnouncements = await AnnouncementModel.find({ department });
    if (!existingAnnouncements.length) {
      throw ApiError.BadRequest(
        `Нет объявлений для института: "${department}"`
      );
    }

    return existingAnnouncements;
  }

  async searchAnnouncements(searchQuery) {
    let announcements;
    if (Array.isArray(searchQuery)) {
      announcements = await AnnouncementModel.find({
        tags: { $in: searchQuery },
      });
    } else if (typeof searchQuery === "string") {
      announcements = await AnnouncementModel.find({
        $or: [
          { theme: { $regex: searchQuery, $options: "i" } },
          { userName: { $regex: searchQuery, $options: "i" } },
        ],
      });
    } else {
      throw ApiError.BadRequest("Неверный формат запроса поиска");
    }

    if (!announcements.length) {
      throw ApiError.BadRequest("Нет объявлений, соответствующих запросу");
    }

    return announcements;
  }
}

module.exports = new AnnouncementService();
