function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck$1;

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass$1;

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty$1;

var Task = /*#__PURE__*/function () {
  /**
   * The method to be called when processing this task.
   * 
   * @property {Function}
   */

  /**
   * Indicates whether this task will only run once before being deleted or not.
   * 
   * @private
   * 
   * @property {boolean}
   */

  /**
   * If true this indicates to Hypergiant that it needs to be deleted on the next pass.
      * 
      * @private
   * 
   * @property {boolean}
   */

  /**
   * The number of times that this task has been called.
      * 
      * @private
   * 
   * @property {number}
   */

  /**
   * Indicates whether this task is currently paused or not.
   * 
   * @property {boolean}
   */

  /**
   * @param {Function} fn The method to attach to this task.
   * @param {boolean} once Indicates whether this task will only run once before being deleted or not.
   */
  function Task(fn, once) {
    classCallCheck(this, Task);

    defineProperty(this, "fn", void 0);

    defineProperty(this, "_once", void 0);

    defineProperty(this, "_delete", false);

    defineProperty(this, "_timesCalled", 0);

    defineProperty(this, "paused", false);

    this.fn = fn;
    this._once = once;
  }
  /**
   * Returns whether the task should run only once or not.
   * 
   * @returns {boolean}
   */


  createClass(Task, [{
    key: "run",

    /**
     * Runs the method associated with this task.
     * 
     * @param {...*} args Any other data that should be passed to this task.
     */
    value: function run() {
      if (this.paused) return;
      this.fn.apply(this, arguments);
      this._timesCalled++;
      if (this._once) this._delete = true;
    }
  }, {
    key: "once",
    get: function get() {
      return this._once;
    }
    /**
     * Returns whether the task should be deleted or not.
     * 
     * @returns {boolean}
     */

  }, {
    key: "delete",
    get: function get() {
      return this._delete;
    }
    /**
     * Returns the number of times that this task has been called.
     * 
     * @returns {number}
     */

  }, {
    key: "timesCalled",
    get: function get() {
      return this._timesCalled;
    }
  }]);

  return Task;
}();

/**
 * Hypergiant is used to create signals that run a task when emitted.
 *
 * One of the biggest advtantages that signals have over native JavaScript 
 * events is that they don't rely on correct typing.
 */

var Hypergiant = /*#__PURE__*/function () {
  function Hypergiant() {
    classCallCheck(this, Hypergiant);

    defineProperty(this, "_tasks", new Array());
  }

  createClass(Hypergiant, [{
    key: "add",

    /**
     * Add a new signal.
     * 
     * @param {Function} fn The method that should be called when the signal is dispatched.
     * @param {boolean} [once=false] Indicates whether this signal should only be dispatched once and then deleted.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */
    value: function add(fn) {
      var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._tasks.push(new Task(fn, once));

      return this;
    }
    /**
     * Dispatch this Hypergiant event and run all of the tasks associated
     * with it along with any data passed to it.
     * 
     * @param {...*} args Any other data that should be passed to the tasks associated with this Hypergiant instance.
     */

  }, {
    key: "dispatch",
    value: function dispatch() {
      for (var i = 0; i < this.tasks.length; ++i) {
        var task = this.tasks[i]; // For each task we run it with th eprovided arguments.

        task.run.apply(task, arguments); // If the task is set to be deleted, then we have to get the index of the current
        // task and then splice it.

        if (task["delete"]) this.tasks.splice(i, 1);
      }
    }
    /**
     * Removes a task from this signal by name.
     *
     * @param {Function} task The task to remove.
     *
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "remove",
    value: function remove(fn) {
      this._tasks = this.tasks.filter(function (task) {
        return task.fn.toString() != fn.toString();
      });
      return this;
    }
    /**
     * Removes all tasks from this signal.
     *
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "removeAll",
    value: function removeAll() {
      this._tasks = [];
      return this;
    }
    /**
     * Pauses a task attached to this signal until it is unpaused.
     * 
     * This means that the paused task will not be called and just be silent until the `enable` method is called
     * on it returning it back to its normal state.
     * 
     * @param {Function} task The task to pause.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "pause",
    value: function pause(fn) {
      var taskToPause = this.tasks.find(function (task) {
        return !task.paused && fn.toString() === task.fn.toString();
      });
      if (taskToPause) taskToPause.paused = true;
      return this;
    }
    /**
     * Resumes a task from a paused state.
     * 
     * @param {Function} task The paused task.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "resume",
    value: function resume(fn) {
      var taskToResume = this.tasks.find(function (task) {
        return task.paused && fn.toString() === task.fn.toString();
      });
      if (taskToResume) taskToResume.paused = false;
      return this;
    }
    /**
     * Makes a task a noop function.
     * 
     * @param {Function} task The task to make noop.
     * 
     * @returns {Hypergiant} Returns this for chaining.
     */

  }, {
    key: "noop",
    value: function noop(fn) {
      var taskToNoop = this.tasks.find(function (task) {
        return fn.toString() === task.fn.toString();
      });
      if (taskToNoop) taskToNoop.fn = function () {};
      return this;
    }
  }, {
    key: "tasks",

    /**
     * Returns the tasks created for this signal.
     * 
     * @returns {Array<Task>}
     */
    get: function get() {
      return this._tasks;
    }
    /**
     * Returns the number of tasks currently assigned to this signal.
     * 
     * @returns {number}
     */

  }, {
    key: "numTasks",
    get: function get() {
      return this._tasks.length;
    }
  }]);

  return Hypergiant;
}();

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

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var js_cookie = createCommonjsModule(function (module, exports) {
(function (factory) {
	var registeredInModuleLoader;
	{
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));
});

/**
* Encodes a message from a message object to an ArrayBuffer.
* 
* @param {Message} message The message to encode.
* 
* @returns {ArrayBuffer} Returns the message as an ArrayBuffer.
*/
function messageToBuffer(message) {
  var encoder = new TextEncoder();
  var type = message.type,
      contents = message.contents,
      timestamp = message.timestamp;
  var stringified = JSON.stringify({
    type: type,
    contents: contents,
    timestamp: timestamp
  });
  return encoder.encode(stringified);
}
/**
 * Checks to see if a player is an existing player by checking for a cookie
 * containing their player id. If no existing player id is found, then a new
 * one is created for the player.
 * 
 * @returns {string} Returns an existing or new player id.
 */

function getPlayerId() {
  var existingPlayerId = js_cookie.get('gameguardPlayerId');
  if (existingPlayerId) return existingPlayerId;
  var newPlayerId = generatePlayerId();
  js_cookie.set('gameguardPlayerId', newPlayerId, {
    expires: 365,
    path: ''
  });
  return newPlayerId;
}
/**
 * Generates a v4 compliant uuid to use for player ids.
 * 
 * This is based off the answer from: https://stackoverflow.com/a/2117523/4274475
 * 
 * @returns {string} Returns a valid v4 uuid.
 */

function generatePlayerId() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
}

/**
 * GameGuardClient communicates with the server to manage the player and their 
 * data.
 */

var GameGuardClient = /*#__PURE__*/function () {
  /**
   * The options passed to GameGuardClient on initialization.
   * 
   * @private
   * 
   * @property {Options}
   */

  /**
  * The GameGuardClient instance WebSocket connection.
  * 
  * @private
  * 
  * @property {WebSocket}
  */

  /**
   * The signal that is dispatched when the client is assigned a player id.
   *
   * This signal is dispatched with the id that was assigned to this client.
   *
   * @private
   * 
   * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when the client receives a message from 
   * the GameGuard server.
   *
   * This signal is dispatched with the message that was sent to the client.
   *
   * @property {Hypergiant}
   */

  /**
   * The signal that is dispatched when the client's connection with the 
   * GameGuard server is ended.
   *
   * This signal is dispatched with the close code and reason.
   *
   * @private
   *
   * @property {Hypergiant}
   */

  /**
   * This client's latency to the GameGuard server, in milliseconds.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {Object} [options] The initialization parameters passed to this instance.
   * @param {boolean} [options.useSecure=false] Indicates whether the websocket will connect to the server with a secure connection or not.
   */
  function GameGuardClient() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, GameGuardClient);

    _defineProperty(this, "_options", void 0);

    _defineProperty(this, "_socket", void 0);

    _defineProperty(this, "_connected", new Hypergiant());

    _defineProperty(this, "_messaged", new Hypergiant());

    _defineProperty(this, "_disconnected", new Hypergiant());

    _defineProperty(this, "_latency", 0);

    this._options = new Options(options);

    this._connectToServer();
  }
  /**
   * Returns the connected signal.
   *
   * @returns {Hypergiant}
   */


  _createClass(GameGuardClient, [{
    key: "_connectToServer",

    /**
     * Create the WebSocket connection and attach the methods that respond to the
     * `open`, `message`, and `close` events.
     * 
     * @private
     */
    value: function _connectToServer() {
      var _this = this;

      // If the `useSecure` option is set to true when we need to make sure that
      // the `wss` protocol is used.
      var wsProtocol = this._options.useSecure ? 'wss' : 'ws'; // Create the WebSocket connection by combining the protocol from above
      // with the current page (since it's where the game should be).

      this._socket = new WebSocket("".concat(wsProtocol, "://").concat(window.location.host, "/")); // Define the methods that should run when the `open`, `message`, and
      // `close` events are emitted.

      this._socket.addEventListener('open', function () {
        return _this._onopen();
      });

      this._socket.addEventListener('message', function (message) {
        return _this._onmessage(message);
      });

      this._socket.addEventListener('close', function (event) {
        return _this._onclose(event);
      });
    }
    /**
     * Called when the connection to the GameGuard server is created and it sends
     * the player's id to the server and lastly dispatches the `connected` signal
     * to let the user know that they have successfully connected.
     * 
     * @private
     */

  }, {
    key: "_onopen",
    value: function _onopen() {
      // Get the existing player id if there is a cookie set, otherwise we create
      // a new player id.
      var playerId = getPlayerId(); // Create the player-connected message that the GameGuard server expects to
      // receive and send it with the player's id.

      var message = new Message('player-connected', playerId);

      this._socket.send(messageToBuffer(message)); // Finally we dispatch the `connected` signal with the player's id.


      this.connected.dispatch(playerId);
    }
    /**
     * When the client receives a message from the GameGuard server, we first
     * check to see if it's an internal message that we need to respond to. If
     * it's not a message for us, then we dispatch the `messaged` signal so that
     * the user can respond to the message.
     * 
     * @private
     * 
     * @param {MessageEvent} message The message event received from the GameGuard server.
     */

  }, {
    key: "_onmessage",
    value: function _onmessage(message) {
      var _this2 = this;

      message.data.text().then(function (text) {
        // Decode the message from an ArrayBuffer to a Message object.
        var parsed = JSON.parse(text);
        var messageDecoded = new Message(parsed.type, parsed.contents);

        switch (messageDecoded.type) {
          case 'latency-ping':
            // The GameGuard server has sent a request for a timestamp from the GameGuardClient.
            // This is used to create a get a roundtrip timestamp so that we can get the latency
            // from the GameGuard server to the client.
            var latencyPongMessage = new Message('latency-pong', messageDecoded.contents);

            _this2._socket.send(messageToBuffer(latencyPongMessage));

            break;

          case 'latency':
            // The GameGuard server has sent over the roundtrip latency so we can assign it to
            // the `latency` property to be used by the client.
            _this2._latency = parseFloat(messageDecoded.contents);
            break;

          default:
            // Lastly, the message is not internal and is meant for the client so we pass it on
            // over to them to handle it.
            _this2.messaged.dispatch(messageDecoded);

        }
      });
    }
    /**
     * When the client's connection to the GameGuard server is closed, we dispatch
     * the `disconnected` signal which could be used by the user to stop the game
     * for the client.
     * 
     * @private
     * 
     * @property {Event} event The WebSocket close event Object.
     */

  }, {
    key: "_onclose",
    value: function _onclose(event) {
      this.disconnected.dispatch({
        code: event.code,
        reason: event.reason
      });
    }
  }, {
    key: "connected",
    get: function get() {
      return this._connected;
    }
    /**
     * Returns the messaged signal.
     *
     * @returns {Hypergiant}
     */

  }, {
    key: "messaged",
    get: function get() {
      return this._messaged;
    }
    /**
     * Returns the disconnected signal.
     *
     * @returns {Hypergiant}
     */

  }, {
    key: "disconnected",
    get: function get() {
      return this._disconnected;
    }
    /**
     * Returns this client's latency to the server, in milliseconds.
     * 
     * @returns {number}
     */

  }, {
    key: "latency",
    get: function get() {
      return this._latency;
    }
  }]);

  return GameGuardClient;
}();

export default GameGuardClient;
