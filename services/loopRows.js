const writeData = require("./writeData");
const translate = require("./translate");

const loopRows = async (array, filePath) => {
  let rowsLeft = array.length;
  const log = setInterval(() => {
    console.log(`Left: ${rowsLeft} rows`);
  }, 3000);
  const responses = await Promise.all(
    array.map(async (item) => {
      if (item["Default content"] && !item["Translated content"]) {
        const res = await translate(item["Default content"]);
        rowsLeft--;
        return {
          ...item,
          "Translated content": res,
        };
      } else {
        rowsLeft--;
        return item;
      }
    })
  );
  clearInterval(log);
  await writeData(responses, filePath);
};

module.exports = loopRows;
