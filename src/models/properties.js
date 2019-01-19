// Model Properties
const Joi = require('joi');

class Property {
  constructor(kwargs) {
    this._validator = kwargs['validator'];
    this._name = null;
    this._repeated = kwargs['repeated'] || false;

    // Establish default candidate
    let d = kwargs['default'] || null;
    if (this._repeated) { d = d || []; }

    // Validate default
    this._default = this.validate(d);
  }

  default() {
    return this._default;
  }

  validate(val) {
    let validator = this._validator;
    if (this._repeated) {
      validator = Joi.array().items(validator);
    }

    // TODO: Figure out how to deal with required...
    if (val == null) { return val; }

    let {error, value } = Joi.validate(val, validator);

    if (error) {
      throw new TypeError(error); // TODO: shape this better...
    }

    return value;
  }
}

const BooleanProperty = (kwargs={}) => {
  kwargs['validator'] = kwargs['validator'] || Joi.boolean();
  return new Property(kwargs);
};

const DateTimeProperty = (kwargs={}) => {
  kwargs['validator'] = kwargs['validator'] || Joi.date();
  return new Property(kwargs);
};

const FloatProperty = (kwargs={}) => {
  kwargs['validator'] = kwargs['validator'] || Joi.number();
  return new Property(kwargs);
};

const IntegerProperty = (kwargs={}) => {
  kwargs['validator'] = kwargs['validator'] || Joi.number().integer();
  return new Property(kwargs);
};

const StringProperty = (kwargs={}) => {
  kwargs['validator'] = kwargs['validator'] || Joi.string();
  return new Property(kwargs);
};

module.exports = {
  Property: Property,
  BooleanProperty: BooleanProperty,
  DateTimeProperty: DateTimeProperty,
  FloatProperty: FloatProperty,
  IntegerProperty: IntegerProperty,
  StringProperty: StringProperty,
};
