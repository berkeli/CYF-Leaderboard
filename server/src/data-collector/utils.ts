import puppeteer from 'puppeteer';

export const isTagElement = (element: any): element is cheerio.TagElement => element?.attribs !== undefined;

export async function autoScroll(page: puppeteer.Page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const { scrollHeight } = document.body;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve(null);
        }
      }, 200);
    });
  });
}
