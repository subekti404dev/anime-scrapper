const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");

const getLink = async url => {
  try {
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const buttons = $(".the-button");
    const animeLink = $($(".fa-list-ul").parent())
      .parent()
      .attr("href");
    const links = [];
    buttons.each((_buttonIndex, buttonElement) => {
      const onclickValue = $(buttonElement).attr("onclick");
      const label = $(buttonElement)
        .find("div")
        .text();
      const match = onclickValue.match(new RegExp(`src="(.*)" rel`, "i"));
      if (match && match.length > 1) {
        let url = match[1];
        if (url.substr(0, 2) === "//") url = "https:" + url;
        links.push({ label, url });
      }
    });
    return { animeLink, links };
  } catch (error) {
    throw error;
  }
};

// const url = `https://animeindo.co/one-piece-movie-14-stampede/`;
// getLink(url)
//   .then(console.log)
//   .catch(err => {
//     console.log({ err });
//   });

module.exports = { getLink };
