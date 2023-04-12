declare class OptimizeImage {
    private inputTypeFileHandlerReference;
    private customInputElements;
    private onCompressionDoneCallback;
    private originalCursor;
    constructor();
    private createCSS;
    private enableBusyIndicator;
    private disableBusyIndicator;
    private compressImage;
    private processImages;
    private handleChangeEvent;
    addImageOptimization(cssQuerySelector: string): void;
    uninstall(): void;
    install(cssQuerySelector?: string | undefined, onCompressionDoneCallback?: Function): void;
}

export { OptimizeImage };
