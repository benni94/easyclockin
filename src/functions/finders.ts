export interface FinderArgs {
    /**
     * The iframe name, if the seccond page is wrapped in one.
     */
    htmlIframe?: string;
    /**
     * The type of the html element like a or div.
     */
    htmlElement: keyof HTMLElementTagNameMap;
    /**
     * The function which should be executed.
     */
    func: 'click' | 'value';
    /**
     * The inline text of the html element.
     */
    textContent: string;
    /**
     * Differs between the differen places of the inline text. textContent is the inline variant.
     */
    textPlacement: keyof HTMLInputElement;
    /**
     * The value is used to replace the inline textContent with the given value.
     */
    value?: string;
}

/**
 * This is a function to find a html element with the specific type and specific (no difference or shorts) 
 * inline text.
 */
export const findAndExecuteInDom = (args: FinderArgs[]) => {
    const doc = args[0].htmlIframe?.length ?
        (window as any).frames[args[0].htmlIframe].document.querySelectorAll(args[0].htmlElement) :
        document.querySelectorAll(args[0].htmlElement);

    const matches = Array.prototype.slice.call(doc);

    args.forEach(arg => {
        const filterElements = (element: HTMLInputElement) => {
            return element[arg.textPlacement]?.toString().includes(arg.textContent);
        }
        if (arg.func === "value") {
            matches.filter(filterElements)[0][arg.func] = arg.value;
        }
        if (arg.func === "click") {
            matches.filter(filterElements)[0].click();
        }

        //arg.htmlIframe?.length ? (window as any).frames[arg.htmlIframe || ''].document.querySelectorAll(arg.htmlElement) :

    })
    // necessary for the next step in chrome scripts if needed
    return true;
}