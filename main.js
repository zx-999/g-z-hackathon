// document.addEventListener('DOMContentLoaded', () => {
//   // refers to the toggle
//   const toggleSwitch = document.getElementById('toggleContainer');
//   // refers to the location that the affirmation will pop up
//   // NEEDS TO BE CHANGED TO THE NEW POPUP WINDOW
//   // wait until switch is toggled on
//   let popupWindow;
//   toggleSwitch.addEventListener('change', () => {
//     // if it's on, append text to the affirmation text location
//     if (toggleSwitch.checked) {
//       popupWindow = window.open(
//         'popup.html',
//         'affirmation pop up',
//         'width=400,height=200'
//       );
//       popupWindow.onload = () => {
//         const affirmationDiv = document.createElement('div');
//         affirmationDiv.id = 'affirmation-container';
//         affirmationDiv.style.position = 'fixed';
//         affirmationDiv.style.bottom = '10px';
//         affirmationDiv.style.right = '10px';
//         affirmationDiv.style.padding = '10px';
//         affirmationDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//         affirmationDiv.style.borderRadius = '5px';
//         affirmationDiv.style.fontFamily = 'Arial, sans-serif';
//         affirmationDiv.style.fontSize = '14px';
//         affirmationDiv.style.zIndex = '10000'; // Ensures it stays on top of the page
//         affirmationDiv.style.display = 'none'; // Hidden initially
//         updateAffirmation(affirmationDiv);
//         document.body.appendChild(affirmationDiv);
//       };
//     } else {
//       if (popupWindow) popupWindow.close();
//     }
//   });
// });

// create div to display the affirmation
const affirmationDiv = document.createElement('div');
affirmationDiv.id = 'affirmation-container';
affirmationDiv.style.position = 'fixed';
affirmationDiv.style.bottom = '10px';
affirmationDiv.style.right = '10px';
affirmationDiv.style.padding = '10px';
affirmationDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
affirmationDiv.style.borderRadius = '5px';
affirmationDiv.style.fontFamily = 'Arial, sans-serif';
affirmationDiv.style.fontSize = '14px';
affirmationDiv.style.zIndex = '10000'; // Ensures it stays on top of the page
affirmationDiv.style.display = 'none'; // Hidden initially

document.body.appendChild(affirmationDiv);

// function to update the affirmation
function updateAffirmation() {
  chrome.runtime.sendMessage({ action: 'getAffirmation' }, function (response) {
    console.log('sending get message');
    if (response.affirmation) {
      affirmationDiv.innerText = response.affirmation;
      affirmationDiv.style.display = 'block'; // Show the affirmation
    }
  });
}

// display a new affiramtion every 1 min????
// listen for message from the background script
updateAffirmation();
setInterval(updateAffirmation, 30000); // set for 1 min
