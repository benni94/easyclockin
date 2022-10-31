import { FinderArgs, findAndExecuteInDom } from "./finders";

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
  chrome.tabs.create({ url });
}

export async function getCurrentUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url
}

export function executeClockin(args1: FinderArgs[], args2?: FinderArgs[]) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: findAndExecuteInDom,
      args: [args1],
    })
      .then(results => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab,) => {
          // if the findInDom from args1 returns true, the second script could be executed
          if (changeInfo.status === 'complete' && args2) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id || 0 },
              func: findAndExecuteInDom,
              args: [args2],
            })
            if (results[0].result) {
              window.close();
            }
          }
        })
      })
  });
}
