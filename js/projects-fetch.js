const projectList = document.querySelector(".project-list");
const pagination = document.querySelector(".pagination");
const projectsPerPage = 8;
let currentPage = 1;
let data; // Define the data variable in a wider scope

function renderProjects() {
  function toSentenceCase(text) {
    return text.replace(/\w\S*/g, function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  projectList.innerHTML = "";

  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const projectsToDisplay = data.records.slice(startIndex, endIndex);

  projectsToDisplay.forEach((project) => {
    const listItem = document.createElement("li");
    listItem.classList.add("project-list-item");

    // Create project title
    const title = document.createElement("div");
    title.classList.add("project-title");
    const fullTitle = toSentenceCase(project.Title);
    title.textContent = fullTitle;
    listItem.appendChild(title);

    // Create project details
    const details = document.createElement("div");
    details.classList.add("project-details");

    // Create project detail items
    const detailItems = [
      { icon: "fas fa-building", label: "Company", value: project.Company },
      {
        icon: "fas fa-bullseye",
        label: "Goal",
        value: toSentenceCase(project.Goal),
      },
      {
        icon: "fas fa-tasks",
        label: "Tasks",
        value: toSentenceCase(project.Tasks),
      },
      { icon: "fas fa-code", label: "Technology", value: project.Technology },
      {
        icon: "fas fa-users",
        label: "Minimum Team",
        value: project.Minimum_Team,
      },
      {
        icon: "far fa-calendar-alt",
        label: "Date Added",
        value: project.Date_Added,
      },
      { icon: "far fa-clock", label: "Duration", value: project.Duration },
      {
        icon: "fas fa-link",
        label: "Details Link",
        value: `<a href="${project.Details_Link}">View</a>`,
      },
    ];

    // Loop through each detail item and create a span element
    detailItems.forEach((item) => {
      const div = document.createElement("div");
      const span = document.createElement("span");
      span.innerHTML = `<i class="${item.icon}"></i>&nbsp; ${item.label}:`;
      div.appendChild(span);

      const value = document.createElement("p");
      value.innerHTML = item.value;
      div.appendChild(value);
      details.appendChild(div);
    });

    listItem.appendChild(details);

    // Create bid button
    const bidButton = document.createElement("button");
    bidButton.classList.add("header-button");
    bidButton.textContent = "Expression of Interest";
    listItem.appendChild(bidButton);

    bidButton.addEventListener("click", function () {
      // Get the title value of the clicked project
      const titleValue = project.Title;

      // Redirect to the "expression-of-interest.html" page with the title as a URL parameter
      window.location.href = `expression-of-interest.html?Project_Title=${encodeURIComponent(
        titleValue
      )}`;
    });

    // Add list item to project list
    projectList.appendChild(listItem);
  });

  renderPaginationControls(data.records.length);
}

function renderPaginationControls(totalProjects) {
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderProjects(); // No need to pass data as it's accessible in this scope
    });
    pagination.appendChild(pageButton);
  }
}

fetch(API_URL + "?action=get-projects")
  .then((response) => response.json())
  .then((responseData) => {
    data = responseData; // Store the data in the wider scope
    renderProjects();
  })
  .catch((error) => console.error(error));

//dropdown display in apply now button
document.addEventListener("DOMContentLoaded", function () {
  const applyButton = document.getElementById("applyButton");
  const dropdownContent = document.querySelector(".dropdown-content");

  applyButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent any other potential click events
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });

  // Hide dropdown if clicked outside
  document.addEventListener("click", function (event) {
    if (event.target !== applyButton) {
      dropdownContent.style.display = "none";
    }
  });
});
