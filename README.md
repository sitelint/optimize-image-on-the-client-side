# Optimize image on the client side

Optimize image after selecting using `<input type="file">`. The optimization process takes place in the background and it's done automatically by listening for changes on all inputs type `file`.

**Note that images that are larger in size after compression are not taken into account.**

## Features

* Compressing by the browser, client-side. No image is sent outside of the browser anywhere.
* When compression takes more than 1 second then the user will see a busy indicator.

## Demo

[Optimize image on the client side](https://www.sitelint.com/lab/optimize-image-on-the-client-side/)

## Benefits

* Faster uploading and downloading data.
* Reducing memory consumption.
* Saves the space on the server.

## Getting started

### NPM

```bash
npm install @sitelintcode/optimize-image-on-the-client-side --save
```

## TypeScript

```TypeScript
import { OptimizeImage } from '@sitelintcode/optimize-image-on-the-client-side';

const optimizeImage: OptimizeImage = new OptimizeImage();

optimizeImage.install();
```

### Options

**`cssQuerySelector?: string | undefined`** - you can specify here custom CSS selector to find your own `input` type file. By default there is a global `change` event listener that handles all inputs type file.

**`onCompressionDoneCallback?: Function`** - pass callback after compression is done. `const onCompressionDone = (filesBeforeCompression, filesAfterCompression) => {}`;

**`quality: number = 0.75`** - you may change the default quality parameter. Read more about [`quality` paremeter on MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#quality).

This could be set through `install` method arguments:

```JavaScript
const optimizeImage = new OptimizeImage();

optimizeImage.install(undefined, undefined, 0.85);
```

or at any time later

```JavaScript
const optimizeImage = new OptimizeImage();

optimizeImage.quality = 0.85;
```

## Browser environment

```HTML
<script src="https://cdn.jsdelivr.net/npm/@sitelintcode/optimize-image-on-the-client-side@0.0.18/dist/optimize-image-on-the-client-side.js"></script>
<script>
(function() {
  const optimizeImage = new window.sitelint.OptimizeImage();
  optimizeImage.install();
}())
</script>
```

### Notes

Note the version number in the jsdelivr URL: **0.0.29**. Don't forget to set desired version. You may check releases: https://github.com/sitelint/optimize-image-on-the-client-side/releases

Worth to mention that [jsdelivr](https://www.jsdelivr.com) suggests:

> Omit the version completely or use latest to load the latest one (not recommended for production usage).

## Technical

1. `import { terser } from "rollup-plugin-terser";` was replaced with  `import { terser } from "rollup-plugin-minification";` because `rollup-plugin-terser` is not compatible with Rollup 3.x version. See: https://github.com/TrySound/rollup-plugin-terser/issues/119

## Contributing

Contributions are welcome, and greatly appreciated! Contributing doesn't just mean submitting pull requests. There are many different ways for you to get involved, including answering questions on the issues, reporting or triaging bugs, and participating in the features evolution process.

## License

MOZILLA PUBLIC LICENSE, VERSION 2.0
