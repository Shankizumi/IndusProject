// Get references to HTML elements
const form = document.getElementById('userForm');
const modal = document.getElementById('modal'); 
const modalMessage = document.getElementById('modal-message'); 
const closeButton = document.querySelector('.close'); 

// Add event listener for form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const contact = formData.get('contact');

    // Validate form data
    if (validateForm(name, email, contact)) {
        sendData(name, email, contact); // Send form data to the server
    }
});

// Function to validate form data
function validateForm(name, email, contact) {
    if (!name || !email || !contact) {
        showModal('Please fill in all fields.'); // Show modal with error message
        return false;
    }

    if (!isValidEmail(email)) {
        showModal('Please enter a valid email address.'); // Show modal with error message
        return false;
    }

    // Additional validation: Check contact number format
    if (!/^[6-9]\d{9}$/.test(contact)) {
        showModal('Invalid contact number format. Please use a 10-digit number starting with 6, 7, 8, or 9.'); // Show modal with error message
        return false;
    }
    return true; // Form data is valid
}

// Function to validate email address using regex
function isValidEmail(email) {
    const regex = /^\S+@\S+\.\S+$/; // Regular expression for email validation
    return regex.test(email);
}

// Function to send form data to the server
function sendData(name, email, contact) {
    const data = { name, email, contact }; // Form data object

    const apiUrl = 'http://localhost:3000/submit'; // API endpoint for form submission

    // Send form data to the server using fetch API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        showModal(data.message); // Show modal with success message
        form.reset(); // Reset the form
    })
    .catch(error => {
        console.error('Error:', error);
        showModal('An error occurred while submitting the form. Please try again later.'); // Show modal with error message
    });
}

// Event listener for "View Submitted Forms" button
const viewFormsBtn = document.getElementById('viewFormsBtn');
viewFormsBtn.addEventListener('click', function () {
    window.location.href = '/submissions.html'; // Navigate to the submissions page
});

// Function to display modal with a message
function showModal(message) {
    modalMessage.textContent = message; // Set modal message text
    modal.style.display = 'block'; // Display the modal
}

// Function to display confirmation message
function showConfirmation(message) {
    const confirmationDiv = document.createElement('div'); // Create a new div element
    confirmationDiv.textContent = message; // Set confirmation message text
    document.body.appendChild(confirmationDiv); // Append the div to the document body

    // Automatically remove the confirmation message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(confirmationDiv); // Remove the div after 3 seconds
    }, 3000);
}

// Event listener for close button
closeButton.addEventListener('click', function () {
    modal.style.display = 'none'; // Hide the modal when close button is clicked
});

// Event listener for clicking outside the modal
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide the modal when clicking outside
    }
});
