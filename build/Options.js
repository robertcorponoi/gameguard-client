'use strict';
/**
 * The options available for an instance of GameGuardClient and their default values.
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
 * @param {Object} options The options passed to GameGuardClient on initialization.
 * @param {boolean} [options.useSecure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
 */
function Options(options) {
  _classCallCheck(this, Options);

  _defineProperty(this, "useSecure", false);

  Object.assign(this, options);
};

exports["default"] = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zLnRzIl0sIm5hbWVzIjpbIk9wdGlvbnMiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7O0lBR3FCQSxPO0FBQ25COzs7Ozs7OztBQVNBOzs7O0FBSUEsaUJBQVlDLE9BQVosRUFBNkI7QUFBQTs7QUFBQSxxQ0FOakIsS0FNaUI7O0FBQzNCQyxFQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLEVBQW9CRixPQUFwQjtBQUNELEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBUaGUgb3B0aW9ucyBhdmFpbGFibGUgZm9yIGFuIGluc3RhbmNlIG9mIEdhbWVHdWFyZENsaWVudCBhbmQgdGhlaXIgZGVmYXVsdCB2YWx1ZXMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgd2Vic29ja2V0IHdpbGwgY29ubmVjdCB0byB0aGUgc2VydmVyIHdpdGggYSBzZWN1cmUgY29ubmVjdGlvbiBvciBub3QuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtib29sZWFufVxyXG4gICAqIFxyXG4gICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICovXHJcbiAgdXNlU2VjdXJlID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb25zIHBhc3NlZCB0byBHYW1lR3VhcmRDbGllbnQgb24gaW5pdGlhbGl6YXRpb24uXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy51c2VTZWN1cmU9ZmFsc2VdIEluZGljYXRlcyB3aGV0aGVyIHRoZSB3ZWJzb2NrZXQgd2lsbCBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCBhIHNlY3VyZSBjb25uZWN0aW9uIG9yIG5vdC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPYmplY3QpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XHJcbiAgfVxyXG59Il19