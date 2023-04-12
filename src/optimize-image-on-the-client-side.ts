import { ICanvasCompressOptions } from './interfaces/optimize-image-on-the-client-side.interfaces';
import { CommonUtilities } from './utilities/common.utilities';

export class OptimizeImage {
  private inputTypeFileHandlerReference: ((event: Event) => void) | null;
  private customInputElements: Element[] | null;
  private onCompressionDoneCallback: Function | undefined;
  private originalCursor: string | undefined;

  constructor() {
    this.inputTypeFileHandlerReference = null;
    this.customInputElements = null;
    this.onCompressionDoneCallback = undefined;
    this.originalCursor = undefined;
  }

  private createCSS(): void {
    const css: string = `.sl-busy-indicator {
      background-image: url("data:image/gif;base64,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");
      background-repeat: no-repeat;
      background-position: 100% 50%;
      background-size: 1.5rem 1.5rem;
    }`;

    CommonUtilities.createCSS(css);
  }

  private enableBusyIndicator(inputElement: HTMLElement): void {
    this.originalCursor = CommonUtilities.getComputedStyle(document.body)?.getPropertyValue('cursor');

    document.body.style.cursor = 'progress';
    inputElement.classList.add('sl-busy-indicator');
  }

  private disableBusyIndicator(inputElement: HTMLElement): void {
    if (typeof this.originalCursor === 'string') {
      document.body.style.cursor = this.originalCursor;
    }

    inputElement.classList.remove('sl-busy-indicator');
  }

  private async compressImage(file: File, { quality = 1, type = file.type }): Promise<File | null> {
    let imageBitmap: ImageBitmap;

    try {
      imageBitmap = await createImageBitmap(file);
    } catch (e) {
      return Promise.resolve(null);
    }

    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (context === null) {
      return Promise.resolve(null);
    }

    context.drawImage(imageBitmap, 0, 0);

    let blob: Blob | null;

    try {
      blob = await new Promise((resolve: BlobCallback): void => {
        return canvas.toBlob(resolve, type, quality);
      });
    } catch (e) {
      return Promise.resolve(null);
    }

    if (blob === null) {
      return Promise.resolve(null);
    }

    return new File([blob], file.name, {
      type: blob.type
    });
  }

  private async processImages(event: Event): Promise<void> {
    const target: HTMLInputElement | null = (event.target as HTMLInputElement | null);

    if (target === null) {
      return;
    }

    const files: FileList | null = target.files;

    if (files === null || files.length === 0) {
      return;
    }

    this.enableBusyIndicator(target);

    const allowedImagesType: string[] = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    const customElement = (element: Element): boolean => {
      return element === event.target;
    };

    let isCustomInput: Element | undefined;

    if (Array.isArray(this.customInputElements)) {
      isCustomInput = this.customInputElements.find(customElement);

      if (typeof isCustomInput === 'undefined') {
        return;
      }
    }

    const dataTransfer: DataTransfer = new DataTransfer();
    const defaultCompressOptions: ICanvasCompressOptions = {
      quality: 0.5,
      type: 'image/jpeg'
    };

    for (const file of files) {
      if (allowedImagesType.includes(file.type) === false) {
        continue;
      }

      if (file.type.startsWith('image') === false) {
        dataTransfer.items.add(file);
        continue;
      }

      const compressOptions: ICanvasCompressOptions = Object.assign(defaultCompressOptions, {
        type: file.type
      });

      const compressedFile: File | null = await this.compressImage(file, compressOptions);

      if (compressedFile instanceof File) {
        if (compressedFile.size < file.size) {
          dataTransfer.items.add(compressedFile);
        } else {
          dataTransfer.items.add(file);
        }
      }
    }

    (event.target as HTMLInputElement).files = dataTransfer.files;

    this.disableBusyIndicator(target);

    if (typeof this.onCompressionDoneCallback === 'function') {
      this.onCompressionDoneCallback(files, dataTransfer.files);
    }
  }

  private handleChangeEvent(event: Event): void {
    const target: HTMLInputElement | null = event.target as HTMLInputElement;

    if (target.nodeName.toLowerCase() !== 'input' && target.type === 'file' && event.type !== 'change') {
      return;
    }

    this.processImages(event);
  }

  public addImageOptimization(cssQuerySelector: string): void {
    if (typeof cssQuerySelector !== 'string') {
      return;
    }

    this.customInputElements = Array.from(document.querySelectorAll(cssQuerySelector));
  }

  public uninstall(): void {
    if (this.inputTypeFileHandlerReference === null) {
      return;
    }

    document.removeEventListener('change', this.inputTypeFileHandlerReference);
  }

  public install(cssQuerySelector?: string | undefined, onCompressionDoneCallback?: Function): void {
    this.inputTypeFileHandlerReference = this.handleChangeEvent.bind(this);

    this.onCompressionDoneCallback = onCompressionDoneCallback;

    const addEventListenerOptions: AddEventListenerOptions = {
      capture: true
    };

    document.addEventListener('change', this.inputTypeFileHandlerReference, addEventListenerOptions);

    this.createCSS();

    if (typeof cssQuerySelector === 'string') {
      this.addImageOptimization(cssQuerySelector);
    }
  }
}
