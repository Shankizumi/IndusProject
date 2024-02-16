// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
        // Fetch submissions data from the server
    fetch('/submissions')
        .then(response => response.json())
        .then(data => {
            populateTable(data);  // Call the populateTable function with the retrieved data
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors that occur during the fetch operation
        });
});

function populateTable(submissions) {
    const tableBody = document.querySelector('#submittedFormsTable tbody'); // Reference to the table body element
    submissions.forEach(submission => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${submission.name}</td>
            <td>${submission.email}</td>
            <td>${submission.contact}</td>
        `;
        tableBody.appendChild(row);
    });
}
