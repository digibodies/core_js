// Basic property tests

const Joi = require('joi');
const {DateTimeProperty} = require('../../../src/models/properties');

// Basic Behavior
test('expected type succeeds', () => {
  let prop = DateTimeProperty();
  expect(prop.validate(new Date('1982-09-02'))).toEqual(new Date('1982-09-02T00:00:00.000Z'));
  expect(prop.validate(new Date('1982-09-02T00:00:00.000Z'))).toEqual(new Date('1982-09-02T00:00:00.000Z'));
  expect(prop.validate(new Date('1982-09-02T16:30:00.000Z'))).toEqual(new Date('1982-09-02T16:30:00.000Z'));
  expect(prop.validate(new Date('1982-09-02T16:30Z'))).toEqual(new Date('1982-09-02T16:30:00.000Z'));
  expect(prop.validate(null)).toBe(null); // base string
});



test('validation throws error on unexpected type', () => {
  let prop = DateTimeProperty();

  expect(() => {
    prop.validate('1982-09-02'); // Date string
  }).toThrow(TypeError);

  expect(() => {
    prop.validate(6567); // Number of milliseconds
  }).toThrow(TypeError);

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
  let validator = Joi.date().min('now'); // future
  let prop = DateTimeProperty({validator: validator});

  // When Blaine turns 100 years old...
  expect(prop.validate(new Date('2082-09-02'))).toEqual(new Date('2082-09-02T00:00:00.000Z'));

  expect(() => {
    prop.validate(new Date('1882-09-02'));
  }).toThrow(TypeError);
});


test('custom validator is validates default', () => {
  let validator = Joi.date().min('now'); // future

  expect(() => {
    DateTimeProperty({validator: validator, default: new Date('1982-09-02')});
  }).toThrow(TypeError);
});


// Repeated Properties
test('repeated properties have expected implicit default', () => {
  let prop = DateTimeProperty({repeated:true});
  expect(prop.default()).toEqual([]);
});


test('repeated properties have expected explicit default', () => {
  let d1 = new Date('1982-09-02');
  let d2 = new Date('1983-01-29');
  let prop = DateTimeProperty({repeated:true, default: [d1, d2]});
  expect(prop.default()).toEqual([d1, d2]);
});


test('repeated properties pass validation', () => {
  let d1 = new Date('1982-09-02');
  let d2 = new Date('1983-01-29');
  let prop = DateTimeProperty({repeated:true});
  expect(prop.validate([d1, d2])).toEqual([d1, d2]);
});


test('repeated properties pass custom validation', () => {
  let d1 = new Date('1982-09-02');
  let d2 = new Date('1983-01-29');
  let validator = Joi.date().max('now'); // past

  let prop = DateTimeProperty({repeated:true, validator: validator});
  expect(prop.validate([d1, d2])).toEqual([d1, d2]);
});

test('repeated properties error on custom validation', () => {
  let d1 = new Date('1982-09-02');
  let d2 = new Date('1983-01-29');
  let validator = Joi.date().min('now'); // future

  let prop = DateTimeProperty({repeated:true, validator: validator});

  expect(() => {
    prop.validate([d1, d2]);
  }).toThrow(TypeError);
});

test('repeated properties error on custom validation of default', () => {
  let d1 = new Date('1982-09-02');
  let d2 = new Date('1983-01-29');
  let validator = Joi.date().min('now'); // future

  expect(() => {
    DateTimeProperty({repeated:true, validator: validator, default: [d1, d2]});
  }).toThrow(TypeError);
});

test('repeated properties empty list validates', () => {
  let prop = DateTimeProperty({repeated: true});
  expect(prop.validate([])).toEqual([]);
});
