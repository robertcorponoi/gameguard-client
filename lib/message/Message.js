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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdlL01lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInR5cGUiLCJjb250ZW50cyIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsTzs7O0FBQ25COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7O0FBSUEsbUJBQVlDLElBQVosRUFBMEJDLFFBQTFCLEVBQTRDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQzFDLFNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUVBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBRUEsU0FBS0MsU0FBTCxHQUFpQixDQUFFLElBQUlDLElBQUosRUFBbkI7QUFDRDtBQUVEOzs7Ozs7Ozs7Z0NBS29CO0FBQ2xCLFVBQU1DLE9BQWUsR0FBRztBQUFFSixRQUFBQSxJQUFJLEVBQUUsS0FBS0EsSUFBYjtBQUFtQkMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQWxDO0FBQTRDQyxRQUFBQSxTQUFTLEVBQUUsS0FBS0E7QUFBNUQsT0FBeEI7QUFFQSxhQUFPRyxJQUFJLENBQUNDLFNBQUwsQ0FBZUYsT0FBZixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgbWVzc2FnZSBzZW50IGJ5IHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlci5cclxuICogXHJcbiAqIFRoaXMgcHJvdmlkZXMgc3RydWN0dXJlIGZvciBtZXNzYWdlcyBzZW50IGFsb25nIHdpdGggbWV0YWRhdGEgdGhhdCBjYW4gYmUgaGVscGZ1bCB0byB0aGUgc2VydmVyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHR5cGUgb2YgbWVzc2FnZSBiZWluZyBzZW50LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHR5cGU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFjdHVhbCBjb250ZW50cyBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgKi9cclxuICBjb250ZW50czogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGltZXN0YW1wIG9mIHdoZW4gdGhpcyBtZXNzYWdlIHdhcyBjcmVhdGVkIGFuZCBzZW50LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHRpbWVzdGFtcDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgdHlwZSBvZiBtZXNzYWdlIHRoYXQgaXMgYmVpbmcgc2VudC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudHMgVGhlIGFjdHVhbCBjb250ZW50cyBvZiB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgdGhpcy5jb250ZW50cyA9IGNvbnRlbnRzO1xyXG5cclxuICAgIHRoaXMudGltZXN0YW1wID0gKyBuZXcgRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJlcGFyZSB0aGlzIG1lc3NhZ2UgdG8gYmUgc2VudCBieSBzdHJpbmdpZnlpbmcgdGhlIGNvbnRlbnRzIG9mIGl0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhpcyBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIHN0cmluZ2lmeSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbWVzc2FnZTogT2JqZWN0ID0geyB0eXBlOiB0aGlzLnR5cGUsIGNvbnRlbnRzOiB0aGlzLmNvbnRlbnRzLCB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wIH07XHJcblxyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xyXG4gIH1cclxufVxyXG4iXX0=