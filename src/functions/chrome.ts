import { FinderArgs, findAndExecuteInDom } from "./finders";

export function sendMessageToConsole(func: (arg: chrome.tabs.Tab[]) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: func,
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

export function executeClockin(args1: FinderArgs[], args2: FinderArgs[][]) {
  basicFinderScript(args1).then(() => {
    let countComplete = 0;
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') {
        if (countComplete === args2.length) window.close();
        basicFinderScript(args2[countComplete])
          .then(() => {
            countComplete++;
          });
      }
    });
  });
}

const basicFinderScript = async (args: FinderArgs[]) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: findAndExecuteInDom,
      args: [args],
    });
  });
}
