import { debounce } from "@mui/material";

function sendMessageToConsole(fun: (arg: chrome.tabs.Tab[]) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: fun,
      args: [tabs],
    });
  });
}

function navigateToUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: (tabs: chrome.tabs.Tab[]) => {
        console.log("te", tabs[0].url);

        let hh = document.getElementsByName("uname")[0] as HTMLInputElement;
        hh.value = "test";

        let ha = document.getElementsByName("pass")[0] as HTMLInputElement;
        ha.value = "test";

        document.getElementsByTagName("input")[2].click();
      },
      args: [tabs],
    });
  });
}

function getDomElementOnMouseOver() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id || 0 },
      func: () => {
        /*  window.onclick = (e: any) => {
          console.log("clicked");
          console.log(e.target.innerText);
        }; */
        /*  window.open(
          "popup.html",
          "extension_popup",
          "width=300,height=400,status=no,scrollbars=yes,resizable=no"
        ); */
        /*  chrome.windows.create({
          url: chrome.runtime.getURL("index.html#window"),
          type: "popup",
        }); */

        window.open(
          "index.html",
          "default_popup",
          "width=300,height=400,status=no,scrollbars=yes,resizable=no"
        );
      },
    });
  });
}

export { getDomElementOnMouseOver, navigateToUrl, sendMessageToConsole };
