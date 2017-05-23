<template>
  <div class="shop-list">
    <h4>商品列表</h4>
    <table class="table table-hover table-bordered table-shop">
      <thead>
      <tr class="text-center">
        <th>id</th>
        <th>名称</th>
        <th>价格</th>
        <th>数量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="shop in shop_list">
        <td>{{shop.id}}</td>
        <td>{{shop.name}}</td>
        <td>{{shop.price}}</td>
        <td>{{shop.num || ''}}</td>
        <td>
          <div @click="add_db(shop)" class="btn btn-info">{{shop.num ? '+' : '加入购物车'}}</div>
          <div @click="reduce_db(shop)" class="btn btn-warning" v-if="shop.num && shop.num>0">-</div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      shop_list: [{
        id: 1,
        name: '脆皮鸡烤肉饭',
        price: 18
      }, {
        id: 2,
        name: '五花肉石窝拌饭',
        price: 16
      }, {
        id: 3,
        name: '肉夹馍',
        price: 5
      }, {
        id: 4,
        name: '西红柿鸡蛋面',
        price: 11
      }]
    }
  },
  methods: {
    add_db(shop){
      let id = shop.id;
      this.$store.dispatch('check_db', { id });

      //如果存在,先自增当前菜品中的num，再设置购物车的数量
      //如果不存在，直接往购物车中push一个新的菜品
      if (this.$store.state.cart.curIndex != -1) {
        //console.log('add_db');
        this.$store.dispatch('add_db');
      } else {
        //console.log('create_db');
        this.$set(shop, 'num', 1);
        this.$store.dispatch('create_db', shop);
      }
    },
    reduce_db(shop) {
      let id = shop.id;
      this.$store.dispatch('check_db', { id });
      this.$store.dispatch('reduce_db');
    }
  },
  mounted() {
    let list = this.$store.state.cart.cartList;
    for(let i=0; i< this.shop_list.length; i++){
      for(let j=0; j<list.length; j++){
        if(list[j].id == this.shop_list[i].id){
          this.$set(this.shop_list, i, list[j]);        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
