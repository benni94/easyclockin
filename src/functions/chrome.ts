import { IStartColockinArgs } from "../popup/popup.types";
import { FinderArgs } from "./finders";

export function sendMessageToConsole(fun: (arg: chrome.tabs.Tab[]) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: fun,
      args: [tabs],
    });
  });
}

export function navigateToUrl(url: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      args: [url],
      func: (url: string) => {
        window.open(url, '_blank');
      },
    });
  });
}

export async function getCurrentUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url
}

export function startClocking(args: IStartColockinArgs) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: (args: IStartColockinArgs) => {
        if (window.document.URL === args.data.linkToPage) {

          const findInDom = (args: FinderArgs[]) => {
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

          findInDom(
            [
              { func: "value", htmlElement: "input", textContent: args.data.htmlUsername, textPlacement: "name", value: args.data.username },
              { func: "value", htmlElement: "input", textContent: args.data.htmlPassword, textPlacement: "name", value: args.password },
              { func: "click", htmlElement: "input", textContent: args.data.htmlButton, textPlacement: "value", value: args.data.htmlButton }
            ]
          );

          return true;
        }
        return false;
      },
      args: [args],
    })
      .then(results => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab,) => {
          if (changeInfo.status === 'complete') {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id || 0 },
              func: (args: IStartColockinArgs) => {

                const findInDom = (args: FinderArgs[]) => {
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

                findInDom(
                  [
                    { func: "click", htmlElement: "a", textContent: args.clockIn === "clockIn" ? args.data.clockIn : args.data.clockOut, textPlacement: "textContent" },
                  ]
                );

              },
              args: [args],
            })
            if (results[0].result) {
              window.close();
            }
          }
        })
      });
  });
}
