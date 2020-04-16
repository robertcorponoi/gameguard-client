'use strict';
/**
 * The options available for an instance of GameGuard client and their default values.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/**
 * Indicates whether the websocket will connect to the server with a secure connection or not.
 * 
 * @property {boolean}
 * 
 * @default false
 */

/**
 * @param {Object} options The initialization parameters passed to the GameGuard client instance. 
 * @param {boolean} [options.secure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "secure", false);

  Object.assign(this, options);
};

exports["default"] = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7QUFJQSxpQkFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBLGtDQU5YLEtBTVc7O0FBQzNCQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBUaGUgb3B0aW9ucyBhdmFpbGFibGUgZm9yIGFuIGluc3RhbmNlIG9mIEdhbWVHdWFyZCBjbGllbnQgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHdlYnNvY2tldCB3aWxsIGNvbm5lY3QgdG8gdGhlIHNlcnZlciB3aXRoIGEgc2VjdXJlIGNvbm5lY3Rpb24gb3Igbm90LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKiBcclxuICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAqL1xyXG4gIHNlY3VyZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgaW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycyBwYXNzZWQgdG8gdGhlIEdhbWVHdWFyZCBjbGllbnQgaW5zdGFuY2UuIFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2VjdXJlPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2Vic29ja2V0IHdpbGwgY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYSBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0KSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxufSJdfQ==