const exceptions = require('../src/exceptions');

test('PermissionException contains message', () => {
  const msg = 'You do not have permission to this resource.';
  try {
    throw new exceptions.PermissionException(msg);
  } catch (e) {
    expect(e.message).toBe(msg);
  }
});


test('AuthenticationException contains message', () => {
  const msg = 'Invalid login credentials.';
  try {
    throw new exceptions.AuthenticationException(msg);
  } catch (e) {
    expect(e.message).toBe(msg);
  }
});

test('DoesNotExistException contains message', () => {
  const msg = 'The requested resource does not exist.';
  try {
    throw new exceptions.DoesNotExistException(msg);
  } catch (e) {
    expect(e.message).toBe(msg);
  }
});

test('ConflictException contains message', () => {
  const msg = 'Resource with this id already exists.';
  try {
    throw new exceptions.ConflictException(msg);
  } catch (e) {
    expect(e.message).toBe(msg);
  }
});
