/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */

const BlocRepo = require("../repositories/BlocRepo");
const MediaRepo = require("../repositories/MediaRepo");
const UsersBlocsRepo = require("../repositories/UsersBlocsRepo");
const asyncWrapper = require("../helpers/asyncWrapper");
const { updateMediaViewsTimeine } = require("../helpers/views");

class BlocController {
    static async getAllBlocs(request, response) {
        return asyncWrapper(async(req, res) => {
            const blocs = await new BlocRepo().findAllBlocs();

            res.status(200).json({
                success: true,
                message: "All blocs",
                data: blocs,
            });
        })(request, response);
    }

    static async getBlocByBlocName(request, response) {
        return asyncWrapper(async(req, res) => {
            const { blocName } = req.query;

            const blocs = await new BlocRepo().findByName(blocName);

            if (blocs.length === 0)
                return res.status(404).json({
                    success: false,
                    message: `There is no bloc with name starting with ${blocName}`,
                });

            res.status(200).json({
                success: true,
                message: `All blocs with name starting with ${blocName}`,
                data: blocs,
            });
        })(request, response);
    }

    static async getBlocMedia(request, response) {
        return asyncWrapper(async(req, res) => {
            const { blocId } = req.params;
            const { page } = req.query;
            const {
                id
            } = req.user;

            const blocMedia = await new MediaRepo().findByBlocId(blocId, page);
            updateMediaViewsTimeine(blocMedia, id);
            res.status(200).json({
                success: true,
                message: "All bloc Media",
                data: blocMedia,
            });
        })(request, response);
    }

    static async createBloc(request, response) {
        return asyncWrapper(async(req, res) => {
            const { blocName, blocImage } = req.body;

            const createdBloc = await new BlocRepo().createBloc(blocName, blocImage);

            if (!createdBloc[1])
                return res.status(400).json({
                    success: false,
                    message: `There already exists a bloc with the name ${blocName.trim()}`,
                });

            const { id, blocName: createdBlocName, blocImage: createdBlocImage } = createdBloc[0];

            res.status(201).json({
                success: true,
                message: `Created bloc with name ${createdBlocName}`,
                data: { id, createdBlocName, createdBlocImage },
            });
        })(request, response);
    }

    static async updateBloc(request, response) {
        return asyncWrapper(async(req, res) => {
            const { blocName, blocImage } = req.body;
            const { blocId } = req.params;

            const updatedBloc = await new BlocRepo().findByIdAndUpdate(blocId, {
                blocName,
                blocImage,
            });

            if (updatedBloc[0] === 0)
                return res.status(400).json({
                    success: false,
                    message: `Bloc with the id ${blocId} does not exist`,
                });

            res.status(200).json({
                success: true,
                message: `Updated bloc with id ${blocId}`,
                data: updatedBloc[1][0],
            });
        })(request, response);
    }

    static async deleteBloc(request, response) {
        return asyncWrapper(async(req, res) => {
            const { blocId } = req.params;

            const deletedBlocs = await new BlocRepo().findByIdAndDelete(blocId);

            if (deletedBlocs === 0)
                return res.status(404).json({
                    success: false,
                    message: `There is no bloc with the id ${blocId}`,
                });

            res.status(204).send();
        })(request, response);
    }

    static async followBloc(request, response) {
        return asyncWrapper(async(req, res) => {
            const { blocIds } = req.body;
            const { id: userId } = req.user;

            const userBlocList = blocIds.map((blocId) => ({
                userId,
                blocId,
            }));

            const createdUserBlocs = await new UsersBlocsRepo().followBloc(userBlocList);

            if (!createdUserBlocs) return res.status(400).json({
                success: false,
                message: "Bloc Ids list contains invalid Ids",
            });


            res.status(201).json({
                success: true,
                message: `Blocs successfully followed`,
                data: createdUserBlocs,
            });
        })(request, response);
    }

    static async unfollowBloc(request, response) {
        return asyncWrapper(async(req, res) => {
            const { blocId } = req.params;
            const { id: userId } = req.user;

            const deletedBlocsCount = await new UsersBlocsRepo().unfollowBloc(
                userId,
                blocId
            );

            if (deletedBlocsCount === 0)
                return res.status(400).json({
                    success: false,
                    message: `User is not currently following bloc with id ${blocId}`,
                });

            res.status(204).send();
        })(request, response);
    }
}

module.exports = BlocController;