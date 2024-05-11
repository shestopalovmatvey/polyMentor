const announcementService = require("../service/announcement_service");

class AnnouncementController {
  async create(req, res, next) {
    try {
      const {
        user,
        theme,
        userName,
        post,
        department,
        communicationMethod,
        projectInfo,
        tags,
      } = req.body;

      const announcement = await announcementService.createAnnouncement(
        user,
        theme,
        userName,
        post,
        department,
        communicationMethod,
        projectInfo,
        tags
      );
      return res.status(200).json(announcement);
    } catch (e) {
      next(e);
    }
  }

  async getAnnouncementsByUser(req, res, next) {
    try {
      const { userId } = req.query;

      const announcements = await announcementService.getAnnouncementsByUser(
        userId
      );
      return res.status(200).json(announcements);
    } catch (e) {
      next(e);
    }
  }

  async deleteAnnouncement(req, res, next) {
    try {
      const { userId, announcementId } = req.body;
      const result = await announcementService.deleteAnnouncement(
        userId,
        announcementId
      );
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async updateAnnouncement(req, res, next) {
    try {
      const { userId, announcementId, updatedData } = req.body;

      const result = await announcementService.updateAnnouncement(
        userId,
        announcementId,
        updatedData
      );
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAllByDepartment(req, res, next) {
    try {
      const { department } = req.query;
      const announcements =
        await announcementService.getAllAnnouncementsByDepartment(department);
      return res.status(200).json(announcements);
    } catch (e) {
      next(e);
    }
  }

  async searchAnnouncements(req, res, next) {
    try {
      const { tags, inputValue } = req.body;
      if (!tags && !inputValue) {
        throw ApiError.BadRequest("Неверный формат запроса");
      }
      let searchQuery;
      if (tags.length && Array.isArray(tags)) {
        searchQuery = tags;
      } else if (inputValue && typeof inputValue === "string") {
        searchQuery = inputValue;
      } else {
        throw ApiError.BadRequest("Неверный формат запроса");
      }

      const announcements = await announcementService.searchAnnouncements(
        searchQuery
      );
      return res.status(200).json(announcements);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AnnouncementController();
