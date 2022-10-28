
export interface FinderArgs {
    /**
     * The type of the html element like a or div.
     */
    htmlElement: string;
    /**
     * The function which should be executed.
     */
    func: 'click' | 'value';
    /**
     * The inline text of the html element.
     */
    textContent: string;
    /**
     * Differs between the differen different places of the inline text. textContent is the inline varian.
     */
    textPlacement: 'href' | 'textContent' | 'name' | 'value';
    /**
     * The value which can be set in the specific element.
     */
    value?: string;
}

export type Finder = (args: FinderArgs[]) => void;


/**
 * This is a function to find a html element with the specific type and specific (no difference or shorts) 
 * inline text.
 */
export const findInDom = (args: FinderArgs[]) => {
    args.forEach(arg => {
        const doc = document.querySelectorAll(arg.htmlElement);
        const matches = Array.prototype.slice.call(doc);
        const filterElements = (element: HTMLInputElement & HTMLHyperlinkElementUtils) => {
            return element[arg.textPlacement] === arg.textContent;
        }
        if (arg.func === "value") {
            matches.filter(filterElements)[0][arg.func] = arg.value;
        }
        if (arg.func === "click") {
            matches.filter(filterElements)[0].click();
        }
    })
}

