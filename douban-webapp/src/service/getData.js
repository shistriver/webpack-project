/**
 * Created by shiyuanzhong on 2017/5/19.
 */
import Vue from 'vue'
const header = {
  headers: {},
  emulateJSON: true
}

/**
 * 获取正在热映
 */
var movieTheater = () => {
  const url = 'https://api.douban.com/v2/movie/in_theaters'
  return Vue.http.jsonp(url, {}, header)
}

/**
 * 获取即将上映
 */
var movieComingSoon = () => {
  const url = 'https://api.douban.com/v2/movie/coming_soon'
  return Vue.http.jsonp(url, {}, header)
}

/**
 * 获取即将上映
 */
var movieDetail = (id) => {
  const url = 'https://api.douban.com/v2/movie/subject/' + id
  return Vue.http.jsonp(url, {}, header)
}

export {movieTheater, movieComingSoon, movieDetail}
