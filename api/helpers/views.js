/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const MediaRepo = require("../repositories/MediaRepo");

const updateMediaViewsTimeine = (info, userId) => {
    info.forEach(async(element) => {
        try {
            await new MediaRepo().updateMediaViews(element.id, userId);
        } catch (err) {
            // console.log(err.message);
            throw new Error(err.message);
        }
    });
};

module.exports = {
    updateMediaViewsTimeine,
}