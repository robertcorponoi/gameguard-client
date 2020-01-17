'use strict';
/**
 * Represents a message sent by the client to the server.
 * 
 * This provides structure for messages sent along with metadata that can be helpful to the server.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Message =
/*#__PURE__*/
function () {
  /**
   * The type of message being sent.
   * 
   * @property {string}
   */

  /**
   * The actual contents of the message.
   * 
   * @property {string}
   */

  /**
   * The timestamp of when this message was created and sent.
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
  }
  /**
   * Prepare this message to be sent by stringifying the contents of it.
   * 
   * @returns {string} Returns the stringified version of this message.
   */


  _createClass(Message, [{
    key: "stringify",
    value: function stringify() {
      var message = {
        type: this.type,
        contents: this.contents,
        timestamp: this.timestamp
      };
      return JSON.stringify(message);
    }
  }]);

  return Message;
}();

exports["default"] = Message;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdlL01lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInR5cGUiLCJjb250ZW50cyIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsTzs7O0FBQ25COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7O0FBSUEsbUJBQVlDLElBQVosRUFBMEJDLFFBQTFCLEVBQTRDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQzFDLFNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUVBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBRUEsU0FBS0MsU0FBTCxHQUFpQixDQUFFLElBQUlDLElBQUosRUFBbkI7QUFDRDtBQUVEOzs7Ozs7Ozs7Z0NBS29CO0FBQ2xCLFVBQU1DLE9BQWUsR0FBRztBQUFFSixRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBYjtBQUFtQkMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQWxDO0FBQTRDQyxRQUFBQSxTQUFTLEVBQUUsS0FBS0E7QUFBNUQsT0FBeEI7QUFFQSxhQUFPRyxJQUFJLENBQUNDLFNBQUwsQ0FBZUYsT0FBZixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWVzc2FnZSBzZW50IGJ5IHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlci5cbiAqIFxuICogVGhpcyBwcm92aWRlcyBzdHJ1Y3R1cmUgZm9yIG1lc3NhZ2VzIHNlbnQgYWxvbmcgd2l0aCBtZXRhZGF0YSB0aGF0IGNhbiBiZSBoZWxwZnVsIHRvIHRoZSBzZXJ2ZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2Uge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgbWVzc2FnZSBiZWluZyBzZW50LlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XG4gICAqL1xuICB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBhY3R1YWwgY29udGVudHMgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge3N0cmluZ31cbiAgICovXG4gIGNvbnRlbnRzOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lc3RhbXAgb2Ygd2hlbiB0aGlzIG1lc3NhZ2Ugd2FzIGNyZWF0ZWQgYW5kIHNlbnQuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICovXG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgdHlwZSBvZiBtZXNzYWdlIHRoYXQgaXMgYmVpbmcgc2VudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRzIFRoZSBhY3R1YWwgY29udGVudHMgb2YgdGhlIG1lc3NhZ2UuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy5jb250ZW50cyA9IGNvbnRlbnRzO1xuXG4gICAgdGhpcy50aW1lc3RhbXAgPSArIG5ldyBEYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogUHJlcGFyZSB0aGlzIG1lc3NhZ2UgdG8gYmUgc2VudCBieSBzdHJpbmdpZnlpbmcgdGhlIGNvbnRlbnRzIG9mIGl0LlxuICAgKiBcbiAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGlzIG1lc3NhZ2UuXG4gICAqL1xuICBzdHJpbmdpZnkoKTogc3RyaW5nIHtcbiAgICBjb25zdCBtZXNzYWdlOiBPYmplY3QgPSB7IHR5cGU6IHRoaXMudHlwZSwgY29udGVudHM6IHRoaXMuY29udGVudHMsIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAgfTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcbiAgfVxufVxuIl19