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
  