<div align="center">

# GameGuardClient

The client-side companion to the [GameGuard](https://github.com/robertcorponoi/gameguard) that communicates with the server to manage the player and their data.

</div>

<div align="center">

[![NPM version](https://img.shields.io/npm/v/gameguard-client.svg?style=flat)](https://www.npmjs.com/package/gameguard-client)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/gameguard-client/badge.svg)](https://snyk.io/test/github/robertcorponoi/gameguard-client)
![npm](https://img.shields.io/npm/dt/gameguard-client)
[![NPM downloads](https://img.shields.io/npm/dm/gameguard-client.svg?style=flat)](https://www.npmjs.com/package/gameguard-client)
<a href="https://badge.fury.io/js/gameguard-client"><img src="https://img.shields.io/github/issues/robertcorponoi/gameguard-client.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/gameguard-client"><img src="https://img.shields.io/github/license/robertcorponoi/gameguard-client.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

**Note:** A client is **required** to be used with [GameGuard](https://github.com/robertcorponoi/gameguard). If you don't want to use this client you can follow the instructions on how to make your own client [here](#makinig-your-own-client).

## **Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Properties](#properties)
  - [latency](#latency)
- [Signals](#signals)
  - [connected](#connected)
  - [messaged](#messaged)
  - [disconnected](#disconnected)
- [Making Your Own Client](#making-your-own-client)
- [Tests](#tests)

## **Installation**

### **npm**

To install gameguard-client through npm, use:

```bash
$ npm install gameguard-client
```

### **Direct Download**

If you prefer to download the module, you can download the repo or just the `gameguard-client.js` file and load it like so:

```html
<script type="module" src="/path/to/gameguard-client.js"></script>
<script type="module">
  import GameGuardClient from '/path/to/gameguard-client.js';
</script>
```

### **CDN**

Alternatively, you can include GameGuardClient via [unpkg](https://unpkg.com/gameguard-client@latest/gameguard-client.js) like so:

```html
<script type="module" src="https://unpkg.com/gameguard-client@latest/gameguard-client.js"></script>
<script type="module">
  import GameGuardClient from 'https://unpkg.com/gameguard-client@latest/gameguard-client.js';
</script>
```

## **Usage**

You should include the GameGuardClient script on the page that the game is running on as GameGuardClient uses cookies and saves them to the current path so it doesn't clutter the rest of the site.

Below is an example of a html page containing a canvas for the game and the GameGuardClient script:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <title>My Game</title>
</head>
<body>
  <canvas id="myGame" width="400" height="350"></canvas>

  <script type="module">
    import GameGuardClient from 'https://unpkg.com/gameguard-client@latest/gameguard-client.js';

    const ggc = new GameGuardClient();
  </script>
</body>
</html>
```

## **How It Works**

Below is general order of how GameGuardClient interacts with the GameGuard server.

1. A user visits the page that contains the GameGuard client.
2. The client then establishes a connection to the GameGuard server and dispatches the `connected` signal.
3. The client checks to see if the user is an existing user by checking for the existence of a `gameguardPlayerId` cookie. If the cookie does not exist then a new player id is created. This new or existing id is then sent over to the server to connect the client as a player.
4. If the client successfully connnects to the GameGuard server, the client will begin getting latency requests to keep a running update of the latency. Otherwise the client will watch for any non-gameguard specific messages and dispatch the `messaged` signal when it receives one.
5. When the client's connection is closed for any reason by the server (high latency, kicked, banned, etc) the `closed` signal is dispatched.

## **Properties**

The GameGuardClient has the following properties that can be read:

### **latency**

The latency is a constantly updating value which represents the average amount of time it takes for a message to make a roundtrip from the server to the client and then back to the server. The interval in between latency updates is defined in the GameGuard server initialization options.

**Example:**

```js
// Once a client is connected we log the latency every second.
ggc.connected.add(() => {
  setInterval(() => {
    console.log(ggc.latency);
  }, 1000);
});
```

## **Signals**

GameGuardClient, like GameGuard server, uses signals instead of events. If you're unfamiliar with signals check out [hypergiant](https://github.com/robertcorponoi/hypergiant) which is the package that GameGuardClient uses for signals.

### **connected**

The `connected` signal is dispatched when the client WebSocket establishes a connection to the GameGuard server and either creates a new id for the player or retrieves an existing id from the cookie set previously.

**Example:**

```js
ggc.connected.add(playerId => {
  // `playerId` is either a new id if the player is new or an existing id if the cookie for it was set previously.
  console.log(playerId);
});
```

### **messaged**

The `messaged` signal is dispatched when the client receives a non-gameguard message from the GameGuard server. A non-gameguard message is any message sent manually so it excludes messages such as heartbeat or latency checks.

**Example:**

```js
ggc.messaged.add(message => {
  // The message object contains the type of message and the contents of the message sent just like in the GameGuard server.
  console.log(message.type, message.content);
});
```

### **disconnected**

The `disconnected` signal is dispatched when the client's connection to the server is closed for any reason. This could be because of high latency or the player being kicked/banned/rejected.

**Example:**

```js
ggc.disconnected.add(code, reason) => {
  // Code is the close code and reason is the reason that the player's connection to the server was closed.
  console.log(code, reason);
});
```

## **Making Your Own Client**

If you don't want to use GameGuardClient you can easily make your own with the bare necessities like so:

1. Create the WebSocket connection so the client can communicate with the GameGuard server and set up the methods to respond to the basic WebSocket events (open, message, close).

**Example:**

```js
const socket = new WebSocket(`wss://${window.location.host}/`);

socket.addEventListener('open', () => onopen());
socket.addEventListener('message', message => onmessage(message));
socket.addEventListener('close', event => onclose(event));
```

2. In the `onopen` method we need to check to see if a player is a new or existing player by checking for the presence of a `gameguardPlayerId` cookie. GameGuardClient does this by using the `js-cookie` library to write and read this cookie like so:

```js
function onopen() {
  // Check for the presence of the cookie that indicates the player is an existing player.
  let playerId = Cookies.get('gameguardPlayerId');
  
  // If it doesn't exist, then we need to create an id. GameGuardClient creates a v4 uuid
  // as the id but this is up to you.
  if (!playerId) playerId = 'abc123';

  // Now we need to send a specific message to the GameGuard server. GameGuardClient uses
  // a Message object you can copy but really you just need an object with a type, content,
  // and timestamp property. The message we need to send to the GameGuard server needs an
  // info of `player-connected`, content of the `playerId` and timestamp is always just
  // `new Date()`.
  const message = {
    type: 'player-connected',
    contents: playerId,
    timestamp: new Date(),
  };

  // Lastly we have to send the message to the GameGuard server as an ArrayBuffer.
  const encoder = new TextEncoder();
  const stringified = JSON.stringify(message);
  const buffer = encoder.encode(stringified);
  socket.send(buffer);
}
```

3. In the `onmessage` method you have can choose to account for the `latency-ping` and `latency` messages or not.

```js
function onmessage(message) {
  // The message from the GameGuard server comes as a blob so we have to convert it to an object.
  message.data.text().then(text => {
    const parsed = JSON.parse(text);

    switch (parsed.type) {
      case 'latency-ping':
          // The GameGuard server has sent a request for a timestamp from the GameGuardClient.
          // This is used to create a get a roundtrip timestamp so that we can get the latency
          // from the GameGuard server to the client.
          const latencyPongMessage = {
            type: 'latency-pong',
            contents: parsed.contents,
            timestamp: new Date(),
          };

          const encoder = new TextEncoder();
          const stringified = JSON.stringify(latencyPongMessage);
          const buffer = encoder.encode(stringified);

          socket.send(buffer);
          break;
        case 'latency':
          // The GameGuard server has sent over the roundtrip latency so we can do something with it.
          const latency = parseFloat(parsed.contents);
          break;
        default:
          // Lastly, handle any other kind of message here.
    }
  });
}
```

4. In the `onclose` method you can handle what to do when the GameGuard server has closed the client's connection.

```js
function onclose(event: CloseEvent) {
  // `event.code` is the close code and `event.reason` is the verbose reason as to why the client's connection was closed. Check the GameGuard server documentation on close codes for kick/ban/reject/etc.
  console.log(event.code, event.reason);
}
```

As you can see, the above is a simple explanation and there's many ways it can be improved such as making utility methods for making message objects or converting messages to/from binary. If you make a client that you would like to share feel free to post an issue recommending it and I will gladly add it to this and the GameGuard server's README.

## **Tests**

The tests for GameGuardClient are run in the browser to best simulate a real environment so to run the available tests you first use:

```bash
$ npm run test
```

After the local server starts up you navigate to `localhost:3000` in the browser and the tests will run.

## **License**

MIT
