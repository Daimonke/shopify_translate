const puppeteer = require("puppeteer");
let allPages = [];
let allBrowsers = [];

const newBrowser = async () => {
  let launchOptions = {
    headless: true,
    slowMo: 0,
  };
  const browser = await puppeteer.launch(launchOptions);
  allBrowsers.push(browser);
  await newPage(browser);
  await newPage(browser);
  await newPage(browser);
};

const newPage = async (browser) => {
  const page = await browser.newPage();
  allPages.push({
    id: allPages.length,
    page: page,
    free: true,
  });
};

const getPage = async () => {
  let freePage = allPages.find((item) => item.free);
  if (freePage === undefined) {
    await new Promise((res) => setTimeout(() => res(""), 1000));
    return await getPage();
  } else {
    freePage.free = false;
    return freePage;
  }
};

const freePage = async (id) => {
  const page = allPages.find((item) => item.id == id);
  page.free = true;
};

exports.getPage = getPage;
exports.newPage = newPage;
exports.freePage = freePage;
exports.newBrowser = newBrowser;
