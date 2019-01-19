'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Model Properties
var Joi = require('joi');

var Property = function () {
  function Property(kwargs) {
    _classCallCheck(this, Property);

    this._validator = kwargs['validator'];
    this._name = null;
    this._repeated = kwargs['repeated'] || false;

    // Establish default candidate
    var d = kwargs['default'] || null;
    if (this._repeated) {
      d = d || [];
    }

    // Validate default
    this._default = this.validate(d);
  }

  _createClass(Property, [{
    key: 'default',
    value: function _default() {
      return this._default;
    }
  }, {
    key: 'validate',
    value: function validate(val) {
      var validator = this._validator;
      if (this._repeated) {
        validator = Joi.array().items(validator);
      }

      // TODO: Figure out how to deal with required...
      if (val == null) {
        return val;
      }

      var _Joi$validate = Joi.validate(val, validator),
          error = _Joi$validate.error,
          value = _Joi$validate.value;

      if (error) {
        throw new TypeError(error); // TODO: shape this better...
      }

      return value;
    }
  }]);

  return Property;
}();

var BooleanProperty = function BooleanProperty() {
  var kwargs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  kwargs['validator'] = kwargs['validator'] || Joi.boolean();
  return new Property(kwargs);
};

var DateTimeProperty = function DateTimeProperty() {
  var kwargs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // use of strict below prevents ints and date strings
  kwargs['validator'] = kwargs['validator'] || Joi.date().strict(true);
  return new Property(kwargs);
};

var FloatProperty = function FloatProperty() {
  var kwargs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  kwargs['validator'] = kwargs['validator'] || Joi.number();
  return new Property(kwargs);
};

var IntegerProperty = function IntegerProperty() {
  var kwargs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  kwargs['validator'] = kwargs['validator'] || Joi.number().integer();
  return new Property(kwargs);
};

var StringProperty = function StringProperty() {
  var kwargs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  kwargs['validator'] = kwargs['validator'] || Joi.string();
  return new Property(kwargs);
};

module.exports = {
  Property: Property,
  BooleanProperty: BooleanProperty,
  DateTimeProperty: DateTimeProperty,
  FloatProperty: FloatProperty,
  IntegerProperty: IntegerProperty,
  StringProperty: StringProperty
};