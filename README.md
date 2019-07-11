<div align="center">
  <h1>@system76/eslint-config</h1>
  <h3>System76 eslint configuration</h3>
  <br>
  <br>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@system76/eslint-config/">
    <img src="https://img.shields.io/npm/v/@system76/eslint-config.svg" alt="npm">
  </a>

  <a href="https://travis-ci.org/system76/web-eslint-config">
    <img src="https://travis-ci.org/system76/web-eslint-config.svg" alt="travis-ci">
  </a>

  <a href="https://renovatebot.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" alt="renovate">
  </a>

  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="standard">
  </a>
</p>

---

This is the System76 eslint configuration. It is based off of
[standard](https://github.com/feross/standard), but includes additional rules
for common libraries and tools we use here at System76. This includes
[ava](https://github.com/avajs/ava), [vue](https://github.com/vuejs/vue), and
some others.

## Using

```
npm install --save-dev @system76/eslint-config
```

Then extend this in your own eslint configuration file:

```js
module.exports = {
  extends: [
    '@system76'
  ]
}
```

Then add these lines to your `package.json` file:

```json
{
  "scripts": {
    "lint:js": "eslint --ext js,vue --ignore-path .gitignore .",
    "lint:js:fix": "eslint --fix --ext js,vue --ignore-path .gitignore ."
  }
}
```

And finally, you can lint with `npm run lint:js`.

## Development

There's not much to it. Aside from the few test files we check, the only file
you need to concern yourself with is the `eslintrc.json` file. If the tests and
linting pass, you are good for a PR!

## Deployment

This repository uses [semantic-release][semantic] to determine the npm version
and when to release. Please ensure your commit messages follow the [Angular
Commit Message Conventions][acmc].

Past that, just push to master and [travis][travis] will take care of the rest.

[semantic]: https://github.com/semantic-release/semantic-release
[acmc]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[travis]: https://travis-ci.org/system76/web-eslint-config
