// update background script to fetch affirmation

// add event listener when installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('fetchAffirmation', { when: Date.now() });
});

// listens when fetch affirmation is triggered
// will fetch affirmation at set interval
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchAffirmation') {
    setInterval(fetchAffirmation, 5000);
    fetchAffirmation();
  }
});

// fetch data from affimration API
// maybe have this function send update affirmation message to main
function fetchAffirmation() {
  fetch('https://www.affirmations.dev/')
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.local.set({ affirmation: data.affirmation });
      console.log('Affirmation updated:', data.affirmation);
    })
    .catch((error) => {
      console.error('Error fetching affirmation:', error);
    });
}

// listen for when main.js asks for affirmation
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('get affrimation received');
  if (request.action === 'getAffirmation') {
    chrome.storage.local.get('affirmation', (result) => {
      sendResponse({ affirmation: result.affirmation || 'Stay positive!' });
    });
    return true; // Keeps the message channel open for async response
  }
});
