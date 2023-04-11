# Optimize image on the client side

Optimize image after selecting using `<input type="file">`.

## Demo

[Optimize image on the client side](https://www.sitelint.com/lab/optimize-image-on-the-client-side/)

## Getting started

### NPM

```bash
npm install @sitelintcode/optimize-image-on-the-client-side --save
```

### Browser environment

```Html
  <script src="https://cdn.jsdelivr.net/npm/@sitelintcode/optimize-image-on-the-client-side@0.0.2/dist/optimize-image-on-the-client-side.js"></script>
```

Note: see **0.0.2** version. Don't forget to set desired version.

2. Usage:

## TypeScript

```TypeScript
  import OptimizeImage from '@sitelint/optimize-image-on-the-client-side';

  const optimizeImage: OptimizeImage = new OptimizeImage();

  optimizeImage.install();
```

## Browser environment

```JavaScript
  const optimizeImage = new globalThis.sitelint.OptimizeImage();
```

## Technical

1. `import { terser } from "rollup-plugin-terser";` was replaced with  `import { terser } from "rollup-plugin-minification";` because `rollup-plugin-terser` is not compatible with Rollup 3.x version. See: https://github.com/TrySound/rollup-plugin-terser/issues/119

## Contributing

Contributions are welcome, and greatly appreciated! Contributing doesn't just mean submitting pull requests. There are many different ways for you to get involved, including answering questions on the issues, reporting or triaging bugs, and participating in the features evolution process.

## License

MOZILLA PUBLIC LICENSE, VERSION 2.0
