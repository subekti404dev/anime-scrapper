const cheerio = require("cheerio");
const { getHtml } = require("./util/get_html");
const CONSTANT = require("./constant");

const getSchedule = async () => {
  try {
    const url = `${CONSTANT.BASE_URL}/jadwal-rilis/`;
    const html = await getHtml(url);
    const $ = cheerio.load(html);
    let days = $('.row.mb40');
    let result = [];
    days.each((index, element) => {
      if (index> 0) {
        const data = [];
        const title = $(element).find('span.text-h2.text-primary').text();
        const cards = $(element).find('a');
        $(cards).each((i, e) => {
          const url = $(e).attr('href');
          let poster = $(e).find('.episode-ratio.background-cover').attr('style');
          if (poster) {
            const match = poster.match(new RegExp(`'(.*)'`), 'i');
            if (match && match.length > 1) {
              poster = match[1]
            }
          }
          const title = $(e).find('h4').text();
          let rating = $(e).find('span.series-rating').attr('style');
          if (rating) {
            const match = rating.match(new RegExp(`:(.*)% `, `i`));
            if (match && match.length > 1) {
              rating = parseFloat(match[1]);
            }
          }
          data.push({title, url, poster, rating});
        })
        result.push({title, data})
      }
    })
    return result;
  } catch (error) {
    throw error;
  }
};

// getSchedule()
//   .then(list => console.log(list[0]))
//   .catch(console.log);

module.exports = { getSchedule };
