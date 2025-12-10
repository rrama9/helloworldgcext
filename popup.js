// popup.js
const colorPicker = document.getElementById("colorPicker");
const applyBtn = document.getElementById("applyBtn");
const saveBtn = document.getElementById("saveBtn");
const status = document.getElementById("status");

// load saved color
chrome.storage.sync.get(["bgColor"], (res) => {
  colorPicker.value = res.bgColor || "#ffffff";
});

async function sendColorToActiveTab(color) {
  // query active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    status.textContent = "No active tab";
    return;
  }
  // use scripting to send a message to content script
  chrome.tabs.sendMessage(tab.id, { type: "CHANGE_BG", color }, (resp) => {
    if (chrome.runtime.lastError) {
      // content script might not be injected (some pages block content scripts)
      status.textContent = "Couldn't change page (blocked or extension not allowed).";
    } else {
      status.textContent = "Applied!";
      setTimeout(()=> status.textContent = "", 1200);
    }
  });
}

applyBtn.addEventListener("click", () => {
  sendColorToActiveTab(colorPicker.value);
});

saveBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ bgColor: colorPicker.value }, ()=> {
    status.textContent = "Saved default.";
    setTimeout(()=> status.textContent = "", 1000);
  });
});
