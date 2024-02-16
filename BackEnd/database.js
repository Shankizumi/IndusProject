// In-memory database for storing form submissions

const submissions = []; // Array to hold submission entries

// Function to retrieve all submissions from the database
function getAllSubmissions() {
  return submissions; // Return the array of submissions
}

// Function to add a new submission to the database
function addSubmission(entry) {
  submissions.push(entry); // Push the new submission entry to the submissions array
}

// Function to find a submission by email in the database
function findEntryByEmail(email) {
  return submissions.find(entry => entry.email === email); // Find the submission with the specified email address
}

// Export database functions to be used in other modules
module.exports = {
  getAllSubmissions, 
  addSubmission, 
  findEntryByEmail 
};
