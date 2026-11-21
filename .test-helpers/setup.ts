import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'https://localhost/'
});

const domWindow = dom.window as unknown as Window & typeof globalThis;

const globals: Array<[string, unknown]> = [
  ['window', domWindow],
  ['document', domWindow.document],
  ['navigator', domWindow.navigator],
  ['location', domWindow.location],
  ['Element', domWindow.Element],
  ['HTMLElement', domWindow.HTMLElement],
  ['HTMLInputElement', domWindow.HTMLInputElement],
  ['HTMLCanvasElement', domWindow.HTMLCanvasElement],
  ['Node', domWindow.Node],
  ['Event', domWindow.Event],
  ['CustomEvent', domWindow.CustomEvent],
  ['MouseEvent', domWindow.MouseEvent],
  ['File', domWindow.File],
  ['FileList', domWindow.FileList],
  ['Blob', domWindow.Blob],
  ['DataTransfer', domWindow.DataTransfer],
  ['DOMParser', domWindow.DOMParser],
  ['getComputedStyle', domWindow.getComputedStyle.bind(domWindow)]
];

for (const [name, value] of globals) {
  if (typeof value !== 'undefined') {
    Object.defineProperty(globalThis, name, {
      configurable: true,
      value,
      writable: true
    });
  }
}

if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    return setTimeout(() => {
      callback(performance.now());
    }, 0) as unknown as number;
  };
}

if (typeof globalThis.cancelAnimationFrame !== 'function') {
  globalThis.cancelAnimationFrame = (handle: number): void => {
    clearTimeout(handle);
  };
}

const jquery = require('jquery');

Object.defineProperty(globalThis, 'jQuery', {
  configurable: true,
  value: jquery,
  writable: true
});

Object.defineProperty(globalThis, '$', {
  configurable: true,
  value: jquery,
  writable: true
});
