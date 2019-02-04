"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Core Library of Exception/Error Classes

/*
Internal Exception when permission to an object cannot be granted
Any HTTP Handler catching this error should set a 403 response code
*/
var PermissionException = function (_Error) {
  _inherits(PermissionException, _Error);

  function PermissionException() {
    _classCallCheck(this, PermissionException);

    return _possibleConstructorReturn(this, (PermissionException.__proto__ || Object.getPrototypeOf(PermissionException)).apply(this, arguments));
  }

  return PermissionException;
}(Error);

/*
Internal Exception when an authentication attempt fails
Any HTTP Handler catching this error should set a 401 response code
*/


var AuthenticationException = function (_Error2) {
  _inherits(AuthenticationException, _Error2);

  function AuthenticationException() {
    _classCallCheck(this, AuthenticationException);

    return _possibleConstructorReturn(this, (AuthenticationException.__proto__ || Object.getPrototypeOf(AuthenticationException)).apply(this, arguments));
  }

  return AuthenticationException;
}(Error);

/*
Internal exception when an object cannot be found
Any HTTP Handler catching this error should set a 404 response code
*/


var DoesNotExistException = function (_Error3) {
  _inherits(DoesNotExistException, _Error3);

  function DoesNotExistException() {
    _classCallCheck(this, DoesNotExistException);

    return _possibleConstructorReturn(this, (DoesNotExistException.__proto__ || Object.getPrototypeOf(DoesNotExistException)).apply(this, arguments));
  }

  return DoesNotExistException;
}(Error);

/*
Internal Exception when an obect could not be created or mutated due to a conflict, such
as when the object already existsself.
Any HTTP handler catching this error should set a 409 response code
*/


var ConflictException = function (_Error4) {
  _inherits(ConflictException, _Error4);

  function ConflictException() {
    _classCallCheck(this, ConflictException);

    return _possibleConstructorReturn(this, (ConflictException.__proto__ || Object.getPrototypeOf(ConflictException)).apply(this, arguments));
  }

  return ConflictException;
}(Error);

/*
Internal Exception thrown when a model property fails to be validated, etc.
*/


var ValidationError = function (_Error5) {
  _inherits(ValidationError, _Error5);

  function ValidationError() {
    _classCallCheck(this, ValidationError);

    return _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).apply(this, arguments));
  }

  return ValidationError;
}(Error);

module.exports = {
  PermissionException: PermissionException,
  AuthenticationException: AuthenticationException,
  DoesNotExistException: DoesNotExistException,
  ConflictException: ConflictException,
  ValidationError: ValidationError
};