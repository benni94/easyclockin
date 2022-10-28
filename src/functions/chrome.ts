import { ClockInTypes } from './../popup/popup';
import { FormValues } from "../popup/popup";

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

export function startClocking(clockIn: ClockInTypes, data: FormValues, password: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: (data: FormValues, password: string) => {
        if (window.document.URL === data.linkToPage) {

          const findInDom = (htmlElement: string, textPlacement: 'href' | 'textContent' | 'name' | 'value', textContent: string): HTMLInputElement => {
            const doc = document.querySelectorAll(htmlElement);
            const matches = Array.prototype.slice.call(doc);
            const filterElements = (element: HTMLInputElement & HTMLHyperlinkElementUtils) => {
              return element[textPlacement] === textContent;
            }
            return matches.filter(filterElements)[0];
          }

          findInDom('input', 'name', data.htmlUsername).value = data.username;
          findInDom('input', 'name', data.htmlPassword).value = password;
          findInDom('input', 'value', data.htmlButton).click();

          /*  const usernameHtml = document.getElementsByName(data.htmlUsername)[0] as HTMLInputElement;
           usernameHtml.value = data.username;
 
           const passwordHtml = document.getElementsByName(data.htmlPassword)[0] as HTMLInputElement;
           passwordHtml.value = password;
 
           document.querySelectorAll(`input[type=${data.htmlButton}]`).forEach(el => { const button = el as HTMLElement; button.click(); }); */
          return true;
        }
        return false;
      },
      args: [data, password],
    })
      .then(results => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab,) => {
          if (changeInfo.status === 'complete') {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id || 0 },
              func: (data: FormValues, clockIn: ClockInTypes) => {

                const findInDom = (htmlElement: string, textPlacement: 'href' | 'textContent' | 'name' | 'value', textContent: string): HTMLInputElement => {
                  const doc = document.querySelectorAll(htmlElement);
                  const matches = Array.prototype.slice.call(doc);
                  const filterElements = (element: HTMLInputElement & HTMLHyperlinkElementUtils) => {
                    return element[textPlacement] === textContent;
                  }
                  return matches.filter(filterElements)[0];
                }

                if (clockIn !== "login") findInDom('a', 'textContent', clockIn === "clockIn" ? data.clockIn : data.clockOut).click();
              },
              args: [data, clockIn],
            })
            if (results[0].result) {
              window.close();
            }
          }
        })
      });
  });
}
