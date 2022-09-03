/* eslint-disable linebreak-style */
/* eslint-disable import/newline-after-import */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const BlocsValidations = require("../middlewares/validations/blocsValidation");
const UsersBlocsValidations = require("../middlewares/validations/usersBlocsValidation");
const BlocController = require("../controllers/BlocController")

const {
    authenticate,
    authorizeAdmin
} = Authorization;

const {
    validateBlocFieldsOnCreate,
    validateBlocFieldsOnUpdate,
    validateBlocId,
    validateBlocName
} = BlocsValidations;
const {
    validateUsersBlocsFieldsOnCreate
} = UsersBlocsValidations;

const {
    getAllBlocs,
    getBlocByBlocName,
    getBlocMedia,
    createBloc,
    updateBloc,
    deleteBloc,
    followBloc,
    unfollowBloc
} = BlocController;

router.use(authenticate);

router.get('/blocName', validateBlocName, getBlocByBlocName);
router.post('/follow', validateUsersBlocsFieldsOnCreate, followBloc);
router.delete('/unfollow/:blocId?', validateBlocId, unfollowBloc);
router.get('/:blocId/media', validateBlocId, getBlocMedia);
router
    .route('/:blocId')
    .all(validateBlocId, authorizeAdmin)
    .patch(validateBlocFieldsOnUpdate, updateBloc)
    .delete(deleteBloc);
router
  .route("/")
  .get(getAllBlocs)
  .post(authorizeAdmin, validateBlocFieldsOnCreate, createBloc);

module.exports = router;
