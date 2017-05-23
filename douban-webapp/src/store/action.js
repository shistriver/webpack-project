/**
 * Created by shiyuanzhong on 2017/5/20.
 */
import {
  movieComingSoon
} from '@/service/getData'
import * as types from './mutation-types'

export default {
  getMovieData ({commit, state}) {
    movieComingSoon().then((res) => {
      commit(types.GRT_MOVIE_INFO, res.data.subjects)
    }, (err) => {
      console.log(err)
    })
  }
}
