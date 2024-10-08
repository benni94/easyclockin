type ISavings =
  | "checkbox"
  | "clocker"
  | "password"
  | "username"
  | "url"
  | "slider";

const chromeLocalStorageItemUsername: ISavings = "username";
const chromeLocalStorageUrl: ISavings = "url";
const chromeLocalStorageItemPassword: ISavings = "password";

export const username = () => {
  const toLocalStorage = (username: string) => {
    if (!username || username === "") {
      const dataFromLocalStorrage = getDataFromLocalStorage();
      if (dataFromLocalStorrage === undefined) {
        return localStorage.setItem(
          chromeLocalStorageItemUsername,
          JSON.stringify(username)
        );
      }
      return localStorage.setItem(
        chromeLocalStorageItemUsername,
        JSON.stringify(username)
      );
    }
    return localStorage.setItem(
      chromeLocalStorageItemUsername,
      JSON.stringify(username)
    );
  };

  const removeFromLocalStorage = () => {
    localStorage.clear();
  };

  const getDataFromLocalStorage: () => string = () => {
    const items = localStorage.getItem(chromeLocalStorageItemUsername);
    if (!items) return "";
    return JSON.parse(items);
  };

  return { getDataFromLocalStorage, removeFromLocalStorage, toLocalStorage };
};

export const url = () => {
  const toLocalStorage = (url: string) => {
    if (!url || url === "") {
      const dataFromLocalStorrage = getDataFromLocalStorage();
      if (dataFromLocalStorrage === undefined) {
        return localStorage.setItem(chromeLocalStorageUrl, JSON.stringify(url));
      }
      return localStorage.setItem(chromeLocalStorageUrl, JSON.stringify(url));
    }
    return localStorage.setItem(chromeLocalStorageUrl, JSON.stringify(url));
  };

  const removeFromLocalStorage = () => {
    localStorage.clear();
  };

  const getDataFromLocalStorage: () => string = () => {
    const items = localStorage.getItem(chromeLocalStorageUrl);
    if (!items) return "";
    return JSON.parse(items);
  };

  return { getDataFromLocalStorage, removeFromLocalStorage, toLocalStorage };
};

export const password = () => {
  const toLocalStorage = (password: string) => {
    console.log("password", password);
    if (!password || password === "") {
      const dataFromLocalStorrage = getDataFromLocalStorage();
      if (dataFromLocalStorrage === undefined) {
        return localStorage.setItem(
          chromeLocalStorageItemUsername,
          JSON.stringify(password)
        );
      }
      return localStorage.setItem(
        chromeLocalStorageItemPassword,
        JSON.stringify(password)
      );
    }
    return localStorage.setItem(
      chromeLocalStorageItemPassword,
      JSON.stringify(password)
    );
  };

  const removeFromLocalStorage = () => {
    localStorage.clear();
  };

  const getDataFromLocalStorage: () => string = () => {
    const items = localStorage.getItem(chromeLocalStorageItemPassword);
    if (!items) return "";
    return JSON.parse(items);
  };

  return { getDataFromLocalStorage, removeFromLocalStorage, toLocalStorage };
};

export const clockerSavings = (
  storrageItem: ISavings,
  fallbackReturn: string | boolean
) => {
  const toLocalStorage = (data: string | boolean) => {
    return localStorage.setItem(storrageItem, JSON.stringify(data));
  };

  const getDataFromLocalStorage = () => {
    const items = localStorage.getItem(storrageItem);
    if (typeof fallbackReturn === "string") {
      if (!items) return fallbackReturn;
      return JSON.parse(items);
    }
    return JSON.parse(items || "false");
  };

  return { toLocalStorage, getDataFromLocalStorage };
};
