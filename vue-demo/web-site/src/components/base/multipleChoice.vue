<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in selections"
          :title="item.label"
          @click="toggleSelection(index)"
          :class="{active: checkActive (index) }"
      >{{item.label}}
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import _ from 'lodash'
  export default {
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'choose',
          value: 0
        }]
      }
    },
    data () {
      return {
        currIndexs: [0]
      }
    },
    methods: {
      toggleSelection (index) {
        if (this.currIndexs.indexOf(index) === -1) {
          this.currIndexs.push(index)
        } else {
          this.currIndexs = _.remove(this.currIndexs, (idx) => {
            return idx !== index
          })
        }
        let nowObjArray = _.map(this.currIndexs, (idx) => {
          return this.selections[idx]
        })
        this.$emit('on-change', nowObjArray)
      },
      checkActive (index) {
        return this.currIndexs.indexOf(index) !== -1
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .chooser-component {
    position: relative;
    display: inline-block;
  }

  .chooser-list li {
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }

  .chooser-list li.active {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
