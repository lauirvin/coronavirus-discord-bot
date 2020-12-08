const Discord = require('discord.js');

const client = new Discord.Client();
const commands = require('./commands');

require('dotenv').config();

client.on('ready', () => {
  console.log(`${client.user.tag} is online!`);
  const Channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  if (!Channel) return console.error("Couldn't find the channel.");

  let currentData;
  const { updateData, sendNewCase } = commands;

  setInterval(() => {
    updateData.then((res) => {
      if (currentData === res) return;
      currentData = res;
      Channel.send(sendNewCase());
    });
  }, 60000);

  return 'client ready';
});

client.on('message', (message) => {
  const Channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  const { updateData, sendLatestData, sendAllData } = commands;
  const commandsList = ['!latest', '!recent'];

  if (commandsList.includes(message.content)) {
    updateData.then(() => {
      switch (message.content) {
        case '!latest':
          Channel.send(sendLatestData());
          break;
        case '!recent':
          Channel.send(sendAllData());
          break;
        default:
          break;
      }
    });
  }
});

client.login(process.env.DISCORD_AUTH_TOKEN);
