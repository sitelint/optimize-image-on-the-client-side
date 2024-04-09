(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sitelint = {}));
})(this, (function (exports) { 'use strict';

  (function (Object) {
    typeof globalThis !== 'object' && (
      this ?
        get() :
        (Object.defineProperty(Object.prototype, '_T_', {
          configurable: true,
          get: get
        }), _T_)
    );
    function get() {
      var global = this || self;
      global.globalThis = global;
      delete Object.prototype._T_;
    }
  }(Object));

  class CommonUtilities {
      static isHtmlElement(el) {
          if (el === null) {
              return false;
          }
          try {
              return el instanceof Element || el instanceof Document;
          }
          catch (t) {
              return (typeof el === 'object' &&
                  el.nodeType === Node.ELEMENT_NODE &&
                  typeof el.style === 'object' &&
                  typeof el.ownerDocument === 'object');
          }
      }
      static getComputedStyle(element, pseudoElt) {
          if (CommonUtilities.isHtmlElement(element)) {
              return document && document.defaultView && document.defaultView.getComputedStyle(element, pseudoElt || null);
          }
          return null;
      }
      static createCSS(content, id, media) {
          if (content === null) {
              throw new Error(`[CommonUtilities.createCSS] passed content is not a string. Is type ${typeof content}`);
          }
          const head = document.head;
          const style = document.createElement('style');
          if (typeof id === 'string') {
              style.id = id;
          }
          if (typeof media === 'string' && media.length > 0) {
              style.setAttribute('media', media);
          }
          if (typeof style['styleSheet'] === 'object') {
              style['styleSheet'].cssText = content;
          }
          else {
              style.appendChild(document.createTextNode(content));
          }
          head.appendChild(style);
      }
  }

  class OptimizeImage {
      constructor() {
          this.inputTypeFileHandlerReference = null;
          this.customInputElements = null;
          this.onCompressionDoneCallback = undefined;
          this.originalCursor = undefined;
          this.timeoutId = undefined;
          this.processedEvent = false;
          this.busyElementId = 'sl_busy_indicator';
          this.quality = 0.75;
      }
      createCSS() {
          const css = `
    .sl-busy-indicator {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 4px;
      width: 100%;
    }

    .sl-busy-indicator span {
      background-image: url("data:image/gif;base64,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");
      background-repeat: no-repeat;
      background-position: 100% 50%;
      background-size: 1.5rem 1.5rem;
      display: inline-flex;
      height: 1.5rem;
      width: 1.5rem;
    }`;
          CommonUtilities.createCSS(css);
      }
      enableBusyIndicator() {
          const bodyStyles = CommonUtilities.getComputedStyle(document.body);
          if (bodyStyles === null) {
              return;
          }
          this.originalCursor = bodyStyles.getPropertyValue('cursor');
          document.body.style.cursor = 'progress';
          const busyElement = document.createElement('div');
          busyElement.id = this.busyElementId;
          busyElement.classList.add('sl-busy-indicator');
          busyElement.insertAdjacentHTML('afterbegin', '<span></span>');
          document.body.appendChild(busyElement);
      }
      disableBusyIndicator() {
          globalThis.clearTimeout(this.timeoutId);
          if (typeof this.originalCursor === 'string') {
              document.body.style.cursor = this.originalCursor;
          }
          const busyElement = document.getElementById(this.busyElementId);
          busyElement === null || busyElement === void 0 ? void 0 : busyElement.remove();
      }
      async compressImage(file, { quality = 1, type = file.type }) {
          let imageBitmap;
          try {
              imageBitmap = await globalThis.createImageBitmap(file);
          }
          catch (e) {
              return Promise.resolve(null);
          }
          const canvas = document.createElement('canvas');
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
          const context = canvas.getContext('2d');
          if (context === null) {
              return Promise.resolve(null);
          }
          context.drawImage(imageBitmap, 0, 0);
          let blob;
          try {
              blob = await new Promise((resolve) => {
                  return canvas.toBlob(resolve, type, quality);
              });
          }
          catch (e) {
              return Promise.resolve(null);
          }
          if (blob === null) {
              return Promise.resolve(null);
          }
          return new File([blob], file.name, {
              type: blob.type
          });
      }
      redispatchEvent(event, target) {
          target.disabled = false;
          try {
              target.dispatchEvent(event);
          }
          catch (e) {
          }
          this.processedEvent = false;
      }
      async processImages(event, target) {
          if (typeof target.files === 'undefined') {
              this.redispatchEvent(event, target);
              return;
          }
          const files = target.files;
          if (files === null || files.length === 0) {
              this.redispatchEvent(event, target);
              return;
          }
          this.timeoutId = Number(globalThis.setTimeout(this.enableBusyIndicator.bind(this), 1000));
          const allowedImagesType = [
              'image/jpeg',
              'image/png',
              'image/webp'
          ];
          const customElement = (element) => {
              return element === event.target;
          };
          let isCustomInput;
          if (Array.isArray(this.customInputElements)) {
              isCustomInput = this.customInputElements.find(customElement);
              if (typeof isCustomInput === 'undefined') {
                  return;
              }
          }
          const dataTransfer = new DataTransfer();
          const defaultCompressOptions = {
              quality: this.quality,
              type: 'image/jpeg'
          };
          const processFile = async (file) => {
              if (file.type.startsWith('image') === false || allowedImagesType.includes(file.type) === false) {
                  dataTransfer.items.add(file);
                  return;
              }
              const compressOptions = Object.assign(defaultCompressOptions, {
                  type: file.type
              });
              const compressedFile = await this.compressImage(file, compressOptions);
              if (compressedFile instanceof File) {
                  if (compressedFile.size < file.size) {
                      dataTransfer.items.add(compressedFile);
                  }
                  else {
                      dataTransfer.items.add(file);
                  }
              }
          };
          for (let i = 0, totalFiles = files.length; i < totalFiles; i += 1) {
              await processFile(files[i]);
          }
          event.target.files = dataTransfer.files;
          this.disableBusyIndicator();
          if (typeof this.onCompressionDoneCallback === 'function') {
              this.onCompressionDoneCallback(files, dataTransfer.files);
          }
          this.redispatchEvent(event, target);
      }
      handleChangeEvent(event) {
          const target = event.target;
          if (this.processedEvent || target === null) {
              return;
          }
          if (event.type !== 'change') {
              return;
          }
          if (target.nodeName.toLowerCase() === 'input' && target.type !== 'file') {
              return;
          }
          if (event.eventPhase === 1) {
              this.processedEvent = true;
          }
          event.stopPropagation();
          target.disabled = true;
          this.processImages(event, target);
      }
      addImageOptimization(cssQuerySelector) {
          if (typeof cssQuerySelector !== 'string') {
              return;
          }
          this.customInputElements = Array.from(document.querySelectorAll(cssQuerySelector));
      }
      uninstall() {
          this.onCompressionDoneCallback = undefined;
          if (this.inputTypeFileHandlerReference === null) {
              return;
          }
          document.removeEventListener('change', this.inputTypeFileHandlerReference);
      }
      install(cssQuerySelector, onCompressionDoneCallback, quality = 0.75) {
          this.inputTypeFileHandlerReference = this.handleChangeEvent.bind(this);
          this.quality = quality;
          this.onCompressionDoneCallback = onCompressionDoneCallback;
          const addEventListenerOptions = {
              capture: true
          };
          document.addEventListener('change', this.inputTypeFileHandlerReference, addEventListenerOptions);
          this.createCSS();
          if (typeof cssQuerySelector === 'string') {
              this.addImageOptimization(cssQuerySelector);
          }
      }
  }

  exports.OptimizeImage = OptimizeImage;

}));
