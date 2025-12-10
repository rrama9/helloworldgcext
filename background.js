// background.js (service worker)
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
  // set default color if not present
  chrome.storage.sync.get(["bgColor"], (res) => {
    if (!res.bgColor) chrome.storage.sync.set({ bgColor: "#ffeaa7" });
  });
});
