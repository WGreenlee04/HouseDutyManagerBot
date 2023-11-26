const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'settings.csv';
const columns = {};

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Process each row of the CSV file
    for (const [key, value] of Object.entries(row)) {
      if (!columns[key]) {
        columns[key] = [];
      }

      // Filter out empty values
      if (value !== '') {
        columns[key].push(value);
      }
    }
  })
  .on('end', () => {
    // Finished reading the CSV file
    console.log('Data read successfully:');
    console.log(columns);

    // You can now use the 'columns' object where each key is a column name, and the value is an array of non-empty values for that column
  })
  .on('error', (error) => {
    // Handle any errors that occurred during the reading process
    console.error('Error reading CSV file:', error.message);
  });