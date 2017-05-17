<template>
  <div class="selection-component">
    <div class="selection-show" @click="selectToggle">
      <span>{{selections[currIndex].label}}</span>
      <div class="arrow"></div>
    </div>
    <div class="selection-list" v-show="isDrop">
      <ul>
        <li v-for="(item, index) in selections"
            @click="choose(index)" :class="{active: index === currIndex}">{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selections: {
        type: Array,
        default: [{
          value: 0,
          label: 'choose'
        }]
      }
    },
    data () {
      return {
        isDrop: false,
        currIndex: 0
      }
    },
    methods: {
      selectToggle () {
        this.isDrop = !this.isDrop
      },
      choose (index) {
        this.currIndex = index
        this.isDrop = false
        this.$emit('on-change', this.selections[this.currIndex])
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .selection-component {
    position: relative;
    display: inline-block;
  }

  .selection-show {
    border: 1px solid #e3e3e3;
    padding: 0 20px 0 10px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    border-radius: 3px;
    background: #fff;
  }

  .selection-show .arrow {
    display: inline-block;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #e3e3e3;
    width: 0;
    height: 0;
    margin-top: -1px;
    margin-left: 6px;
    margin-right: -14px;
    vertical-align: middle;
  }

  .selection-list {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    z-index: 5;
  }

  .selection-list li {
    padding: 5px 15px 5px 10px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    cursor: pointer;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .selection-list li.active {
    background: #4fc08d;
    color: #fff;
  }
  .selection-list li:hover {
    background: #e3e3e3;
  }
</style>
