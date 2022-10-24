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

export function startClocking(data: FormValues, clockIn: boolean, password: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: (data: FormValues, password: string) => {
        if (window.document.URL === data.linkToPage) {

          const usernameHtml = document.getElementsByName(data.htmlUsername)[0] as HTMLInputElement;
          usernameHtml.value = data.username;

          const passwordHtml = document.getElementsByName(data.htmlPassword)[0] as HTMLInputElement;
          passwordHtml.value = password;

          document.querySelectorAll(`input[type=${data.htmlButton}]`).forEach(el => { const button = el as HTMLElement; button.click(); });
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
              func: (data: FormValues, clockIn: boolean) => {
                const items = document.body.getElementsByTagName("a");

                for (let i = 0; i < items.length; ++i) {
                  if (items[i].textContent?.includes(clockIn ? data.clockIn : data.clockOut)) {
                    items[i].click();
                  }
                }
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
