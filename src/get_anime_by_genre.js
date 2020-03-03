const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");

const getAnimeByGenre = async (baseUrl, page) => {
  try {
    let url = baseUrl;
    if (page > 1) {
      url = url + "page/" + page;
    }
    console.log(url)
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const animes = $(".series-card");
    const result = [];
    animes.each((_index, element) => {
      const url = $(element)
        .parent("a")
        .attr("href");
      const styleValue = $(element)
        .find(".background-cover")
        .attr("style");
      let poster = null;
      const match = styleValue.match(new RegExp(`'(.*)'`, "i"));
      if (match && match.length > 1) {
        poster = match[1];
      }
      const title = $(element)
        .find("h4")
        .text();
      const detail = $(element).find("div > span");
      const status = $(detail[0]).text();
      const type = $(detail[1]).text();
      result.push({ title, url, poster, status, type });
    });
    return result;
  } catch (error) {
    throw error;
  }
};

getAnimeByGenre("https://animeindo.co/genres/action/", 1)
  .then(r => console.log(r))
  .catch(console.log);
