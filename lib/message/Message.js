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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdlL01lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInR5cGUiLCJjb250ZW50IiwidGltZXN0YW1wIiwiRGF0ZSIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCQSxPOzs7QUFDbkI7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7QUFJQSxtQkFBWUMsSUFBWixFQUEwQkMsT0FBMUIsRUFBMkM7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDekMsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBRUEsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBRUEsU0FBS0MsU0FBTCxHQUFpQixDQUFFLElBQUlDLElBQUosRUFBbkI7QUFDRDtBQUVEOzs7Ozs7Ozs7Z0NBS29CO0FBQ2xCLFVBQU1DLE9BQWUsR0FBRztBQUFFSixRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBYjtBQUFtQkMsUUFBQUEsT0FBTyxFQUFFLEtBQUtBLE9BQWpDO0FBQTBDQyxRQUFBQSxTQUFTLEVBQUUsS0FBS0E7QUFBMUQsT0FBeEI7QUFFQSxhQUFPRyxJQUFJLENBQUNDLFNBQUwsQ0FBZUYsT0FBZixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgbWVzc2FnZSBzZW50IGJ5IHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlci5cclxuICogXHJcbiAqIFRoaXMgcHJvdmlkZXMgc3RydWN0dXJlIGZvciBtZXNzYWdlcyBzZW50IGFsb25nIHdpdGggbWV0YWRhdGEgdGhhdCBjYW4gYmUgaGVscGZ1bCB0byB0aGUgc2VydmVyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHR5cGUgb2YgbWVzc2FnZSBiZWluZyBzZW50LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHR5cGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFjdHVhbCBjb250ZW50cyBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgKi9cclxuICBjb250ZW50OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0aW1lc3RhbXAgb2Ygd2hlbiB0aGlzIG1lc3NhZ2Ugd2FzIGNyZWF0ZWQgYW5kIHNlbnQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgdGltZXN0YW1wOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFRoZSB0eXBlIG9mIG1lc3NhZ2UgdGhhdCBpcyBiZWluZyBzZW50LlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IFRoZSBhY3R1YWwgY29udGVudHMgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuXHJcbiAgICB0aGlzLnRpbWVzdGFtcCA9ICsgbmV3IERhdGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByZXBhcmUgdGhpcyBtZXNzYWdlIHRvIGJlIHNlbnQgYnkgc3RyaW5naWZ5aW5nIHRoZSBjb250ZW50cyBvZiBpdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoaXMgbWVzc2FnZS5cclxuICAgKi9cclxuICBzdHJpbmdpZnkoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG1lc3NhZ2U6IE9iamVjdCA9IHsgdHlwZTogdGhpcy50eXBlLCBjb250ZW50OiB0aGlzLmNvbnRlbnQsIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAgfTtcclxuXHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgfVxyXG59Il19