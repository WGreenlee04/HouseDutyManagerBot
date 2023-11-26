// Import the PapaParse library
import Papa from 'papaparse';

// Function to handle the CSV parsing and 2D array creation
function parseCSV(csvData) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvData, {
      header: true, // Set to true if the CSV has a header row
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
}

// Function to read the "settings.csv" file and trigger the parsing
function readSettingsCSV() {
  return new Promise((resolve, reject) => {
    const fileName = 'settings.csv';

    fetch(fileName)
      .then((response) => response.text())
      .then((csvData) => {
        parseCSV(csvData)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error.message));
  });
}

// Example usage
readSettingsCSV()
  .then((data) => {
    console.log('CSV Data:', data);
    // Do something with the 2D array data
  })
  .catch((error) => {
    console.error('Error:', error);
  });