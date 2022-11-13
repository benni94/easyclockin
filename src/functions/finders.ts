export interface FinderArgs {
    /**
     * Disable the finder function and return instantly true.
     */
    disabled?: boolean;
    /**
     * The function which should be executed.
     */
    func: 'click' | 'select' | 'value';
    /**
     * The type of the html element like a or div.
     */
    htmlElement: keyof HTMLElementTagNameMap;
    /**
     * The iframe name, if the seccond page is wrapped in one.
     */
    htmlIframe?: string;
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
export const findAndExecuteInDom = (args: FinderArgs[] | undefined) => {
    if (!args || args[0].disabled) return true;
    args.forEach((arg, i) => {
        // if the document elements are in an iFrame, the name of the iFrames is used to find it and then search in it for the document elements
        let doc = arg.htmlIframe?.length ?
            (window as any).frames[arg.htmlIframe].document.querySelectorAll(arg.htmlElement) :
            document.querySelectorAll(arg.htmlElement);

        let matches = Array.prototype.slice.call(doc);

        const filterElements = (element: HTMLInputElement) => {
            return element[arg.textPlacement]?.toString().includes(arg.textContent);
        }

        if (arg.func === "value") {
            matches.filter(filterElements)[0][arg.func] = arg.value;
            if (i === args.length) return true;
        }
        if (arg.func === "click") {
            setTimeout(() => {
                matches.filter(filterElements)[0].click();
            }, 200);
        }
        if (arg.func === "select") {
            setTimeout(() => {
                matches.filter(filterElements)[0].selectedIndex = arg.value;
            }, 200);
        }
    })
    return true;
    // necessary for the next step in chrome scripts if needed
}