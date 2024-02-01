declare class OptimizeImage {
    private inputTypeFileHandlerReference;
    private customInputElements;
    private onCompressionDoneCallback;
    private originalCursor;
    private timeoutId;
    private processedEvent;
    private busyElementId;
    quality: number;
    constructor();
    private createCSS;
    private enableBusyIndicator;
    private disableBusyIndicator;
    private compressImage;
    private redispatchEvent;
    private processImages;
    private handleChangeEvent;
    addImageOptimization(cssQuerySelector: string): void;
    uninstall(): void;
    install(cssQuerySelector?: string | undefined, onCompressionDoneCallback?: Function, quality?: number): void;
}

export { OptimizeImage };
