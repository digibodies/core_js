const models = require('../src/models');

// Demo models
let JunkDrawer = models.model('User', {
  name: models.StringProperty(),
  givenName: models.StringProperty({default:'GARRETT'}),
  familyName: models.StringProperty(),
  birthday: models.DateTimeProperty(),
  score: models.IntegerProperty(),
  fav_foods: models.StringProperty({repeated:true})
});

// TODO: Flesh these tests out a lot more
test('different instances have different values', () => {
  const m1 = JunkDrawer();
  const m2 = JunkDrawer();
  const m3 = JunkDrawer();

  m1.fav_foods = ['kale', 'seabass'];
  m2.fav_foods = ['pizza', 'burgers'];

  m3.name = 'Rick';

  // TODO: This should fail
  m1.total_members = 400;

  expect(m1.fav_foods).toEqual(['kale', 'seabass']);
  expect(m2.fav_foods).toEqual(['pizza', 'burgers']);
  expect(m3.fav_foods).toEqual([]); // Default empty
  expect(m3.name).toEqual('Rick');
  expect(m1.name).toEqual(null);
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

  expect(m1.givenName).toEqual('GARRETT'); // explicit
  expect(m1.fav_foods).toEqual([]); // implicit for type

  // Update values
  m1.givenName = 'Rick';
  m1.fav_foods = ['vodka'];

  expect(m1.givenName).toEqual('Rick'); // implicit for type
  expect(m1.fav_foods).toEqual(['vodka']); // implicit for type
});
