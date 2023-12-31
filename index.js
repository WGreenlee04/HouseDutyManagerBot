const fs = require('fs');
const csv = require('csv-parser');
const schedule = require('node-schedule');
const discord = require('./dhook')
const teams = require('./thook')

const csvFilePath = './settings.csv';
const columns = {};

// Function to process the CSV data
function processCsvData() {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Process each row of the CSV file
      for (const [key, value] of Object.entries(row)) {
        if (!columns[key]) {
          columns[key] = [];
        }
      }
    })
    .on('end', () => {
      // Finished reading the CSV file
      console.log('Data read successfully:');
      console.log(columns);

      // Perform actions with the data here
    })
    .on('error', (error) => {
      // Handle any errors that occurred during the reading process
      console.error('Error reading CSV file:', error.message);
    });
}

function rotateArrayByOne(arr) {
  if (arr.length <= 1) {
    // If the array has 0 or 1 elements, no rotation needed
    return arr;
  }
  // Remove the first element and push it to the end of the array
  const firstElement = arr.shift();
  arr.push(firstElement);

  return arr;
}

// Log a message when the script starts
console.log('Script is running...');

// You can also perform the initial task when the script starts
processCsvData();

// Notify endpoints
discord.sendMessageToServer('Bot is online and functional!')

// Create reminder CRONs
columns.Reminder.forEach(reminder => {
  // Regular expression to match the format
  const regex = /<([^>]+)>(\d{2}):(\d{2})/;

  // Match the input string with the regular expression
  const match = reminder.match(regex);

  // Check if the match is found
  if (match) {
    // Extracted values
    const rawText = match[1]; // The raw text inside <>
    const hour = parseInt(match[2], 10); // Convert hour to integer
    const minute = parseInt(match[3], 10); // Convert minute to integer

    // Output the results
    console.log("Raw Text:", rawText);
    console.log("Hour:", hour);
    console.log("Minute:", minute);
  } else {
    console.log("Invalid format");
  }
});

// Schedule the task to run every Sunday at midnight
const j = schedule.scheduleJob('0 0 * * 7', () => {
  console.log("Running scheduled task...")
  var weekly = columns.Weekly
  var names = columns.Names
  message = 'Here is the list of house duties for the week:'
  for(var i=0; i<weekly.size(); i++){
    message += weekly[i] + ' - ' + names[i]
  }
  discord.sendMessageToServer('@everyone\n'+message)
  //teams.sendMessageToTeam('')
  columns.Weekly = rotateArrayByOne(weekly)
});