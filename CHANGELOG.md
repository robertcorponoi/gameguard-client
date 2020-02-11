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
