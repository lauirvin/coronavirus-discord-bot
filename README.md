<p align="center">
  <a href="https://github.com/lauirvin/coronavirus-discord-bot">
    <img alt="logo" src="https://img.mlo-online.com/files/base/ebm/mlo/image/2020/05/Pixabay_coronavirus_5107715_1280.5eb16e6f5f05a.png?auto=format&fit=max&w=1200" width="150" />
  </a>
</p>
<h1 align="center">
   Coronavirus Live Updates Discord Bot
</h1>

## 🧰 Prerequisites

1. Install [NodeJS](https://nodejs.org/en/)

## 🚀 Development

1. Install [Prettier ESLint VSCode Extension](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
2. Locate the repository in terminal/bash
3. Install dependencies - `npm install` in the repository directory
4. Run `node index.js` in the repository directory

### Environment Variables

Rename `.env.sample` file to `.env`.

- `DISCORD_AUTH_TOKEN`
- `DISCORD_CHANNEL_ID`
- `DEFAULT_COUNTRY_CODE` - Set Country Code (find country code in `countries.json`, e.g. `HK`)

### Add a country

1. Open `countries.json`
2. Find country URL at https://www.worldometers.info/coronavirus/
3. Add key value pair object to `countries.json` array

Example:

```
{
    "country": "CA",
    "url": "https://www.worldometers.info/coronavirus/country/canada/"
}
```



## 🎁 Production deployment

- Add production environment variables
- Run `npm run build` in the repository

## 👷 Built With

- [NodeJS](https://nodejs.org/en/)
- [DiscordJS](https://discord.js.org/)

## 📚 Author

- **Irvin Ives Lau** - [lauirvin](https://github.com/lauirvin)
- https://www.irviniveslau.com
