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
   * @param {string} content The actual contents of the message.
   */
  function Message(type, content) {
    _classCallCheck(this, Message);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "content", void 0);

    _defineProperty(this, "timestamp", void 0);

    this.type = type;
    this.content = content;
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
        content: this.content,
        timestamp: this.timestamp
      };
      return JSON.stringify(message);
    }
  }]);

  return Message;
}();

exports["default"] = Message;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdlL01lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInR5cGUiLCJjb250ZW50IiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCQSxPOzs7QUFDbkI7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7QUFJQSxtQkFBWUMsSUFBWixFQUEwQkMsT0FBMUIsRUFBMkM7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDekMsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBRUEsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBRUEsU0FBS0MsU0FBTCxHQUFpQixDQUFFLElBQUlDLElBQUosRUFBbkI7QUFDRDtBQUVEOzs7Ozs7Ozs7Z0NBS29CO0FBQ2xCLFVBQU1DLE9BQWUsR0FBRztBQUFFSixRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBYjtBQUFtQkMsUUFBQUEsT0FBTyxFQUFFLEtBQUtBLE9BQWpDO0FBQTBDQyxRQUFBQSxTQUFTLEVBQUUsS0FBS0E7QUFBMUQsT0FBeEI7QUFFQSxhQUFPRyxJQUFJLENBQUNDLFNBQUwsQ0FBZUYsT0FBZixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWVzc2FnZSBzZW50IGJ5IHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlci5cbiAqIFxuICogVGhpcyBwcm92aWRlcyBzdHJ1Y3R1cmUgZm9yIG1lc3NhZ2VzIHNlbnQgYWxvbmcgd2l0aCBtZXRhZGF0YSB0aGF0IGNhbiBiZSBoZWxwZnVsIHRvIHRoZSBzZXJ2ZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2Uge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgbWVzc2FnZSBiZWluZyBzZW50LlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XG4gICAqL1xuICB0eXBlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBhY3R1YWwgY29udGVudHMgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge3N0cmluZ31cbiAgICovXG4gIGNvbnRlbnQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRpbWVzdGFtcCBvZiB3aGVuIHRoaXMgbWVzc2FnZSB3YXMgY3JlYXRlZCBhbmQgc2VudC5cbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxuICAgKi9cbiAgdGltZXN0YW1wOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFRoZSB0eXBlIG9mIG1lc3NhZ2UgdGhhdCBpcyBiZWluZyBzZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCBUaGUgYWN0dWFsIGNvbnRlbnRzIG9mIHRoZSBtZXNzYWdlLlxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcblxuICAgIHRoaXMudGltZXN0YW1wID0gKyBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhpcyBtZXNzYWdlIHRvIGJlIHNlbnQgYnkgc3RyaW5naWZ5aW5nIHRoZSBjb250ZW50cyBvZiBpdC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhpcyBtZXNzYWdlLlxuICAgKi9cbiAgc3RyaW5naWZ5KCk6IHN0cmluZyB7XG4gICAgY29uc3QgbWVzc2FnZTogT2JqZWN0ID0geyB0eXBlOiB0aGlzLnR5cGUsIGNvbnRlbnQ6IHRoaXMuY29udGVudCwgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcCB9O1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xuICB9XG59Il19