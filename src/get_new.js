const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");
const CONSTANT = require("./constant");

const getNew = async () => {
  try {
    const url = CONSTANT.BASE_URL;
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const sections = $(".row.mb40");
    const result = [];

    const newEps = sections[0];
    const newEpsTitle = $(newEps)
      .find(".text-h2")
      .text();
    const newEpsAnchor = $(newEps)
      .next()
      .find("a");
    const newEpsList = [];
    newEpsAnchor.each((i, e) => {
      const title = $(e)
        .find(".episode-detail > div > h3")
        .text();
      if (title) {
        const link = $(e).attr("href");
        let poster = $(e)
          .find(".episode-ratio")
          .attr("style");
        if (poster) {
          poster = poster.match(new RegExp(`'(.*)'`), "i")[1];
        }
        const status = $($(e).find(".text-h6")[0]).text();
        const type = $($(e).find(".text-h6")[1]).text();
        const episode = $(e)
          .find(".episode-number")
          .text();
        newEpsList.push({ title, link, poster, status, type, episode });
      }
    });

    result.push({
      title: newEpsTitle,
      list: newEpsList
    });

    const newAnime = sections[1];
    const newAnimeTitle = $(newAnime)
      .find(".text-h2")
      .text();
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
    result.push({
      title: newAnimeTitle,
      list: newAnimeList
    });

    return result;
  } catch (error) {
    throw error;
  }
};

// getNew()
//   .then(list => console.log(list[0].list))
//   .catch(console.log);

module.exports = { getNew };
