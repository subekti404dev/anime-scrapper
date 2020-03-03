const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");

const getEpisode = async url => {
  try {
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const episodes = $(".the-episode");
    const eps = [];
    episodes.each((_index, element) => {
      const url = $(element)
        .parent("a")
        .attr("href");
      const label = $(element)
        .find("h3")
        .text();
      eps.push({ label, url });
    });
    return eps;
  } catch (error) {
    throw error;
  }
};

const url = `https://animeindo.co/anime/one-piece/`;
getEpisode(url)
  .then(console.log)
  .catch(console.log);
