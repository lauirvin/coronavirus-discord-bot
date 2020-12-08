const fetchCases = require('./scraper');
const countries = require('./countries.json');

let latestData;

const updateData = new Promise((resolve, reject) => {
  fetchCases()
    .then((res) => {
      latestData = res;
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

const sendNewCase = () => {
  const { date, cases } = latestData[0];
  return `❗️**LATEST UPDATE❗️**\n${cases} confirmed cases on ${date}`;
};

const sendLatestData = () => {
  const { date, cases } = latestData[0];
  return `${cases} confirmed cases on ${date}`;
};

const sendAllData = () => {
  const caseArray = [];

  latestData.forEach((c, index) => {
    caseArray.push(
      `${c.cases} confirmed cases on ${c.date} ${
        index === 0 ? '**(latest)**' : ''
      }`,
    );
  });

  const transformString = caseArray.reverse().join('\n');
  return transformString;
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

module.exports = {
  updateData,
  sendNewCase,
  sendLatestData,
  sendAllData,
  sendLatestCountryData,
  sendAllCountryData,
};
