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
        content: this.contents,
        timestamp: this.timestamp
      };
      return JSON.stringify(message);
    }
  }]);

  return Message;
}();

exports["default"] = Message;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdlL01lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInR5cGUiLCJjb250ZW50cyIsInRpbWVzdGFtcCIsIkRhdGUiLCJtZXNzYWdlIiwiY29udGVudCIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLcUJBLE87OztBQUNuQjs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7OztBQUlBLG1CQUFZQyxJQUFaLEVBQTBCQyxRQUExQixFQUE0QztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUMxQyxTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFFQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUVBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBRSxJQUFJQyxJQUFKLEVBQW5CO0FBQ0Q7QUFFRDs7Ozs7Ozs7O2dDQUtvQjtBQUNsQixVQUFNQyxPQUFlLEdBQUc7QUFBRUosUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBQWI7QUFBbUJLLFFBQUFBLE9BQU8sRUFBRSxLQUFLSixRQUFqQztBQUEyQ0MsUUFBQUEsU0FBUyxFQUFFLEtBQUtBO0FBQTNELE9BQXhCO0FBRUEsYUFBT0ksSUFBSSxDQUFDQyxTQUFMLENBQWVILE9BQWYsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG1lc3NhZ2Ugc2VudCBieSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIuXG4gKiBcbiAqIFRoaXMgcHJvdmlkZXMgc3RydWN0dXJlIGZvciBtZXNzYWdlcyBzZW50IGFsb25nIHdpdGggbWV0YWRhdGEgdGhhdCBjYW4gYmUgaGVscGZ1bCB0byB0aGUgc2VydmVyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlIHtcbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIG1lc3NhZ2UgYmVpbmcgc2VudC5cbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfVxuICAgKi9cbiAgdHlwZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgYWN0dWFsIGNvbnRlbnRzIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XG4gICAqL1xuICBjb250ZW50czogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdGltZXN0YW1wIG9mIHdoZW4gdGhpcyBtZXNzYWdlIHdhcyBjcmVhdGVkIGFuZCBzZW50LlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICB0aW1lc3RhbXA6IG51bWJlcjtcblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVGhlIHR5cGUgb2YgbWVzc2FnZSB0aGF0IGlzIGJlaW5nIHNlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50cyBUaGUgYWN0dWFsIGNvbnRlbnRzIG9mIHRoZSBtZXNzYWdlLlxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMuY29udGVudHMgPSBjb250ZW50cztcblxuICAgIHRoaXMudGltZXN0YW1wID0gKyBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhpcyBtZXNzYWdlIHRvIGJlIHNlbnQgYnkgc3RyaW5naWZ5aW5nIHRoZSBjb250ZW50cyBvZiBpdC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZ2lmaWVkIHZlcnNpb24gb2YgdGhpcyBtZXNzYWdlLlxuICAgKi9cbiAgc3RyaW5naWZ5KCk6IHN0cmluZyB7XG4gICAgY29uc3QgbWVzc2FnZTogT2JqZWN0ID0geyB0eXBlOiB0aGlzLnR5cGUsIGNvbnRlbnQ6IHRoaXMuY29udGVudHMsIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAgfTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcbiAgfVxufVxuIl19