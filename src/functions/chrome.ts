import { findAndExecuteInDom, FinderArgs } from "./renderFinder";
import { clockerSavings } from "./savingData";

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
  chrome.tabs.create({ active: true, url });
}

export async function getCurrentUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url
}

/**
 * This function executes the args1 first. If the page loading state is 'complete',
 * it starts with the first argument in args2.
 * After the first arg in args2 is executed and the page loading state is complete it takes a look in the next arg from args2.
 * 
 * If all args from args2 are done, the closeWindow() will be executed. 
 */
export function executeClockin(args1: FinderArgs[], args2: FinderArgs[][]) {
  basicFinderScript(args1).then(() => {
    let countComplete = 0;
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') {
        if (countComplete === args2.length) { closeWindow(); return; }
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

/**
 * This function closes the window or the current page if 
 * the checkbox argument from the chrome storrage is true.
 */
function closeWindow() {
  if (clockerSavings("checkbox", false).getDataFromLocalStorage()) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setTimeout(() => {
        chrome.tabs.remove(tabs[0].id || 0);
      }, clockerSavings("slider", "").getDataFromLocalStorage() * 1000);
    });
  } else {
    window.close();
  }
}