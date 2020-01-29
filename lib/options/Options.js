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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE87QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7QUFJQSxpQkFBWUMsT0FBWixFQUE2QjtBQUFBOztBQUFBLGtDQU5YLEtBTVc7O0FBQzNCQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBUaGUgb3B0aW9ucyBhdmFpbGFibGUgZm9yIGFuIGluc3RhbmNlIG9mIEdhbWVHdWFyZCBjbGllbnQgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSB3ZWJzb2NrZXQgd2lsbCBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhIHNlY3VyZSBjb25uZWN0aW9uIG9yIG5vdC5cbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cbiAgICogXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBzZWN1cmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIGluaXRpYWxpemF0aW9uIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoZSBHYW1lR3VhcmQgY2xpZW50IGluc3RhbmNlLiBcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zZWN1cmU9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSB3ZWJzb2NrZXQgd2lsbCBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhIHNlY3VyZSBjb25uZWN0aW9uIG9yIG5vdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9iamVjdCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gIH1cbn0iXX0=