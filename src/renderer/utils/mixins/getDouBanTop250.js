export const baseUrl = 'https://movie.douban.com/top250'
const cheerio = require('cheerio')

export const doubanMovieCrawler = async function (url, movies = []) {
  const res = await axios.get(baseUrl)
  const $ = cheerio.load(res.data)

  $('.grid_view .item').each(function () {
    const elem = $(this)
    movies.push({
      title: elem.find('.info .hd .title').text().trim(),
      star: elem.find('.info .bd .star .rating_num').text().trim(),
      url: elem.find('.hd a').attr('href'),
      cover: elem.find('.pic img').attr('src'),
      info: elem.find('.info .bd').children('p').first().text().trim(),
      oneSentenceComment: elem.find('.info .bd .quote').text().trim()
    })
  })

  const nextUrl = $('.next a').attr('href')
  if (nextUrl) {
    await doubanMovieCrawler(baseUrl + nextUrl, movies)
  } else {
    console.log(movies)
  }
}