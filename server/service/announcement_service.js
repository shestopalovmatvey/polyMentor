const AnnouncementModel = require("../models/announcement_models");
const AnnouncementDto = require("../dtos/announcement_dto");

class AnnouncementService {
    async createAnnouncement(theme, userName, post, communicationMethod, projectInfo, tags) {
            // const candidate = await StudentModel.findOne({ theme });
            // if (candidate) {
            //     throw ApiError.BadRequest("Вы уже создали объявление с такой темой!");
            // }

            const announcement = await AnnouncementModel.create({
                theme,
                userName,
                post,
                communicationMethod,
                projectInfo,
                tags
            })

            const announcementDto = new AnnouncementDto(announcement)

            return {
                announcement: announcementDto
            }
            
    }
}

module.exports = new AnnouncementService();
