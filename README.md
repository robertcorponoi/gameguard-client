<h1 align="center">

GameGuard Client

</h1>

<p align="center">

The client-side component to [GameGuard](https://github.com/robertcorponoi/gameguard).

<div align="center">

[![NPM version](https://img.shields.io/npm/v/gameguard-client.svg?style=flat)](https://www.npmjs.com/package/gameguard-client)
[![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/gameguard-client/badge.svg)](https://snyk.io/test/github/robertcorponoi/gameguard-client)
![npm](https://img.shields.io/npm/dt/gameguard-client)
[![NPM downloads](https://img.shields.io/npm/dm/gameguard-client.svg?style=flat)](https://www.npmjs.com/package/gameguard-client)
<a href="https://badge.fury.io/js/gameguard-client"><img src="https://img.shields.io/github/issues/robertcorponoi/gameguard-client.svg" alt="issues" height="18"></a>
<a href="https://badge.fury.io/js/gameguard-client"><img src="https://img.shields.io/github/license/robertcorponoi/gameguard-client.svg" alt="license" height="18"></a>
[![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

**Note:** Currently this is **required** to be used with [GameGuard](https://github.com/robertcorponoi/gameguard), it is not an optional component.

**Note:** This is still in pre 1.0.0 so features/documentation are actively being developed.

**Note:** As of 0.7.0 gameguard and gameguard-client installs that match version numbmers will be guaranteed to work with each other.

This client-side component to GameGuard is used to communicate with the GameGuard server in order to manage your game's player states.

## **Installation**

To install gameguard-client, use:

```bash
$ npm install gameguard-client
```

## **Usage**

In order to use gameguard-client, you have to include the script on your game's html page.

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
    // Import the gameguard-client class from the gameguard-client.js file. You can serve it from the node_modules directory from your server or you can use a CDN.
    import GameGuardClient from 'node_modules/gameguard-client/gameguard-client.js';

    const ggc = new GameGuardClient();
  </script>
</body>
</html>
```

## **Events**

gameguard-client provides the following events that can be listened to:

### **open**

The open event is emitted when the player establishes a connection to the gameguard server and the client either creates an id for the player or retrives an existing id.

**example:**

```js
ggc.on('open', (playerId) => {
  // PlayerId is the id for that player that was just created if the player is new or retrieved if the player is existing.
  console.log(playerId);
});
```

### **message**

The message event is emitted when a message is received from the server.

**example:**

```js
ggc.on('message', (message) => {
  // The message object contains the type of message and the contents of the message sent.
  console.log(message.type, message.content);
});
```

### **close**

The close event is emitted when the player's connection to the server is closed, whether the server went down or the player was kicked/banned.

**example:**

```js
ggc.on('close', (reason) => {
  // Reason is the reason that the player's connection to the server was closed.
  console.log(reason);
});
```

## **Test**

The tests for gameguard-client are browser based to so start the localhost server that lets you access the tests you can use:

```bash
$ npm run test
```

which starts up a local server at `localhost:3000` and then going to that address you can run the tests.

## **License**

MIT
