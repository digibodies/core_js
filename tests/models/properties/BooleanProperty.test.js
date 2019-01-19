// Basic property tests

const {BooleanProperty} = require('../../../src/models/properties');
const {ValidationError} = require('../../../src/exceptions');

// Basic Behavior
test('expected type succeeds', () => {
  let prop = BooleanProperty();
  expect(prop.validate(true)).toBe(true);
  expect(prop.validate(false)).toBe(false);

  expect(prop.validate('true')).toBe(true);
  expect(prop.validate('True')).toBe(true);
  expect(prop.validate('false')).toBe(false);
  expect(prop.validate('False')).toBe(false);

  expect(prop.validate(null)).toBe(null);
});


test('validation throws error on unexpected type', () => {
  let prop = BooleanProperty();

  expect(() => {
    prop.validate(0);
  }).toThrow(ValidationError);

  expect(() => {
    prop.validate(1);
  }).toThrow(ValidationError);

  expect(() => {
    prop.validate('0');
  }).toThrow(ValidationError);

  expect(() => {
    prop.validate('1');
  }).toThrow(ValidationError);

  expect(() => {
    prop.validate('asdf'); // String
  }).toThrow(ValidationError);

  expect(() => {
    prop.validate(3.14); // Float
  }).toThrow(ValidationError);

  // Array of bools - repeated not true
  expect(() => {
    prop.validate([true, false]);
  }).toThrow(ValidationError);
});

// Repeated Properties
test('repeated properties have expected implicit default', () => {
  let prop = BooleanProperty({repeated:true});
  expect(prop.default()).toEqual([]);
});

test('repeated properties have expected explicit default', () => {
  let prop = BooleanProperty({repeated:true, default: [true, false]});
  expect(prop.default()).toEqual([true, false]);
});

test('repeated properties pass validation', () => {
  let prop = BooleanProperty({repeated:true});
  expect(prop.validate(['true', 'false'])).toEqual([true, false]);
});

test('repeated properties validates empty list', () => {
  let prop = BooleanProperty({repeated: true});
  expect(prop.validate([])).toEqual([]);
});
