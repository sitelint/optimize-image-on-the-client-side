export declare class CommonUtilities {
    static isHtmlElement(el: HTMLElement | Element | Node | null): boolean;
    static getComputedStyle(element: Element, pseudoElt?: string): CSSStyleDeclaration | null;
    static createCSS(content: string, id?: string, media?: string): void;
}
