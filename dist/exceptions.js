"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Core Library of Exception/Error Classes
// Transpiling hack: see: https://medium.com/@xpl/javascript-deriving-from-error-properly-8d2f8f315801

/*
Internal Exception when permission to an object cannot be granted
Any HTTP Handler catching this error should set a 403 response code
*/
var PermissionException = function (_Error) {
  _inherits(PermissionException, _Error);

  function PermissionException(message) {
    _classCallCheck(this, PermissionException);

    var _this = _possibleConstructorReturn(this, (PermissionException.__proto__ || Object.getPrototypeOf(PermissionException)).call(this, message));

    _this.constructor = PermissionException;
    _this.__proto__ = PermissionException.prototype;
    _this.message = message;
    return _this;
  }

  return PermissionException;
}(Error);

/*
Internal Exception when an authentication attempt fails
Any HTTP Handler catching this error should set a 401 response code
*/


var AuthenticationException = function (_Error2) {
  _inherits(AuthenticationException, _Error2);

  function AuthenticationException(message) {
    _classCallCheck(this, AuthenticationException);

    var _this2 = _possibleConstructorReturn(this, (AuthenticationException.__proto__ || Object.getPrototypeOf(AuthenticationException)).call(this, message));

    _this2.constructor = AuthenticationException;
    _this2.__proto__ = AuthenticationException.prototype;
    _this2.message = message;
    return _this2;
  }

  return AuthenticationException;
}(Error);

/*
Internal exception when an object cannot be found
Any HTTP Handler catching this error should set a 404 response code
*/


var DoesNotExistException = function (_Error3) {
  _inherits(DoesNotExistException, _Error3);

  function DoesNotExistException(message) {
    _classCallCheck(this, DoesNotExistException);

    var _this3 = _possibleConstructorReturn(this, (DoesNotExistException.__proto__ || Object.getPrototypeOf(DoesNotExistException)).call(this, message));

    _this3.constructor = DoesNotExistException;
    _this3.__proto__ = DoesNotExistException.prototype;
    _this3.message = message;
    return _this3;
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

  function ConflictException(message) {
    _classCallCheck(this, ConflictException);

    var _this4 = _possibleConstructorReturn(this, (ConflictException.__proto__ || Object.getPrototypeOf(ConflictException)).call(this, message));

    _this4.constructor = ConflictException;
    _this4.__proto__ = ConflictException.prototype;
    _this4.message = message;
    return _this4;
  }

  return ConflictException;
}(Error);

/*
Internal Exception thrown when a model property fails to be validated, etc.
*/


var ValidationError = function (_Error5) {
  _inherits(ValidationError, _Error5);

  function ValidationError(message) {
    _classCallCheck(this, ValidationError);

    var _this5 = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, message));

    _this5.constructor = ValidationError;
    _this5.__proto__ = ValidationError.prototype;
    _this5.message = message;
    return _this5;
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