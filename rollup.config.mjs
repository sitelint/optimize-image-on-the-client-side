/* eslint-disable no-process-env */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import html from 'rollup-plugin-html';
import json from 'rollup-plugin-json';
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  input: 'src/optimize-image-on-the-client-side.ts',
  output: [
    {
      file: './dist/optimize-image-on-the-client-side.js',
      format: 'umd',
      name: 'sitelint'
    },
    {
      file: './dist/optimize-image-on-the-client-side.mjs',
      format: 'es'
    }
  ],
  plugins: [
    html({
      include: '**/*.html'
    }),
    commonjs({
      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      /*
       * non-CommonJS modules will be ignored, but you can also
       * specifically include/exclude files
       */
      include: ['./index.js', 'node_modules/**'], // Default: undefined

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false // Default: true
    }),
    resolve({
      preferBuiltins: true
    }),
    esbuild({
      minify: process.env.BUILD === 'production',
      target: 'esnext',
      tsconfig: path.join(__dirname, 'tsconfig.json')
    }),
    json()
  ]
};

if (process.env.BUILD === 'development') {
  config.plugins.push(visualizer({
    filename: './stats/stats.html'
  }));
}

export default config;
