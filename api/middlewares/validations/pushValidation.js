const {body, param, query, validationResult} = require("express-validator");
const validationError = require('./validationError');

class PushValidations {
    static async validatePushTokenId (req, res, next)  {

        await param('pushTokenId')
          .exists()
          .trim()
          .withMessage('Provide Mandatory Token Id')
          .run(req);
  
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) return validationError(res, errors.array());
  
        next();
      }

}

module.exports = PushValidations;