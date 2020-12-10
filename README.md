# Eggster

[![NPM](https://img.shields.io/npm/v/eggster)](https://www.npmjs.com/package/eggster)
[![Build status](https://img.shields.io/github/workflow/status/alvarocastro/eggster/build)](https://github.com/alvarocastro/eggster/actions?query=workflow%3Abuild)
[![Maintainability status](https://img.shields.io/codeclimate/maintainability/alvarocastro/eggster)](https://codeclimate.com/github/alvarocastro/eggster/maintainability)
[![Coverage status](https://img.shields.io/coveralls/github/alvarocastro/eggster)](https://coveralls.io/github/alvarocastro/eggster?branch=master)
[![Bundle size](https://img.shields.io/bundlephobia/min/eggster)](https://bundlephobia.com/result?p=eggster)
[![Code style: XO](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Release: Semantic](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Simple, fast and lightweight library to create easter eggs triggered by a sequence of keyboard keys pressed.

Since easter eggs are just for fun and not intended to improve an application, the library aims to be as light as possible by having a small file size (zero dependencies) but also by being fast, it only binds a single event listener to the `document` no matter how many easter eggs are registered while also using raw key codes to avoid extra processing.

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## Install

```bash
npm install eggster
```

## Usage

```js
const eggster = require('eggster');

// Code "eggster"
eggster.add('69,71,71,83,84,69,82', () => {
	console.log('Found it!');
});
```

### eggster.add(code, fn, options = {})

Registers an easter egg that tiggers the `fn` callback when activated.

#### code

Type: `String`

String containing the individual key codes separated by commas.

#### fn

Type: `Function`

Callback that fires when the sequence is pressed.

#### options

Type: `Object`<br>
Default: `{}`

Object of options to configure the behaviour of the code.

##### options.timeout

Type: `Number`<br>
Default: `2000`

Maximum time to wait between each key pressed before restarting the progress.
Use `0` for no timeout.

##### options.once

Type: `Boolean`<br>
Default: `false`

Flag to indicate if the code should run only the first time is completed, subsequent times will be ignored.

### eggster.remove(code)

Removes a code previously registered.

### eggster.teardown()

Removes all the codes and unbinds the keyboard event.

## Contributing

Contributions are always welcome! Please run `npm test` beforehand to ensure everything is ok.

## Support

If you use this package please consider starring it :)
