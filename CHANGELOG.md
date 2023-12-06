# Changelog

## 0.6.0 (2023-12-06)

Full Changelog: [v0.5.2...v0.6.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.5.2...v0.6.0)

### Features

* **client:** support reading the base url from an env variable ([#43](https://github.com/anthropics/anthropic-bedrock-typescript/issues/43)) ([783e9a1](https://github.com/anthropics/anthropic-bedrock-typescript/commit/783e9a1c6bacbc18028ee5e052758103e7c89453))


### Bug Fixes

* bump default request timeout to 10min to match documentation ([#47](https://github.com/anthropics/anthropic-bedrock-typescript/issues/47)) ([16d2d96](https://github.com/anthropics/anthropic-bedrock-typescript/commit/16d2d960dfb8076bb41d769a35aeaec564177238))

## 0.5.2 (2023-11-28)

Full Changelog: [v0.5.1...v0.5.2](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.5.1...v0.5.2)

## 0.5.1 (2023-11-24)

Full Changelog: [v0.5.0...v0.5.1](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.5.0...v0.5.1)

### Chores

* **internal:** remove file import and conditionally run prepare ([#39](https://github.com/anthropics/anthropic-bedrock-typescript/issues/39)) ([546295e](https://github.com/anthropics/anthropic-bedrock-typescript/commit/546295e63e5d0c373f7f84d36b98cf8094c2c5c8))

## 0.5.0 (2023-11-21)

Full Changelog: [v0.4.1...v0.5.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.4.1...v0.5.0)

### Features

* allow installing package directly from github ([#37](https://github.com/anthropics/anthropic-bedrock-typescript/issues/37)) ([758b62f](https://github.com/anthropics/anthropic-bedrock-typescript/commit/758b62f86b7d62229f9f41c931c03eebc16d03fc))


### Chores

* **ci:** fix publish-npm ([#35](https://github.com/anthropics/anthropic-bedrock-typescript/issues/35)) ([03ca66d](https://github.com/anthropics/anthropic-bedrock-typescript/commit/03ca66d6a9b9d7fcc7f930c62535d162e46917ea))
* **internal:** don't call prepare in dist ([#38](https://github.com/anthropics/anthropic-bedrock-typescript/issues/38)) ([21038f6](https://github.com/anthropics/anthropic-bedrock-typescript/commit/21038f62cf3dafda7cf9f79d5694bd2e89392bc6))

## 0.4.1 (2023-11-14)

Full Changelog: [v0.4.0...v0.4.1](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.4.0...v0.4.1)

### Chores

* **ci:** update release-please config ([#29](https://github.com/anthropics/anthropic-bedrock-typescript/issues/29)) ([9f932f7](https://github.com/anthropics/anthropic-bedrock-typescript/commit/9f932f7091d3c0a31c650d326c7669ee90c534ee))
* **docs:** fix github links ([#31](https://github.com/anthropics/anthropic-bedrock-typescript/issues/31)) ([8c433fd](https://github.com/anthropics/anthropic-bedrock-typescript/commit/8c433fdde7c618afc7b5ecd32c85eb06dd0f048b))
* **internal:** update APIResource structure ([#34](https://github.com/anthropics/anthropic-bedrock-typescript/issues/34)) ([c85a2e3](https://github.com/anthropics/anthropic-bedrock-typescript/commit/c85a2e3bfa8d95ea2d7444d32ba884984b7e61e7))
* **internal:** update jest config ([#33](https://github.com/anthropics/anthropic-bedrock-typescript/issues/33)) ([a46da67](https://github.com/anthropics/anthropic-bedrock-typescript/commit/a46da679e8f40600fa37c0de3a90c633b78356eb))
* **internal:** update tsconfig ([#32](https://github.com/anthropics/anthropic-bedrock-typescript/issues/32)) ([b9295df](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b9295dff2a3aa721f057d64dfc41eaf7d6bd0f6c))

## 0.4.0 (2023-11-04)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.3.0...v0.4.0)

### Features

* **client:** allow binary returns ([#27](https://github.com/anthropics/anthropic-bedrock-typescript/issues/27)) ([d9e84a1](https://github.com/anthropics/anthropic-bedrock-typescript/commit/d9e84a1f8d25d43f3eb256723bfb89cf0d354453))
* **github:** include a devcontainer setup ([#26](https://github.com/anthropics/anthropic-bedrock-typescript/issues/26)) ([c37cf14](https://github.com/anthropics/anthropic-bedrock-typescript/commit/c37cf14409464bceeacb97cb6f8e098a1bfefd2d))


### Chores

* **internal:** update gitignore ([#22](https://github.com/anthropics/anthropic-bedrock-typescript/issues/22)) ([d448991](https://github.com/anthropics/anthropic-bedrock-typescript/commit/d448991a6f24c0a50f686380957473bfa2cd13b7))
* small cleanups ([#25](https://github.com/anthropics/anthropic-bedrock-typescript/issues/25)) ([d18cfcb](https://github.com/anthropics/anthropic-bedrock-typescript/commit/d18cfcb28428ca944b423ea515d046720553c28d))


### Documentation

* document customizing fetch ([#28](https://github.com/anthropics/anthropic-bedrock-typescript/issues/28)) ([878bd1b](https://github.com/anthropics/anthropic-bedrock-typescript/commit/878bd1b240dc319e3ab37b7e8b4fe96eb155688a))
* fix github links ([#24](https://github.com/anthropics/anthropic-bedrock-typescript/issues/24)) ([9560ba7](https://github.com/anthropics/anthropic-bedrock-typescript/commit/9560ba7c165d373a23d77d8d14a864845e2dc721))

## 0.3.0 (2023-10-25)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.2.0...v0.3.0)

### Features

* **client:** adjust retry behavior to be exponential backoff ([#18](https://github.com/anthropics/anthropic-bedrock-typescript/issues/18)) ([51d3a6e](https://github.com/anthropics/anthropic-bedrock-typescript/commit/51d3a6e8ab71ba935bd71b497d83df1896835199))


### Bug Fixes

* typo in build script ([#21](https://github.com/anthropics/anthropic-bedrock-typescript/issues/21)) ([b86502d](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b86502d913b2d607c49db9fc1c5656d2a089e7a9))

## 0.2.0 (2023-10-19)

Full Changelog: [v0.1.2...v0.2.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.1.2...v0.2.0)

### Features

* handle 204 No Content gracefully ([#17](https://github.com/anthropics/anthropic-bedrock-typescript/issues/17)) ([f11420b](https://github.com/anthropics/anthropic-bedrock-typescript/commit/f11420b2a9e2b9a127194bd811708f9f010447b5))

## 0.1.2 (2023-10-17)

Full Changelog: [v0.1.1...v0.1.2](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.1.1...v0.1.2)

### Bug Fixes

* import web-streams-polyfill without overriding globals ([#13](https://github.com/anthropics/anthropic-bedrock-typescript/issues/13)) ([30db709](https://github.com/anthropics/anthropic-bedrock-typescript/commit/30db7098fea0154c8dcb484bfee2ed5c4ec946aa))

## 0.1.1 (2023-10-16)

Full Changelog: [v0.1.0...v0.1.1](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.1.0...v0.1.1)

### Bug Fixes

* improve status code in error messages ([#9](https://github.com/anthropics/anthropic-bedrock-typescript/issues/9)) ([aa3f1b0](https://github.com/anthropics/anthropic-bedrock-typescript/commit/aa3f1b01ee5d9161c793f3f263fc5b297d1d1258))


### Chores

* add case insensitive get header function ([#4](https://github.com/anthropics/anthropic-bedrock-typescript/issues/4)) ([b7309b1](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b7309b10201e048f726993c70bbf075f6927cabe))
* **internal:** add debug logs for stream responses ([#8](https://github.com/anthropics/anthropic-bedrock-typescript/issues/8)) ([b8763a7](https://github.com/anthropics/anthropic-bedrock-typescript/commit/b8763a73376e2a1ddb9073b649d4aacfad27bf69))
* update comment ([#6](https://github.com/anthropics/anthropic-bedrock-typescript/issues/6)) ([7361f09](https://github.com/anthropics/anthropic-bedrock-typescript/commit/7361f09aa5430d8dcd8193dc599ea9fa75d17e4e))


### Documentation

* organisation -&gt; organization (UK to US English) ([#11](https://github.com/anthropics/anthropic-bedrock-typescript/issues/11)) ([5cbea8e](https://github.com/anthropics/anthropic-bedrock-typescript/commit/5cbea8e9ef936b314617765d7bc2dbb2c3d98eac))

## 0.1.0 (2023-10-12)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/anthropics/anthropic-bedrock-typescript/compare/v0.0.1...v0.1.0)

### Features

* **init:** initial commit ([#1](https://github.com/anthropics/anthropic-bedrock-typescript/issues/1)) ([17f9073](https://github.com/anthropics/anthropic-bedrock-typescript/commit/17f9073f1545f9f578e67c56f827322a7691ca21))
