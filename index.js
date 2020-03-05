const { getNew } = require('./src/get_new')
const { getGenre } = require('./src/get_genre')
const { getSchedule } = require('./src/get_schedule')
const { getAnimeByGenre } = require('./src/get_anime_by_genre')
const { getAnimeBySearch } = require('./src/get_anime_by_search')
const { getEpisode } = require('./src/get_episode')
const { getLink } = require('./src/get_link')

module.exports = {
    getNew,
    getGenre,
    getSchedule,
    getAnimeByGenre,
    getAnimeBySearch,
    getEpisode,
    getLink
}