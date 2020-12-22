const fetchCases = require('./scraper');
const countries = require('./countries.json');

const updateData = new Promise((resolve, reject) => {
  fetchCases()
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

const sendNewCase = (latestData) => {
  const { date, cases } = latestData[0];
  return `❗️**LATEST UPDATE❗️**\n${cases} confirmed cases on ${date}`;
};

const sendLatestCountryData = (country) => new Promise((resolve) => {
  const countryItem = countries.find((x) => x.country === country) || null;
  if (!countryItem) return;

  const { url } = countryItem;

  fetchCases(url).then((casesData) => {
    const { date, cases } = casesData[0];
    resolve(`${cases} confirmed cases on ${date} in ${country}`);
  });
});

const sendAllCountryData = (country) => new Promise((resolve) => {
  const countryItem = countries.find((x) => x.country === country) || null;
  if (!countryItem) return;

  const { url } = countryItem;

  fetchCases(url).then((casesData) => {
    const caseArray = [];

    casesData.forEach((c, index) => {
      caseArray.push(
        `${c.cases} confirmed cases on ${c.date} ${
          index === 0 ? '**(latest)**' : ''
        }`,
      );
    });

    const transformString = caseArray.reverse().join('\n');
    resolve(transformString);
  });
});

const sendAvailableCountries = () => {
  const countryList = countries.map((country) => `${country.country} ${country.emoji}`).join('\n');
  const msg = '**👇🏻 COMMANDS 👇🏻**\n!latest:COUNTRYCODE\n!recent:COUNTRYCODE\n\n**AVAILABLE COUNTRIES:**';

  return `${msg}\n${countryList}`;
};

module.exports = {
  updateData,
  sendNewCase,
  sendLatestCountryData,
  sendAllCountryData,
  sendAvailableCountries,
};
