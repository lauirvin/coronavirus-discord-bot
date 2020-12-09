const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const countries = require('./countries.json');
require('dotenv').config();

const defaultCountryURL = countries.find(
  (x) => x.country === process.env.DEFAULT_COUNTRY_CODE,
).url;

const fetchCases = (url = defaultCountryURL) => new Promise((resolve) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const parentContainer = $('#news_block');

      const numberOfCases = parentContainer
        .find('.news_post .news_body ul li strong:first-child')
        .text()
        .split(' new cases')
        .filter((x) => x !== '');

      const dates = () => {
        const prevDates = parentContainer
          .find('.date-btn')
          .toArray()
          .map((x) => x.attribs['data-date']);
        const latestDate = moment(prevDates[0])
          .add(1, 'days')
          .format('YYYY-MM-DD');
        return [latestDate, ...prevDates];
      };

      const listOfCases = dates().map((date, i) => ({
        date,
        cases: numberOfCases[i],
      }));

      resolve(listOfCases);
    })
    .catch((err) => (err));
});

module.exports = fetchCases;
