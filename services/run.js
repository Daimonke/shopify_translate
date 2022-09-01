const fs = require("fs");
const { parse } = require("csv");
const loopRows = require("./loopRows");
const path = require("path");
const { newBrowser } = require("./pages");
const { exit } = require("process");

// Settings
const filePath = "../ShopifyCsvFileToTranslate/translation.csv";

const run = async () => {
  await newBrowser();
  await newBrowser();
  const parser = parse({ columns: true }, async function (err, records) {
    const rowsLeft = records.filter(
      (item) => item["Default content"] && !item["Translated content"]
    );
    if (rowsLeft.length > 0) {
      await loopRows(records, filePath);
    } else {
      console.log("No data to translate.");
      exit();
    }
  });

  fs.createReadStream(path.join(__dirname, filePath)).pipe(parser);
};

module.exports = run;
