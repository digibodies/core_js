// Core Library of Exception/Error Classes
// Transpiling hack: see: https://medium.com/@xpl/javascript-deriving-from-error-properly-8d2f8f315801

/*
Internal Exception when permission to an object cannot be granted
Any HTTP Handler catching this error should set a 403 response code
*/
class PermissionException extends Error {
  constructor (message) {
    super (message);
    this.constructor = PermissionException;
    this.__proto__ = PermissionException.prototype;
    this.message = message;
  }
}

/*
Internal Exception when an authentication attempt fails
Any HTTP Handler catching this error should set a 401 response code
*/
class AuthenticationException extends Error {
  constructor (message) {
    super (message);
    this.constructor = AuthenticationException;
    this.__proto__ = AuthenticationException.prototype;
    this.message = message;
  }
}

/*
Internal exception when an object cannot be found
Any HTTP Handler catching this error should set a 404 response code
*/
class DoesNotExistException extends Error {
  constructor (message) {
    super (message);
    this.constructor = DoesNotExistException;
    this.__proto__ = DoesNotExistException.prototype;
    this.message = message;
  }
}

/*
Internal Exception when an obect could not be created or mutated due to a conflict, such
as when the object already existsself.
Any HTTP handler catching this error should set a 409 response code
*/
class ConflictException extends Error {
  constructor (message) {
    super (message);
    this.constructor = ConflictException;
    this.__proto__ = ConflictException.prototype;
    this.message = message;
  }
}

/*
Internal Exception thrown when a model property fails to be validated, etc.
*/
class ValidationError extends Error {
  constructor (message) {
    super (message);
    this.constructor = ValidationError;
    this.__proto__ = ValidationError.prototype;
    this.message = message;
  }
}

module.exports = {
  PermissionException,
  AuthenticationException,
  DoesNotExistException,
  ConflictException,
  ValidationError
};
