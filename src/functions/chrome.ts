import { FinderArgs, findAndExecuteInDom } from "./finders";

const closeWindow = (results: chrome.scripting.InjectionResult[], exec = true) => {
  if (results[0].result && exec) {
    window.close();
  }
}

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



export function executeClockin(args1: FinderArgs[], args2: FinderArgs[], args3?: FinderArgs[]) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: findAndExecuteInDom,
      args: [args1],
    })
      .then(() => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
          if (changeInfo.status === 'complete') {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id || 0 },
              func: findAndExecuteInDom,
              args: [args2],
            }).then(() => {
              chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
                if (!args3?.length) window.close();
                if (changeInfo.status === 'complete') {
                  chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id || 0 },
                    func: findAndExecuteInDom,
                    args: [args3],
                  }).then(() => {
                    window.close();
                  })
                }
              })
            })
          }
        })
      })
  });
}
