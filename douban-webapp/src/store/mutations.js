/**
 * Created by shiyuanzhong on 2017/5/20.
 */
import * as types from './mutation-types'

export default {
  [types.GRT_MOVIE_INFO] (state, infoList) {
    state.infoList = infoList
  }
}
