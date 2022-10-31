export interface FinderArgs {
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
    args.forEach(arg => {
        const doc = document.querySelectorAll(arg.htmlElement);
        const matches = Array.prototype.slice.call(doc);
        const filterElements = (element: HTMLInputElement) => {
            return element[arg.textPlacement] === arg.textContent;
        }
        if (arg.func === "value") {
            matches.filter(filterElements)[0][arg.func] = arg.value;
        }
        if (arg.func === "click") {
            matches.filter(filterElements)[0].click();
        }
    })
    // necessary for the next step in chrome scripts if needed
    return true;
}


