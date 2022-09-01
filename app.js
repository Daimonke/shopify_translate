require("dotenv/config");
const run = require("./services/run");

const app = async () => {
  run();
};

app();
