
/**
 * This is a function to find a html element with the specific type and specific (no difference or shorts) 
 * inline text.
 * 
 * @param htmlElement The type of the html element like a or div.
 * @param textPlacement Differs between the differen different places of the inline text. textContent is the inline varian.
 * @param textContent The inline text of the html element.
 * @returns The first dom element which was found.
 */
export const findInDom = (htmlElement: string, textPlacement: 'href' | 'textContent' | 'name' | 'value', textContent: string): HTMLInputElement => {
    const doc = document.querySelectorAll(htmlElement);
    const matches = Array.prototype.slice.call(doc);
    const filterElements = (element: HTMLInputElement & HTMLHyperlinkElementUtils) => {
        return element[textPlacement] === textContent;
    }

    return matches.filter(filterElements)[0];
}


