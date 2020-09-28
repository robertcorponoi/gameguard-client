## 1.0.0 / 2020-09-27
- [FEATURE] Simplified the `Message` object by taking out the `toString` and `toBinary` methods and moving them to the utility file.
- [FEATURE] Removed the `ClientData` and `Cookies` modules and replaced them with `js-cookie` to make it more simple and efficient.
- [TESTS] Improved and added tests.
- [MISC] Changed typescript out dir to `build` instead of `lib` to match GameGuard server.
- [MISC] Added npm scripts to improve build process.

## 0.14.1 / 2020-04-16
- [MISC] Updated out-of-date dependencies to their latest versions which also fixed all possible fixed security vulnerabilities.

## 0.14.0 / 2020-02-26
- [FEATURE] Messages now get sent and read as binary.
- [MISC] Made sure the client works with the latest version of gameguard.
- [MISC] Updated out of date dependencies to their latest versions.

## 0.13.0 / 2020-02-16
- [MISC] Made sure the client works with the latest version (0.13.0) of gameguard.
- [MISC] Update dependencies to their latest versions.

## 0.12.0 / 2020-02-13
- [MISC] Made sure the client works with the latest version (0.12.0) of gameguard.
- [MISC] Updated gameguard dev dependency to its latest version.

## 0.11.0 / 2020-02-11
- [FEATURE] Added latency property to client that is updated whenever the gameguard server is set to send over the latest latency information.
- [DOCS] Updated docs.
- [MISC] Updated gameguard dev dependency to latest version.
- [MISC] Removed unnecessary dependencies.
- [MISC] Updated rollup plugins to namespaced versions.

## 0.10.1 / 2020-02-10
- [HOTFIX] Fixed contents of message not being parsed correctly.
- [MISC] Changed CHANGELOG format.
- [MISC] Added LICENSE file.
- [MISC] Updated dependencies to their latest versions.

## 0.10.0 / 2020-01-29
- [TEST] Updated test to account for gameguard signal name change.
- [MISC] Updated gameguard to latest version.
- [MISC] Renamed `prepublish` script in package.json to `prepare` as prompted by npm.

## 0.9.0 / 2020-01-28
- [FEATURE] Switched from using events to signals.
- [DOCS] Updated docs for signals.
- [TEST] Updated tests.
- [MISC] Updated dependencies to their latest versions.

## 0.8.0 / 2020-01-26
- [DOCS] Added option for using script through unpkg.
- [MISC] Updated dependencies to their latest versions.

## 0.7.0 / 2020-01-19
- [FEATURE] Matched versions with gameguard. From this point forward both packages with matching version numbers will be guaranteed to work with each other.

## 0.6.2 / 2020-01-16
- [HOTFIX] Compiled files from last commit

## 0.6.1 / 2020-01-16
- [HOTFIX] Message.ts was still sending a message with a key of content instead of contents.

## 0.6.0 / 2020-01-16
- [HOTFIX] Changed `content` in Message.ts to `contents`.
- [MISC] Updated typescript to latest version.

## 0.5.0 / 2020-01-14
- [HOTFIX] Changed `player-joined` to `player-connected` as it changed in gameguard.
- [MISC] Updated dev dependencies to their latest versions.

## 0.4.3 / 2020-01-10
- Initial release as a separate package from gameguard.
