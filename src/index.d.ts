declare module '*.css';
declare module '*.html';

declare global {
  interface Window {
    jQuery: JQueryStatic;
    $: JQueryStatic;
  }
}

export {};
