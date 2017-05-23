/**
 * Created by shiyuanzhong on 2017/5/23.
 */
import * as types from './mutations_types'

export default {
  [types.UPDATE_LOCAL](state){
    localStorage.setItem('vuex_cart', JSON.stringify(state.cartList));
  },
  [types.CLEAR_LOCAL](state){
    state.cartList.forEach((item) => {
      item.num = 0;
    });
    state.cartList = [];
    localStorage.removeItem('vuex_cart');
  },
  [types.CREATE_DB](state, shop) {
    state.cartList.push(shop);
  },
  [types.CHECK_DB](state, { id }){
    state.curIndex = -1;
    var list = state.cartList;
    if (list.length){
      for(let i=0; i<list.length; i++){
        if(list[i].id === id){
          state.curIndex = i;
          break;
        }
      }
    }
  },
  [types.ADD_DB](state){
    state.cartList[state.curIndex].num++;
  },
  [types.REDUCE_DB](state){
    state.cartList[state.curIndex].num--;
    //删除数据
    if(state.cartList[state.curIndex].num === 0){
      state.cartList.splice(state.curIndex, 1);
    }
  },
  [types.UPDATE_CUR_SHOP_STATUS](state, { index = -1 }){
    state.curIndex = index;
  },
  [types.DELETE_DB](state){
    if(state.curIndex >=0){
      state.cartList[state.curIndex].num = 0;
      state.cartList.splice(state.curIndex, 1);
    }
  }
}
