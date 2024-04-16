import parserCreator from "./parser-creator";
var isServer = typeof window === 'undefined';

if (!isServer && !window.katex) {
  console.error('Please import resources katex from cdn');
}

export default parserCreator(!isServer ? window.katex : null);