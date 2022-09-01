const fs = require("fs");
const { stringify } = require("csv");
const path = require("path");

const writeData = async (data, filePath) => {
  stringify(
    data,
    {
      header: true,
    },
    function (err, output) {
      fs.writeFile(path.join(__dirname, filePath), output, () => {});
    }
  );
};

module.exports = writeData;
