// content.js
// Listens for messages from popup or background to change page background.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHANGE_BG") {
    document.documentElement.style.transition = "background-color 0.3s ease";
    document.documentElement.style.backgroundColor = message.color;
    sendResponse({ status: "done" });
  }
});
