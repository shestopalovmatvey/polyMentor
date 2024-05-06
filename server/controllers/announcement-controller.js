const announcementService = require("../service/announcement_service");

class AnnouncementController {
    async create(req, res, next) {
        try {
            const { theme, userName, post, communicationMethod, projectInfo, tags } = req.body;

            const announcement = await announcementService.createAnnouncement(
                theme,
                userName,
                post,
                communicationMethod,
                projectInfo,
                tags
            );
            console.log(announcement)
            return res.status(200).json(announcement);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AnnouncementController();
