!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).sitelint={})}(this,(function(e){"use strict";!function(e){function t(){var t=this||self;t.globalThis=t,delete e.prototype._T_}"object"!=typeof globalThis&&(this?t():(e.defineProperty(e.prototype,"_T_",{configurable:!0,get:t}),_T_))}(Object);class t{static isHtmlElement(e){if(null===e)return!1;try{return e instanceof Element||e instanceof Document}catch(t){return"object"==typeof e&&e.nodeType===Node.ELEMENT_NODE&&"object"==typeof e.style&&"object"==typeof e.ownerDocument}}static getComputedStyle(e,A){return t.isHtmlElement(e)?document&&document.defaultView&&document.defaultView.getComputedStyle(e,A||null):null}static createCSS(e,t,A){if(null===e)throw new Error("[CommonUtilities.createCSS] passed content is not a string. Is type "+typeof e);const i=document.head,n=document.createElement("style");"string"==typeof t&&(n.id=t),"string"==typeof A&&A.length>0&&n.setAttribute("media",A),"object"==typeof n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e)),i.appendChild(n)}}e.OptimizeImage=class{constructor(){this.inputTypeFileHandlerReference=null,this.customInputElements=null,this.onCompressionDoneCallback=void 0,this.originalCursor=void 0,this.timeoutId=void 0,this.processedEvent=!1,this.busyElementId="sl_busy_indicator",this.quality=.75}createCSS(){t.createCSS('\n    .sl-busy-indicator {\n      display: flex;\n      justify-content: center;\n      position: fixed;\n      top: 4px;\n      width: 100%;\n    }\n\n    .sl-busy-indicator span {\n      background-image: url("data:image/gif;base64,R0lGODlhHwAfAPUAAP///wAAAOjo6NLS0ry8vK6urqKiotzc3Li4uJqamuTk5NjY2KqqqqCgoLCwsMzMzPb29qioqNTU1Obm5jY2NiYmJlBQUMTExHBwcJKSklZWVvr6+mhoaEZGRsbGxvj4+EhISDIyMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEgUDAgFA4BiwSQexKh0eEAkrldAZbvlOD5TqYKALWu5XIwnPFwwymY0GsRgAxrwuJwbCi8aAHlYZ3sVdwtRCm8JgVgODwoQAAIXGRpojQwKRGSDCRESYRsGHYZlBFR5AJt2a3kHQlZlERN2QxMRcAiTeaG2QxJ5RnAOv1EOcEdwUMZDD3BIcKzNq3BJcJLUABBwStrNBtjf3GUGBdLfCtadWMzUz6cDxN/IZQMCvdTBcAIAsli0jOHSJeSAqmlhNr0awo7RJ19TJORqdAXVEEVZyjyKtE3Bg3oZE2iK8oeiKkFZGiCaggelSTiA2LhxiZLBSjZjBL2siNBOFQ84LxHA+mYEiRJzBO7ZCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82YAIQxRCm14Ww4PChAAEAoPDlsAFRUgHkRiZAkREmoSEXiVlRgfQgeBaXRpo6MOQlZbERN0Qx4drRUcAAJmnrVDBrkVDwNjr8BDGxq5Z2MPyUQZuRgFY6rRABe5FgZjjdm8uRTh2d5b4NkQY0zX5QpjTc/lD2NOx+WSW0++2RJmUGJhmZVsQqgtCE6lqpXGjBchmt50+hQKEAEiht5gUcTIESR9GhlgE9IH0BiTkxrMmWIHDkose9SwcQlHDsOIk9ygiVbl5JgMLuV4HUmypMkTOkEAACH5BAkKAAAALAAAAAAfAB8AAAb/QIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3/NmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw+/RA9jSGOkxgpjSWOMxkIQY0rT0wbR2LQV3t4UBcvcF9/eFpdYxdgZ5hUYA73YGxruCbVjt78G7hXFqlhY/fLQwR0HIQdGuUrTz5eQdIc0cfIEwByGD0MKvcGSaFGjR8GyeAPhIUofQGNQSgrB4IsdOCqx7FHDBiYcOQshYjKDxliVDpRjunCjdSTJkiZP6AQBACH5BAkKAAAALAAAAAAfAB8AAAb/QIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3/NmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw+/RA9jSGOkxgpjSWOMxkIQY0rT0wbR2I3WBcvczltNxNzIW0693MFYT7bTumNQqlisv7BjswAHo64egFdQAbj0RtOXDQY6VAAUakihN1gSLaJ1IYOGChgXXqEUpQ9ASRlDYhT0xQ4cACJDhqDD5mRKjCAYuArjBmVKDP9+VRljMyMHDwcfuBlBooSCBQwJiqkJAgAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEgUDAgFA8BQIAwExKh0eEAkrlcA9oo4TKcKwharHScIiu9wwTBn3QnGQg1owBNld+O72N/zZnVzRApteFsODwoQABAKDw5bZQxpQ2JkCRESahIRh1gEVIGVamlmXgBWWxETdEMTnlsIAAJmm65DEmZGYw64UZFbR2MPv0QPY0hjpMYKY0ljjMZCEGNK09MG0diN1gXL3M5bTcTcyFtOvdzBWE+207pjUKpYrL+wY7MAB4EerqZjUAG4lKVCBwMbvnT6dCXUkEIFK0jUkOECFEeQJF2hFKUPAIkgQwIaI+hLiJAoR27Zo4YBCJQgVW4cpMYDBpgVZKL59cEBhw+U+QROQ4bBAoUlTZ7QCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82Z1c0QKbXhbDg8KEAAQCg8OW2UMaUNiZAkREmoSEYdYBFSBlWppZl4AVlsRE3RDE55bCAACZpuuQxJmRmMOuFGRW0djD79ED2NIY6TGCmNJY4zGQhBjStPTFBXb21DY1VsGFtzbF9gAzlsFGOQVGefIW2LtGhvYwVgDD+0V17+6Y6BwaNfBwy9YY2YBcMAPnStTY1B9YMdNiyZOngCFGuIBxDZAiRY1eoTvE6UoDEIAGrNSUoNBUuzAaYlljxo2M+HIeXiJpRsRNMaq+JSFCpsRJEqYOPH2JQgAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfjywjlzX9jdXNEHiAVFX8ODwoQABAKDw5bZQxpQh8YiIhaERJqEhF4WwRDDpubAJdqaWZeAByoFR0edEMTolsIAA+yFUq2QxJmAgmyGhvBRJNbA5qoGcpED2MEFrIX0kMKYwUUslDaj2PA4soGY47iEOQFY6vS3FtNYw/m1KQDYw7mzFhPZj5JGzYGipUtESYowzVmF4ADgOCBCZTgFQAxZBJ4AiXqT6ltbUZhWdToUSR/Ii1FWbDnDkUyDQhJsQPn5ZU9atjUhCPHVhgTNy/RSKsiqKFFbUaQKGHiJNyXIAAh+QQJCgAAACwAAAAAHwAfAAAG/0CAcEh8JDAWCsBQIAwExKhU+HFwKlgsIMHlIg7TqQeTLW+7XYIiPGSAymY0mrFgA0LwuLzbCC/6eVlnewkADXVECgxcAGUaGRdQEAoPDmhnDGtDBJcVHQYbYRIRhWgEQwd7AB52AGt7YAAIchETrUITpGgIAAJ7ErdDEnsCA3IOwUSWaAOcaA/JQ0amBXKa0QpyBQZyENFCEHIG39HcaN7f4WhM1uTZaE1y0N/TacZoyN/LXU+/0cNyoMxCUytYLjm8AKSS46rVKzmxADhjlCACMFGkBiU4NUQRxS4OHijwNqnSJS6ZovzRyJAQo0NhGrgs5bIPmwWLCLHsQsfhxBWTe9QkOzCwC8sv5Ho127akyRM7QQAAOwAAAAAAAAAAAA==");\n      background-repeat: no-repeat;\n      background-position: 100% 50%;\n      background-size: 1.5rem 1.5rem;\n      display: inline-flex;\n      height: 1.5rem;\n      width: 1.5rem;\n    }')}enableBusyIndicator(){const e=t.getComputedStyle(document.body);if(null===e)return;this.originalCursor=e.getPropertyValue("cursor"),document.body.style.cursor="progress";const A=document.createElement("div");A.id=this.busyElementId,A.classList.add("sl-busy-indicator"),A.insertAdjacentHTML("afterbegin","<span></span>"),document.body.appendChild(A)}disableBusyIndicator(){globalThis.clearTimeout(this.timeoutId),"string"==typeof this.originalCursor&&(document.body.style.cursor=this.originalCursor);const e=document.getElementById(this.busyElementId);null==e||e.remove()}async compressImage(e,{quality:t=1,type:A=e.type}){let i;try{i=await globalThis.createImageBitmap(e)}catch(e){return Promise.resolve(null)}const n=document.createElement("canvas");n.width=i.width,n.height=i.height;const s=n.getContext("2d");if(null===s)return Promise.resolve(null);let o;s.drawImage(i,0,0);try{o=await new Promise((e=>{n.toBlob(e,A,t)}))}catch(e){return Promise.resolve(null)}return null===o?Promise.resolve(null):new File([o],e.name,{type:o.type})}redispatchEvent(e,t){var A;t.disabled=!1;const i={bubbles:e.bubbles,cancelable:e.cancelable,composed:e.composed,currentTarget:e.currentTarget,defaultPrevented:e.defaultPrevented,eventPhase:e.eventPhase,isTrusted:e.isTrusted,returnValue:e.returnValue,srcElement:e.srcElement,target:e.target,timeStamp:e.timeStamp,type:e.type};if("undefined"==typeof jQuery){const n=new CustomEvent(e.type,i);null===(A=t.parentNode)||void 0===A||A.dispatchEvent(n)}else{const A=$.Event(e.type,i);$(t).trigger(A)}this.processedEvent=!1}async processImages(e,t){if(void 0===t.files)return void this.redispatchEvent(e,t);const A=t.files;if(null===A||0===A.length)return void this.redispatchEvent(e,t);this.timeoutId=Number(globalThis.setTimeout(this.enableBusyIndicator.bind(this),1e3));const i=["image/jpeg","image/png","image/webp"],n=t=>t===e.target;let s;if(Array.isArray(this.customInputElements)&&(s=this.customInputElements.find(n),void 0===s))return;const o=new DataTransfer,l={quality:this.quality,type:"image/jpeg"},r=async e=>{if(!1===e.type.startsWith("image")||!1===i.includes(e.type))return void o.items.add(e);const t=Object.assign(l,{type:e.type}),A=await this.compressImage(e,t);A instanceof File&&(A.size<e.size?o.items.add(A):o.items.add(e))};for(let e=0,t=A.length;e<t;e+=1)await r(A[e]);e.target.files=o.files,this.disableBusyIndicator(),"function"==typeof this.onCompressionDoneCallback&&this.onCompressionDoneCallback(A,o.files),this.redispatchEvent(e,t)}handleChangeEvent(e){const t=e.target;this.processedEvent||null===t||"change"===e.type&&"input"===t.nodeName.toLowerCase()&&"file"===t.type&&(1===e.eventPhase&&(this.processedEvent=!0),e.stopPropagation(),t.disabled=!0,this.processImages(e,t))}addImageOptimization(e){"string"==typeof e&&(this.customInputElements=Array.from(document.querySelectorAll(e)))}uninstall(){this.onCompressionDoneCallback=void 0,null!==this.inputTypeFileHandlerReference&&document.removeEventListener("change",this.inputTypeFileHandlerReference)}install(e,t,A=.75){this.inputTypeFileHandlerReference=this.handleChangeEvent.bind(this),this.quality=A,this.onCompressionDoneCallback=t;document.addEventListener("change",this.inputTypeFileHandlerReference,{capture:!0}),this.createCSS(),"string"==typeof e&&this.addImageOptimization(e)}}}));
