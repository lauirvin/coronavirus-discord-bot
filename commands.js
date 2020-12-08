const fetchCases = require("./scraper");

let latestData;

const updateData = new Promise((resolve, reject) => {
  fetchCases
    .then((res) => {
      latestData = res;
      resolve(true);
    })
    .catch(() => {
      reject("Failed to fetch data");
    });
});

const sendLatestData = () => {
  const { date, cases } = latestData[0];
  return `${cases} confirmed cases on ${date}`;
};

const sendAllData = () => {
  const caseArray = [];

  latestData.forEach((c, index) => {
    caseArray.push(
      `${c.cases} confirmed cases on ${c.date} ${
        index === 0 ? "**(latest)**" : ""
      }`
    );
  });

  const transformString = caseArray.reverse().join("\n");
  return transformString;
};

module.exports = {
  updateData,
  sendLatestData,
  sendAllData,
};
