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
   * The message represented as an arraybuffer.
   *
   * @property {ArrayBuffer}
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

    _defineProperty(this, "buffer", void 0);

    this.type = type;
    this.contents = contents;
    this.timestamp = +new Date();
    this.buffer = this.toBuffer();
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
    /**
     * Creates an array buffer of the stringified version of the message.
     *
     * @returns {ArrayBuffer} Returns the arraybuffer representation of the message.
     */

  }, {
    key: "toBuffer",
    value: function toBuffer() {
      var encoder = new TextEncoder();
      var encoded = encoder.encode(this.stringify());
      return encoded;
    }
  }]);

  return Message;
}();

exports["default"] = Message;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tZXNzYWdlL01lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsInR5cGUiLCJjb250ZW50cyIsInRpbWVzdGFtcCIsIkRhdGUiLCJidWZmZXIiLCJ0b0J1ZmZlciIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZW5jb2RlciIsIlRleHRFbmNvZGVyIiwiZW5jb2RlZCIsImVuY29kZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsTzs7O0FBQ25COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7OztBQUlBLG1CQUFZQyxJQUFaLEVBQTBCQyxRQUExQixFQUE0QztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUMxQyxTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFFQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUVBLFNBQUtDLFNBQUwsR0FBaUIsQ0FBRSxJQUFJQyxJQUFKLEVBQW5CO0FBRUEsU0FBS0MsTUFBTCxHQUFjLEtBQUtDLFFBQUwsRUFBZDtBQUNEO0FBRUQ7Ozs7Ozs7OztnQ0FLb0I7QUFDbEIsVUFBTUMsT0FBZSxHQUFHO0FBQUVOLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUFiO0FBQW1CQyxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBbEM7QUFBNENDLFFBQUFBLFNBQVMsRUFBRSxLQUFLQTtBQUE1RCxPQUF4QjtBQUVBLGFBQU9LLElBQUksQ0FBQ0MsU0FBTCxDQUFlRixPQUFmLENBQVA7QUFDRDtBQUVEOzs7Ozs7OzsrQkFLd0I7QUFDdEIsVUFBTUcsT0FBb0IsR0FBRyxJQUFJQyxXQUFKLEVBQTdCO0FBRUEsVUFBTUMsT0FBb0IsR0FBR0YsT0FBTyxDQUFDRyxNQUFSLENBQWUsS0FBS0osU0FBTCxFQUFmLENBQTdCO0FBRUEsYUFBT0csT0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIG1lc3NhZ2Ugc2VudCBieSB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIuXHJcbiAqIFxyXG4gKiBUaGlzIHByb3ZpZGVzIHN0cnVjdHVyZSBmb3IgbWVzc2FnZXMgc2VudCBhbG9uZyB3aXRoIG1ldGFkYXRhIHRoYXQgY2FuIGJlIGhlbHBmdWwgdG8gdGhlIHNlcnZlci5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2Uge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0eXBlIG9mIG1lc3NhZ2UgYmVpbmcgc2VudC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge3N0cmluZ31cclxuICAgKi9cclxuICB0eXBlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhY3R1YWwgY29udGVudHMgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICovXHJcbiAgY29udGVudHM6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRpbWVzdGFtcCBvZiB3aGVuIHRoaXMgbWVzc2FnZSB3YXMgY3JlYXRlZCBhbmQgc2VudC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICB0aW1lc3RhbXA6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1lc3NhZ2UgcmVwcmVzZW50ZWQgYXMgYW4gYXJyYXlidWZmZXIuXHJcbiAgICpcclxuICAgKiBAcHJvcGVydHkge0FycmF5QnVmZmVyfVxyXG4gICAqL1xyXG4gIGJ1ZmZlcjogQXJyYXlCdWZmZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFRoZSB0eXBlIG9mIG1lc3NhZ2UgdGhhdCBpcyBiZWluZyBzZW50LlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50cyBUaGUgYWN0dWFsIGNvbnRlbnRzIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgY29udGVudHM6IHN0cmluZykge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgICB0aGlzLmNvbnRlbnRzID0gY29udGVudHM7XHJcblxyXG4gICAgdGhpcy50aW1lc3RhbXAgPSArIG5ldyBEYXRlKCk7XHJcblxyXG4gICAgdGhpcy5idWZmZXIgPSB0aGlzLnRvQnVmZmVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmVwYXJlIHRoaXMgbWVzc2FnZSB0byBiZSBzZW50IGJ5IHN0cmluZ2lmeWluZyB0aGUgY29udGVudHMgb2YgaXQuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGlzIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgc3RyaW5naWZ5KCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBtZXNzYWdlOiBPYmplY3QgPSB7IHR5cGU6IHRoaXMudHlwZSwgY29udGVudHM6IHRoaXMuY29udGVudHMsIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAgfTtcclxuXHJcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGFycmF5IGJ1ZmZlciBvZiB0aGUgc3RyaW5naWZpZWQgdmVyc2lvbiBvZiB0aGUgbWVzc2FnZS5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgYXJyYXlidWZmZXIgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgdG9CdWZmZXIoKTogQXJyYXlCdWZmZXIge1xyXG4gICAgY29uc3QgZW5jb2RlcjogVGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcclxuXHJcbiAgICBjb25zdCBlbmNvZGVkOiBBcnJheUJ1ZmZlciA9IGVuY29kZXIuZW5jb2RlKHRoaXMuc3RyaW5naWZ5KCkpO1xyXG5cclxuICAgIHJldHVybiBlbmNvZGVkO1xyXG4gIH1cclxufVxyXG4iXX0=