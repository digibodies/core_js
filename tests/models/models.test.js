const models = require('../../src/models');
const Joi = require('joi');
const {ValidationError} = require('../../src/exceptions');

// Demo models
let JunkDrawer = models.model('JunkDrawer', {
  name: models.StringProperty({default:'unknown'}),
  givenName: models.StringProperty(),
  familyName: models.StringProperty(),
  birthday: models.DateTimeProperty({validator: Joi.date().max('now')}),
  last_active: models.DateTimeProperty(),
  score: models.IntegerProperty(),
  fav_foods: models.StringProperty({repeated:true}),
  is_active: models.BooleanProperty(),
});

test('different instances have different values', () => {
  const m1 = JunkDrawer();
  const m2 = JunkDrawer();
  const m3 = JunkDrawer();

  m1.fav_foods = ['kale', 'seabass'];
  m2.fav_foods = ['pizza', 'burgers'];

  m3.givenName = 'Rick';
  m3.familyName = 'Sanchez';

  // TODO: This should fail since it doesn't exist
  m1.total_members = 400;


  expect(m1.kind).toEqual('JunkDrawer');
  expect(m2.kind).toEqual('JunkDrawer');
  expect(m3.kind).toEqual('JunkDrawer');

  expect(m1.fav_foods).toEqual(['kale', 'seabass']);
  expect(m2.fav_foods).toEqual(['pizza', 'burgers']);
  expect(m3.fav_foods).toEqual([]); // Default empty
  expect(m3.givenName).toEqual('Rick');
  expect(m1.givenName).toEqual(null);
});

test('passing props via constructor ', () => {
  const m1 = JunkDrawer({
    id: 'm1',
    fav_foods: ['pizza', 'burgers']
  });
  const m2 = JunkDrawer();
  m2.id = 'm1',
  m2.fav_foods = ['pizza', 'burgers'];

  expect(m1).toEqual(m2);
});

test('default values apply on creation', () => {
  const m1 = JunkDrawer({id: 'm1'});

  expect(m1.name).toEqual('unknown'); // explicit
  expect(m1.fav_foods).toEqual([]); // implicit for type

  // Update values
  m1.givenName = 'Rick';
  m1.fav_foods = ['vodka'];

  expect(m1.givenName).toEqual('Rick'); // implicit for type
  expect(m1.fav_foods).toEqual(['vodka']); // implicit for type
});

test('validation errors are thrown', () => {
  const m1 = JunkDrawer({id: 'm1'});
  expect(() => {
    m1.birthday = new Date('2082-09-02'); // future
  }).toThrow(ValidationError);

  expect(() => {
    m1.is_active = 'yep'; // not bool
  }).toThrow(ValidationError);
});

test('unknwon constructor arguments error', () => {
  expect(() => {
    JunkDrawer({id: 'm1', something: 'nothing'});
  }).toThrow(Error); // Unknown property `something` of model JunkDrawer
});
