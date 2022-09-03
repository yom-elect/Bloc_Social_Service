/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/**
 * Defines all Major Errors that can be thrown by the request to the application
 *
 */

class ApplicationError extends Error {
  constructor(error, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.error = error;
  }
}

const BadRequestError = class extends ApplicationError {
  constructor(message) {
    super(message || "Resource requested doesnt exist", 400);
  }
};

const NotFoundError = class extends ApplicationError {
  constructor(message) {
    super(message || "No Record found matching that criteria", 404);
  }
};

const UserExists = class extends ApplicationError {
  constructor(message) {
    super(message || "User with that email already exist", 409);
  }
};

const UserDoesNotExist = class extends ApplicationError {
  constructor(message) {
    super(message || "User with that email does not exist", 409);
  }
};

const AuthorizationError = class extends ApplicationError {
  constructor(message) {
    super(message || "You are not authorized to perform that action", 403);
  }
};

const LOVError = class extends ApplicationError {
  constructor(error) {
    super(error.message || "LOV is compulsory", 409);
    this.parameter = error.LOVtype;
  }
};

const TokenNotProvidedError = class extends ApplicationError {
  constructor(message) {
    super(message || "Auth token missing", 401);
  }
};

const ExpiredToken = class extends ApplicationError {
  constructor(message) {
    super(message || "User Token expired Login", 403);
  }
};

const HTTPError = class extends ApplicationError {
  constructor(message, status) {
    super(message || "Unknown Error Occured", status || 500);
  }
};

const SchemaError = class extends Error {
  constructor(error) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.type = "schema";
    this.error = error;
  }
};

const MethodNotAllowedError = class extends ApplicationError {
  constructor(message) {
    super(message || "Request Method Not allowed for this resource", 405);
  }
};

module.exports = {
  MethodNotAllowedError,
  SchemaError,
  HTTPError,
  ExpiredToken,
  TokenNotProvidedError,
  LOVError,
  AuthorizationError,
  BadRequestError,
  NotFoundError,
  UserExists,
  UserDoesNotExist,
};
