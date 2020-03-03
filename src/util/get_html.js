const fetch = require("node-fetch");

const getHtml = async url => {
  const res = await fetch(url);
  return res.text();
};

module.exports = { getHtml };
