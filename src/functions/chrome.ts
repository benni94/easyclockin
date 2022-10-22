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

export function startLogin(data: FormValues, clockIn: boolean) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: (data: FormValues) => {
        if (window.document.URL === data.linkToPage) {

          const username = document.getElementsByName(data.htmlUsername)[0] as HTMLInputElement;
          username.value = data.username;

          const password = document.getElementsByName(data.htmlPassword)[0] as HTMLInputElement;
          password.value = data.password;

          document.querySelectorAll(`input[type=${data.htmlButton}]`).forEach(el => { const button = el as HTMLElement; button.click(); });
          return true;
        }
        return false;
      },
      args: [data],
    }).then(results => {

      setTimeout(() => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id || 0 },
          func: (data: FormValues, clockIn: boolean) => {
            const items = document.body.getElementsByTagName("a");
            if (clockIn) {
              for (let i = 0; i < items.length; ++i) {
                if (items[i].textContent === data.clockIn) {
                  items[i].click();
                }
              }
            } else {
              for (let i = 0; i < items.length; ++i) {
                if (items[i].textContent === data.clockOut) {
                  items[i].click();
                }
              }
            }
          },
          args: [data, clockIn],
        })
        if (results[0].result) {
          window.close();
        }
      }, 2000);
    });
  });
}
