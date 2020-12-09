const Discord = require('discord.js');

const commands = require('./commands');

const client = new Discord.Client();
const updateMessage = require('./update_message.json');
const packageJson = require('./package.json');
require('dotenv').config();

client.on('ready', () => {
  console.log(`${client.user.tag} is online!`);
  const Channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  if (!Channel) return console.error("Couldn't find the channel.");

  const { message, patchNotes } = updateMessage;
  const { version } = packageJson;

  Channel.send(`${message.replace(/defaultCountry/g, process.env.DEFAULT_COUNTRY_CODE)}\n\n**Patch Notes (v${version}):**\n*${patchNotes}*`);

  let currentData;
  const { updateData, sendNewCase } = commands;

  updateData.then((res) => {
    currentData = res;
  });

  setInterval(() => {
    updateData.then((res) => {
      if (currentData !== res) {
        currentData = res;
        Channel.send(sendNewCase());
      }
    });
  }, 5000);

  return 'client ready';
});

client.on('message', (message) => {
  const Channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  const {
    updateData, sendLatestData, sendAllData, sendLatestCountryData, sendAllCountryData,
  } = commands;

  if (!message.content.startsWith('!')) return;

  if (message.content.startsWith('!latest:') || message.content.startsWith('!recent:')) {
    const handleCountries = (command, fn) => {
      const countryCode = message.content.replace(command, '');
      fn(countryCode).then((msg) => Channel.send(msg));
    };

    handleCountries('!latest:', sendLatestCountryData);
    handleCountries('!recent:', sendAllCountryData);
  } else {
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
