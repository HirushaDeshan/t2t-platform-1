const loadingMessage = document.querySelector(".loading-dots");
const hiddenSection = document.querySelector(".hidden-section");

// Function to parse URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  } 
  // Get the "title" parameter from the URL
  const titleValue = getURLParameter("Project_Title"); 
  // Now you can use the "titleValue" as needed in your "expression-of-interest.html" page.
  console.log("Title value from URL parameter: " + titleValue);
  // Check if the titleValue is not null or undefined
  if (titleValue) {
    // Display a message with the retrieved project title
    const messageElement = document.getElementById("message"); // Assuming you have an element with the id "message" on your HTML page
    if (messageElement) {
      messageElement.textContent = `You have expressed interest in the ${titleValue} Project`;
    }
  } else {
    // Handle the case where the "title" parameter is not provided
    console.log("Title parameter not found in the URL.");
  }
   

document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.querySelector(".submit-button");

  submitButton.addEventListener("click", function () {
      UploadFile();
  });

  function UploadFile() {
    loadingMessage.style.display = "block";
    var reader = new FileReader();
    var file = document.getElementById('attach').files[0];
    var form = document.getElementById('uploadForm');

    // Set the value of the hidden input field "title" with the titleValue
    var titleInput = document.getElementById('Project_Title');
    titleInput.value = titleValue; // Assign the value retrieved from the URL
    // Get the selected values from the member title dropdowns
    var member1TitleInput = document.getElementById('member1Title');
    var member2TitleInput = document.getElementById('member2Title');
    var member3TitleInput = document.getElementById('member3Title');
    var member4TitleInput = document.getElementById('member4Title');
    var selectedMember1Title = member1TitleInput.value;
    var selectedMember2Title = member2TitleInput.value;
    var selectedMember3Title = member3TitleInput.value;
    var selectedMember4Title = member4TitleInput.value;

    // Add the selected member titles to the form data
    var member1TitleFormField = document.createElement('input');
    member1TitleFormField.type = 'hidden';
    member1TitleFormField.name = 'member1Title';
    member1TitleFormField.value = selectedMember1Title;
    form.appendChild(member1TitleFormField);

    var member2TitleFormField = document.createElement('input');
    member2TitleFormField.type = 'hidden';
    member2TitleFormField.name = 'member2Title';
    member2TitleFormField.value = selectedMember2Title;
    form.appendChild(member2TitleFormField);

    var member3TitleFormField = document.createElement('input');
    member3TitleFormField.type = 'hidden';
    member3TitleFormField.name = 'member3Title';
    member3TitleFormField.value = selectedMember3Title;
    form.appendChild(member3TitleFormField);

    var member4TitleFormField = document.createElement('input');
    member4TitleFormField.type = 'hidden';
    member4TitleFormField.name = 'member4Title';
    member4TitleFormField.value = selectedMember4Title;
    form.appendChild(member4TitleFormField);

      reader.onload = function () {
          document.getElementById('fileContent').value = reader.result;
          document.getElementById('filename').value = file.name;

          // Log the form data before sending it
          console.log("Form data about to be sent:", new FormData(form));

          // Set the action and method attributes dynamically
          form.action = API_URL + '?action=expression-of-interest';
          form.method = "post";

          // Send the form data to the server using the fetch API
          fetch(form.action, {
              method: form.method,
              body: new FormData(form)
          })
          .then(response => response.text())
          .then(data => {
              if (data === "Success") {
                  form.reset();
                  console.log("Successfully Added");
                  loadingMessage.style.display = "none";
                  hiddenSection.style.display = "block";
              } else {
                  // Display the error message under the email input box
                  document.querySelector("#emailError").textContent = "This email already exists";
                  document.querySelector("#sub").value = "Submit"; // Change the button text back to "Submit"
              }
          })
          .catch(error => {
              console.error("Error:", error);
          });

          console.log("Form data sent to Google Apps Script");
      };

      reader.readAsDataURL(file);
      
      
  }
});

// Function to populate the dropdowns with project titles
function populateDropdowns() {
    // Get a list of all member title dropdowns
    const dropdowns = document.querySelectorAll('[id^="member"]');
    
    // Make an HTTP request to get project titles from Google Apps Script
    fetch(API_URL + '?action=get-project-titles')
      .then(response => response.json())
      .then(projectTitles => {
        // Populate each member title dropdown with project titles
        dropdowns.forEach(dropdown => {
          projectTitles.forEach(title => {
            const option = document.createElement('option');
            option.value = title;
            option.textContent = title;
            dropdown.appendChild(option);
          });
        });
      })
      .catch(error => console.error("Error fetching project titles: " + error));
  }
  
  // Call the function to populate the dropdowns
  populateDropdowns();
  
// Function to populate the dropdown with project titles
function populateDropdownMentor() {
  // Make an HTTP request to get project titles from Google Apps Script
  fetch(API_URL + '?action=get-mentor-list')
    .then(response => response.json())
    .then(mentorList => {
      // Get the dropdown element
      const dropdown = document.getElementById('mentor');

      // Populate the dropdown with project titles
      mentorList.forEach(title => {
        const option = document.createElement('option');
        option.value = title;
        option.textContent = title;
        dropdown.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching project titles: " + error));
}

// Call the function to populate the dropdown
populateDropdownMentor();

//dropdown display in apply now button
document.addEventListener("DOMContentLoaded", function() {
  const applyButton = document.getElementById('applyButton');
  const dropdownContent = document.querySelector('.dropdown-content');

  applyButton.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent any other potential click events
      if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
      } else {
          dropdownContent.style.display = 'block';
      }
  });

  // Hide dropdown if clicked outside
  document.addEventListener('click', function(event) {
      if (event.target !== applyButton) {
          dropdownContent.style.display = 'none';
      }
  });
});