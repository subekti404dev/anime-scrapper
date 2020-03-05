const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");
const CONSTANT = require("./constant");

const getNewEpisode = async (page = 1) => {
  try {
    const url = `${CONSTANT.BASE_URL}/page/${page}`;
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const sections = $(".row.mb40");
    const newEps = sections[0];
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



    return newEpsList;
  } catch (error) {
    throw error;
  }
};

// getNewEpisode(1)
//   .then(list => console.log(list))
//   .catch(console.log);

module.exports = { getNewEpisode };
