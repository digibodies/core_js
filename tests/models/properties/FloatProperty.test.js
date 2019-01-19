// Basic property tests

const Joi = require('joi');
const {FloatProperty} = require('../../../src/models/properties');
const {ValidationError} = require('../../../src/exceptions');

// Basic Behavior
test('expected type succeeds', () => {
  let prop = FloatProperty();
  expect(prop.validate(0.0)).toBe(0.0);
  expect(prop.validate(-1.0)).toBe(-1);
  expect(prop.validate(999)).toBe(999);

  expect(prop.validate('0.0')).toBe(0);
  expect(prop.validate('-1.0')).toBe(-1);
  expect(prop.validate('999')).toBe(999);

  expect(prop.validate(null)).toBe(null); // base string
});

test('validation throws error on unexpected type', () => {
  let prop = FloatProperty();

  expect(() => {
    prop.validate('asdf'); // String
  }).toThrow(ValidationError);

  // Array of ints - repeated not true
  expect(() => {
    prop.validate([612, 715]);
  }).toThrow(ValidationError);
});

test('validation throws error on unsafe values', () => {
  let prop = FloatProperty();

  expect(() => {
    prop.validate('4029384203948203948923'); // Too Large of int
  }).toThrow(ValidationError);
});

// Custom Validator
test('custom validator is consumed', () => {
  let validator = Joi.number().min(3);
  let prop = FloatProperty({validator: validator});

  expect(() => {
    prop.validate(-1);
  }).toThrow(ValidationError);
});

test('custom validator is validates default', () => {
  let validator = Joi.number().min(3);

  expect(() => {
    FloatProperty({validator: validator, default:-1});
  }).toThrow(ValidationError);
});

// Repeated Properties
test('repeated properties have expected implicit default', () => {
  let prop = FloatProperty({repeated:true});
  expect(prop.default()).toEqual([]);
});

test('repeated properties have expected explicit default', () => {
  let prop = FloatProperty({repeated:true, default: ['612', '715']});
  expect(prop.default()).toEqual([612, 715]);
});

test('repeated properties pass validation', () => {
  let prop = FloatProperty({repeated:true});
  expect(prop.validate(['612', '715'])).toEqual([612, 715]);
});

test('repeated properties pass custom validation', () => {
  let validator = Joi.number().min(3);
  let prop = FloatProperty({repeated:true, validator: validator});
  expect(prop.validate(['612', '715'])).toEqual([612, 715]);
});

test('repeated properties error on custom validation of default', () => {
  let validator = Joi.number().min(3);

  expect(() => {
    FloatProperty({repeated:true, validator: validator, default: [1, 2]});
  }).toThrow(ValidationError);
});

test('repeated properties error on custom validation', () => {
  let validator = Joi.number().min(3);
  let prop = FloatProperty({repeated:true, validator: validator, default: [612, 715]});;

  expect(() => {
    prop.validate([1, 2]);
  }).toThrow(ValidationError);
});

test('repeated properties validates empty list', () => {
  let prop = FloatProperty({repeated: true});
  expect(prop.validate([])).toEqual([]);
});
