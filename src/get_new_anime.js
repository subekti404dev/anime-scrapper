const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");
const CONSTANT = require("./constant");

const getNewAnime = async () => {
  try {
    const url = CONSTANT.BASE_URL;
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const sections = $(".row.mb40");

    const newAnime = sections[1];
    const newAnimeAnchor = $(newAnime)
      .next()
      .find("a");

    const newAnimeList = [];
    newAnimeAnchor.each((i, e) => {
      const title = $(e)
        .find(".series-detail > div > h4")
        .text();

      if (title) {
        const link = $(e).attr("href");
        let poster = $(e)
          .find(".episode-ratio")
          .attr("style");
        if (poster) {
          poster = poster.match(new RegExp(`'(.*)'`), "i")[1];
        }

        const status = $($(e).find(".status-type > .text-h6")[0]).text();
        const type = $($(e).find(".status-type > .text-h6")[1]).text();

        newAnimeList.push({ title, link, poster, status, type });
      }
    });

    return newAnimeList;
  } catch (error) {
    throw error;
  }
};

// getNewAnime()
//   .then(list => console.log(list))
//   .catch(console.log);

module.exports = { getNewAnime };
