# CloudConverter [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/cloudconverter/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/cloudconverter)

A simplified interface to the CloudConvert API.

[![NPM Badge](https://nodei.co/npm/cloudconverter.png)](https://npmjs.com/package/cloudconverter)

## Install

```sh
npm install cloudconverter
```

## Usage

```js
const cloudConverter = require("cloud-converter");

(async () => {
	await cloudConverter("input.png", "output.jpg", { apiKey: ... }); // Convert PNG to JPG
})();
```

## API

### cloudConverter(filename, output, options)

#### filename

Type: `string`

The input filename.

#### output

Type: `string`

The output filename.

#### options

Type: `object`

##### apiKey

Type: `string`

The CloudConvert API key.

##### sandbox

Type: `boolean`\
Default: `false`

Use sandbox mode.

### cloudConverter.stream(input, output, format, options)

#### input

Type: `ReadableStream`

The input stream.

#### output

Type: `WritableStream`

The output stream.

#### format

Type: `string`

The format to convert to.

#### options

Type: `object`

See [options](#options).
