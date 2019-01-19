// Basic property tests

const Joi = require('joi');
const {StringProperty} = require('../../../src/models/properties');

// Basic Behavior
test('expected type succeeds', () => {
  let prop = StringProperty();
  expect(prop.validate('test')).toBe('test'); // base string
  expect(prop.validate('el ñino')).toBe('el ñino'); // unicode
  expect(prop.validate('Thing\'s are good <>>')).toBe('Thing\'s are good <>>'); // unicode
  expect(prop.validate(null)).toBe(null); // base string
});

test('validation throws error on unexpected type', () => {
  let prop = StringProperty();

  expect(() => {
    prop.validate(612); // Number
  }).toThrow(TypeError);

  // Array of Strings - repeated not true
  expect(() => {
    prop.validate(['612', '715']);
  }).toThrow(TypeError);
});

// Custom Validator
test('custom validator is consumed', () => {
  let validator = Joi.string().min(3);
  let prop = StringProperty({validator: validator});

  expect(() => {
    prop.validate('6');
  }).toThrow(TypeError);
});

test('custom validator is validates default', () => {
  let validator = Joi.string().min(3);

  expect(() => {
    StringProperty({validator: validator, default:'6'});
  }).toThrow(TypeError);
});

// Repeated Properties
test('repeated properties have expected implicit default', () => {
  let prop = StringProperty({repeated:true});
  expect(prop.default()).toEqual([]);
});

test('repeated properties have expected explicit default', () => {
  let prop = StringProperty({repeated:true, default: ['612', '715']});
  expect(prop.default()).toEqual(['612', '715']);
});

test('repeated properties pass default validation', () => {
  let prop = StringProperty({repeated:true, default: ['a', 'b']});
  expect(prop.validate(['612', '715'])).toEqual(['612', '715']);
});

test('repeated properties pass custom validation', () => {
  let validator = Joi.string().min(3);
  let prop = StringProperty({repeated:true, validator: validator});
  expect(prop.validate(['612', '715'])).toEqual(['612', '715']);
});

test('repeated properties error on custom validation of default', () => {
  let validator = Joi.string().min(3);

  expect(() => {
    StringProperty({repeated:true, validator: validator, default: ['a', 'b']});
  }).toThrow(TypeError);
});

test('repeated properties error on custom validation', () => {
  let validator = Joi.string().min(3);
  let prop = StringProperty({repeated:true, validator: validator, default: ['612', '715']});;

  expect(() => {
    prop.validate(['a', 'b']);
  }).toThrow(TypeError);
});

test('repeated properties empty list validates', () => {
  let prop = StringProperty({repeated: true});
  expect(prop.validate([])).toEqual([]);
});
