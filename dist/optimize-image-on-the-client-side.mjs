class OptimizeImage{constructor(){this.inputTypeFileHandlerReference=null,this.customInputElements=null,this.onCompressionDoneCallback=void 0}async compressImage(e,{quality:t=1,type:n=e.type}){const i=await createImageBitmap(e),s=document.createElement("canvas");s.width=i.width,s.height=i.height;const a=s.getContext("2d");if(null===a)return Promise.resolve(null);a.drawImage(i,0,0);const o=await new Promise((e=>s.toBlob(e,n,t)));return null===o?Promise.resolve(null):new File([o],e.name,{type:o.type})}async processImages(e){const t=e.target;if(null===t)return;const n=t.files;if(null===n||0===n.length)return;const i=["image/jpeg","image/png","image/webp"],s=t=>t===e.target;let a;if(Array.isArray(this.customInputElements)&&(a=this.customInputElements.find(s),void 0===a))return;const o=new DataTransfer,l={quality:.5,type:"image/jpeg"};for(const e of n){if(!1===i.includes(e.type))continue;if(!1===e.type.startsWith("image")){o.items.add(e);continue}const t=Object.assign(l,{type:e.type}),n=await this.compressImage(e,t);n instanceof File&&o.items.add(n)}e.target.files=o.files,"function"==typeof this.onCompressionDoneCallback&&this.onCompressionDoneCallback(n,o.files)}handleChangeEvent(e){const t=e.target;"input"!==t.nodeName.toLowerCase()&&"file"===t.type&&"change"!==e.type||this.processImages(e)}addImageOptimization(e){"string"==typeof e&&(this.customInputElements=Array.from(document.querySelectorAll(e)))}uninstall(){null!==this.inputTypeFileHandlerReference&&document.removeEventListener("change",this.inputTypeFileHandlerReference)}install(e,t){this.inputTypeFileHandlerReference=this.handleChangeEvent.bind(this),this.onCompressionDoneCallback=t,document.addEventListener("change",this.inputTypeFileHandlerReference),"string"==typeof e&&this.addImageOptimization(e)}}export{OptimizeImage};
