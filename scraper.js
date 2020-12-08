const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const url = 'https://www.worldometers.info/coronavirus/country/china-hong-kong-sar/';

const fetchCases = axios(url)
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

    return dates().map((date, i) => ({
      date,
      cases: numberOfCases[i],
    }));
  })
  .catch((err) => (err));

module.exports = fetchCases;
