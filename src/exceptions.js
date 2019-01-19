// Core Libary of Exception/Error Classes

/*
Internal Exception when permission to an object cannot be granted
Any HTTP Handler catching this error should set a 403 response code
*/
class PermissionException extends Error {}

/*
Internal Exception when an authentication attempt fails
Any HTTP Handler catching this error should set a 401 response code
*/
class AuthenticationException extends Error {}

/*
Internal exception when an object cannot be found
Any HTTP Handler catching this error should set a 404 response code
*/
class DoesNotExistException extends Error {}

/*
Internal Exception when an obect could not be created or mutated due to a conflict, such
as when the object already existsself.
Any HTTP handler catching this error should set a 409 response code
*/
class ConflictException extends Error {}

/*
Internal Exception thrown when a model property fails to be validated, etc.
*/
class ValidationError extends Error {}

module.exports = {
  PermissionException,
  AuthenticationException,
  DoesNotExistException,
  ConflictException,
  ValidationError
};
