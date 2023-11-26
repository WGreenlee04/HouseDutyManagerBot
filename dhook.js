const {Client, IntentsBitField} = require('discord.js');

// Create a new Discord client
const client = new Client({
    intents: [
      IntentsBitField.Flags.GuildMessages,   // MESSAGE events (message creation, deletion, etc.)
      // Add more intents as needed for your bot
    ],
  });

// Replace 'YOUR_BOT_TOKEN' with your own bot token
const BOT_TOKEN = 'MTE3ODQ2NTk3MjY4MDY1NDkzMQ.GEXOtM.cPdF7bNyo-_qQaIJGy_QTvhY5VrcXFSkMYVtBs';

// The ID of the Discord server where you want to send the message
const SERVER_ID = '1023072526202589295';

// This function sends a message to the specified channel in the server
async function sendMessageToServer(messageContent) {
  try {
    // Log in to the Discord client
    await client.login(BOT_TOKEN);

    // Find the server by ID
    const server = client.guilds.cache.get(SERVER_ID);

    // If the server is found
    if (server) {
      // Replace 'YOUR_CHANNEL_ID' with the ID of the channel where you want to send the message
      const channel = server.channels.cache.get('YOUR_CHANNEL_ID');

      // If the channel is found
      if (channel) {
        // Send the message to the channel
        await channel.send(messageContent);
        console.log('Message sent successfully!');
      } else {
        console.error('Channel not found!');
      }
    } else {
      console.error('Server not found!');
    }

    // Log out of the Discord client
    await client.destroy();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Export the function so that it can be imported in other files
module.exports = {
    sendMessageToServer,
};