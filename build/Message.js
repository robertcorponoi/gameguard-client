'use strict';
/**
 * The structure of a message sent between the GameGuardClient and GameGuard.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Message =
/**
 * The type of message the message is.
 * 
 * @property {string}
 */

/**
 * The contents of the message.
 * 
 * @property {string}
 */

/**
 * The timestamp of when the message was created.
 * 
 * @property {number}
 */

/**
 * @param {string} type The type of message that is being sent.
 * @param {string} contents The actual contents of the message.
 */
function Message(type, contents) {
  _classCallCheck(this, Message);

  _defineProperty(this, "type", void 0);

  _defineProperty(this, "contents", void 0);

  _defineProperty(this, "timestamp", void 0);

  this.type = type;
  this.contents = contents;
  this.timestamp = +new Date();
};

exports["default"] = Message;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NZXNzYWdlLnRzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJ0eXBlIiwiY29udGVudHMiLCJ0aW1lc3RhbXAiLCJEYXRlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7O0lBR3FCQSxPO0FBQ25COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7O0FBSUEsaUJBQVlDLElBQVosRUFBMEJDLFFBQTFCLEVBQTRDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQzFDLE9BQUtELElBQUwsR0FBWUEsSUFBWjtBQUNBLE9BQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQixDQUFFLElBQUlDLElBQUosRUFBbkI7QUFDRCxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogVGhlIHN0cnVjdHVyZSBvZiBhIG1lc3NhZ2Ugc2VudCBiZXR3ZWVuIHRoZSBHYW1lR3VhcmRDbGllbnQgYW5kIEdhbWVHdWFyZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2Uge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0eXBlIG9mIG1lc3NhZ2UgdGhlIG1lc3NhZ2UgaXMuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICovXHJcbiAgdHlwZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29udGVudHMgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICovXHJcbiAgY29udGVudHM6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWVzdGFtcCBvZiB3aGVuIHRoZSBtZXNzYWdlIHdhcyBjcmVhdGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHRpbWVzdGFtcDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgdHlwZSBvZiBtZXNzYWdlIHRoYXQgaXMgYmVpbmcgc2VudC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudHMgVGhlIGFjdHVhbCBjb250ZW50cyBvZiB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmNvbnRlbnRzID0gY29udGVudHM7XHJcbiAgICB0aGlzLnRpbWVzdGFtcCA9ICsgbmV3IERhdGUoKTtcclxuICB9XHJcbn1cclxuIl19