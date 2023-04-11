import { ICanvasCompressOptions } from './interfaces/optimize-image-on-the-client-side.interfaces';
import { CommonUtilities } from './utilities/common.utilities';

export class OptimizeImage {
  private inputTypeFileHandlerReference: ((event: Event) => void) | null;
  private customInputElements: Element[] | null;
  private onCompressionDoneCallback: Function | undefined;

  constructor() {
    this.inputTypeFileHandlerReference = null;
    this.customInputElements = null;
    this.onCompressionDoneCallback = undefined;
  }

  private async compressImage(file: File, { quality = 1, type = file.type }): Promise<File | null> {
    const imageBitmap: ImageBitmap = await createImageBitmap(file);
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (context === null) {
      return Promise.resolve(null);
    }

    context.drawImage(imageBitmap, 0, 0);

    const blob: Blob | null = await new Promise((resolve: BlobCallback): void => {
      return canvas.toBlob(resolve, type, quality);
    });

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

    const originalCursor: string | undefined = CommonUtilities.getComputedStyle(document.body)?.getPropertyValue('cursor');

    document.body.style.cursor = 'progress';

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

    if (typeof originalCursor === 'string') {
      document.body.style.cursor = originalCursor;
    }

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

  public install(cssQuerySelector: string | undefined, onCompressionDoneCallback?: Function): void {
    this.inputTypeFileHandlerReference = this.handleChangeEvent.bind(this);

    this.onCompressionDoneCallback = onCompressionDoneCallback;

    document.addEventListener('change', this.inputTypeFileHandlerReference);

    if (typeof cssQuerySelector === 'string') {
      this.addImageOptimization(cssQuerySelector);
    }
  }
}
