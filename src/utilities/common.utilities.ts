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
}
