const puppeteer = require('puppeteer');

const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[a-z]{2,6}(\/[\w\d-]*)*\/?$/;

async function scrapeMedium(topic) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = `https://medium.com/search?q=${topic}`;

    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('article');

    const articles = await page.evaluate(() => {
      const articleElements = Array.from(document.querySelectorAll('article'));
      return articleElements.slice(0, 5).map(article => {
        const titleElement = article.querySelector('h2');
        const linkElement = article.querySelector('a');
        const authorElement = article.querySelector('p'); 

        return {
          title: titleElement ? titleElement.innerText : 'No title',
          url: linkElement ? linkElement.href : 'No URL',
          author: authorElement ? authorElement.innerText : 'No author',
        };
      });
    });
  const validatedArticles = articles.map(article => ({
      title: article.title,
      url: urlRegex.test(article.url) ? article.url : 'Invalid URL',
      author: article.author,
    }));

    return validatedArticles;
    
  } catch (error) {
    console.error('Error during scraping:', error); // Enhanced error logging
    throw new Error('Scraping failed');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeMedium;
