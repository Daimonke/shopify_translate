const { getPage, freePage } = require("./pages");

const translate = async (text) => {
  const instance = await getPage();
  const page = instance.page;
  await page.goto(
    `https://translate.google.com/?sl=lt&tl=en&op=translate&text=${text}`,
    {
      timeout: 0,
    }
  );
  const [button] = await page.$x("//button[contains(., 'Accept all')]");
  if (button) await button.click();
  await page.waitForSelector(".Q4iAWc", {
    timeout: 0,
  });

  const character = await page.evaluate(() => {
    const textArr = [];
    const nodes = document.querySelectorAll(".Q4iAWc");
    nodes.forEach((item) => textArr.push(item.textContent));
    return textArr.join(" ");
  });

  await freePage(instance.id);
  return character;
};

module.exports = translate;
