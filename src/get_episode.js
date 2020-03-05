const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");

const getEpisode = async url => {
  try {
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    const title = $(".anime-slider")
      .find("h1")
      .text();
    let poster = $(".background-cover").attr("style");
    if (poster) {
      const match = poster.match(new RegExp(`'(.*)'`, "i"));
      if (match && match.length > 1) {
        poster = match[1];
      }
    }
    const description = $(".mt20")
      .find("p.mb-0")
      .next()
      .text();
    const genre = [];
    $("ul.animegenre")
      .find("li > a")
      .each((i, e) => {
        const label = $(e).text();
        const link = $(e).attr("href");
        genre.push({ label, link });
      });
    let rating = $(".series-rating").attr("style");
    if (rating) {
      const match = rating.match(new RegExp(` (.*)% `, "i"));
      if (match && match.length > 1) {
        rating = parseFloat(match[1]);
      }
    }
    const status = $(".status").text();
    const more = [];
    $(".series-details > div > div").each((i, e) => {
      const text = $(e).text();
      more.push(text);
    });

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

    const detail = {
      title,
      poster,
      description,
      genre,
      rating,
      status,
      more,
      episodes: eps
    };
    return detail;
  } catch (error) {
    throw error;
  }
};

// const url = `https://animeindo.co/anime/one-piece-movie-14-stampede/`;
// getEpisode(url)
//   .then(console.log)
//   .catch(console.log);

module.exports = {getEpisode}