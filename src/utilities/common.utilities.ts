export class CommonUtilities {
  public static isHtmlElement(el: HTMLElement | Element | Node | null): boolean {
    if (el === null) {
      return false;
    }

    try {
      return el instanceof Element || el instanceof Document;
    } catch (t) {
      return (
        typeof el === 'object' &&
        el.nodeType === Node.ELEMENT_NODE &&
        typeof (el as any).style === 'object' &&
        typeof el.ownerDocument === 'object'
      );
    }
  }

  public static getComputedStyle(element: Element, pseudoElt?: string): CSSStyleDeclaration | null {
    if (CommonUtilities.isHtmlElement(element)) {
      return document && document.defaultView && document.defaultView.getComputedStyle(element, pseudoElt || null);
    }

    return null;
  }

  public static createCSS(content: string, id?: string, media?: string): void {
    if (content === null) {
      throw new Error(`[CommonUtilities.createCSS] passed content is not a string. Is type ${typeof content}`);
    }

    const head: HTMLHeadElement = document.head;
    const style: HTMLStyleElement = document.createElement('style');

    if (typeof id === 'string') {
      style.id = id;
    }

    if (typeof media === 'string' && media.length > 0) {
      style.setAttribute('media', media);
    }

    if (typeof style['styleSheet' as keyof typeof style] === 'object') {
      (style['styleSheet' as keyof typeof style] as unknown as CSSRule).cssText = content;
    } else {
      style.appendChild(document.createTextNode(content));
    }

    head.appendChild(style);
  }
}
