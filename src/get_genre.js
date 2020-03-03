const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");

const getGenre = async () => {
  try {
    url = `https://animeindo.co/genre-list/`;
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const genres = $(".the-animelist-text").children();
    const result = [];
    genres.each((_index, element) => {
      const alphabet = $(element)
        .find(".alphabet")
        .text();
      const genres = [];
      const g = $(element).children("a");
      g.each((_i, e) => {
        const label = $(e).text();
        const url = $(e).attr("href");
        genres.push({ label, url });
      });
      result.push({ alphabet, genres });
    });
    return result;
  } catch (error) {
    throw error;
  }
};

getGenre()
  .then(r => console.log(r[0]))
  .catch(console.log);
