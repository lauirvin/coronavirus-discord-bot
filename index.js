const Discord = require('discord.js');

const client = new Discord.Client();
const commands = require('./commands');

require('dotenv').config();

client.on('ready', () => {
  console.log(`${client.user.tag} is online!`);
  const Channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
  if (!Channel) return console.error("Couldn't find the channel.");

  Channel.send('**👇🏻 COMMANDS 👇🏻**\n **!latest** - get the latest coronavirus update in HK \n **!recent** - get recent coronavirus updates in HK');

  let currentData;
  const { updateData, sendNewCase } = commands;

  setInterval(() => {
    updateData.then((res) => {
      if (currentData !== res) {
        currentData = res;
        Channel.send(sendNewCase());
      }
    });
  }, 60000);

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
