'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Simple lightweight Domain Model
var _require = require('./properties'),
    StringProperty = _require.StringProperty;
// TODO: Remove validation on assignment
// TODO: Blow up if not a field... overall setter ?

var model = function model(kind, schema) {
  return function (initialValues) {
    if (!initialValues) {
      initialValues = {};
    }
    schema.id = StringProperty(); // id property is implicit

    var m = { _properties: {}, _values: {}, _kind: kind };

    Object.entries(schema).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          prop = _ref2[1];

      // Collect Properties
      m._properties[key] = prop;
      m._values[key] = m._properties[key].default();

      // Define getter/setter
      Object.defineProperty(m, key, {
        configurable: true,
        get: function get() {
          return m._values[key];
        },
        set: function set(v) {
          m._values[key] = m._properties[key].validate(v);
        }
      });
    });

    Object.defineProperty(m, 'kind', { get: function get() {
        return m._kind;
      } });
    Object.defineProperty(m, 'values', { get: function get() {
        return m._values;
      } });
    Object.defineProperty(m, 'properties', { get: function get() {
        return m._properties;
      } });

    // Populate initial values - this also validates them
    Object.entries(initialValues).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          val = _ref4[1];

      if (!m._properties[key]) {
        throw new Error('Unknown property `' + key + '` of model ' + kind);
      }
      m[key] = val;
    });

    return m;
  };
};

module.exports = model;