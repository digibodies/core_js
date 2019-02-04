// Simple lightweight Domain Model
const {StringProperty} = require('./properties');
// TODO: Remove validation on assignment
// TODO: Blow up if not a field... overall setter ?

const model = (kind, schema) => {
  return (initialValues) => {
    if (!initialValues) { initialValues = {};}
    schema.id = StringProperty(); // id property is implicit

    let m = { _properties: {}, _values: {}, _kind: kind};

    Object.entries(schema).forEach(([key, prop]) => {
      // Collect Properties
      m._properties[key] = prop;
      m._values[key] = m._properties[key].default();

      // Define getter/setter
      Object.defineProperty(m, key, {
        configurable: true,
        get: () => {
          return m._values[key];
        },
        set: (v) => {
          m._values[key] = m._properties[key].validate(v);
        }
      });
    });

    Object.defineProperty(m, 'kind', { get: () => m._kind});
    Object.defineProperty(m, 'values', { get: () => m._values});
    Object.defineProperty(m, 'properties', { get: () => m._properties});

    // Populate initial values - this also validates them
    Object.entries(initialValues).forEach(([key, val]) => {
      if (!m._properties[key]) {
        throw new Error('Unknown property `' + key + '` of model ' + kind);
      }
      m[key] = val;
    });

    return m;
  };
};

module.exports = model;
