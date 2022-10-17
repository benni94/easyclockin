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

export function startLogin(data: FormValues) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: (data: FormValues) => {
        if (window.document.URL === data.linkToPage) {
          let username = document.getElementsByName(data.htmlUsername)[0] as HTMLInputElement;
          username.value = data.username;

          let password = document.getElementsByName(data.htmlPassword)[0] as HTMLInputElement;
          password.value = data.password;

          document.querySelectorAll(`input[type=${data.htmlButton}]`).forEach(el => { const button = el as HTMLElement; button.click(); });
          return true;
        }
        return false;
      },
      args: [data],
    }).then(results => {
      if (results[0].result) {
        window.close();
      }
    });
  });
}
