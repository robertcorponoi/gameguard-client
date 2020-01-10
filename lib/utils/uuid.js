'use strict';
/**
 * Generates various types of uuids to specifications.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  /**
   * Generates a v4 compliant uuid.
   * 
   * This is derived from this post: https://stackoverflow.com/a/2117523/4274475
   * 
   * @returns {string} Returns a valid v4 uuid.
   */
  v4: function v4() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91dWlkLnRzIl0sIm5hbWVzIjpbInY0IiwicmVwbGFjZSIsImMiLCJjcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJVaW50OEFycmF5IiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7O2VBR2U7QUFDYjs7Ozs7OztBQU9BQSxFQUFBQSxFQVJhLGdCQVFBO0FBQ1g7QUFDQSxXQUFPLENBQUMsQ0FBQyxHQUFELElBQVEsQ0FBQyxHQUFULEdBQWUsQ0FBQyxHQUFoQixHQUFzQixDQUFDLEdBQXZCLEdBQTZCLENBQUMsSUFBL0IsRUFBcUNDLE9BQXJDLENBQTZDLFFBQTdDLEVBQXVELFVBQUFDLENBQUM7QUFBQSxhQUM3RCxDQUFDQSxDQUFDLEdBQUdDLE1BQU0sQ0FBQ0MsZUFBUCxDQUF1QixJQUFJQyxVQUFKLENBQWUsQ0FBZixDQUF2QixFQUEwQyxDQUExQyxJQUErQyxNQUFNSCxDQUFDLEdBQUcsQ0FBOUQsRUFBaUVJLFFBQWpFLENBQTBFLEVBQTFFLENBRDZEO0FBQUEsS0FBeEQsQ0FBUDtBQUdEO0FBYlksQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyB2YXJpb3VzIHR5cGVzIG9mIHV1aWRzIHRvIHNwZWNpZmljYXRpb25zLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlcyBhIHY0IGNvbXBsaWFudCB1dWlkLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgZGVyaXZlZCBmcm9tIHRoaXMgcG9zdDogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxMTc1MjMvNDI3NDQ3NVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgYSB2YWxpZCB2NCB1dWlkLlxyXG4gICAqL1xyXG4gIHY0KCk6IHN0cmluZyB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICByZXR1cm4gKFsxZTddICsgLTFlMyArIC00ZTMgKyAtOGUzICsgLTFlMTEpLnJlcGxhY2UoL1swMThdL2csIGMgPT5cclxuICAgICAgKGMgXiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSAmIDE1ID4+IGMgLyA0KS50b1N0cmluZygxNilcclxuICAgICk7XHJcbiAgfVxyXG59OyJdfQ==