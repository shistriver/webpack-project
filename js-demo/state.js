/**
 * Created by shiyuanzhong on 2017/4/19.
 */
var ResultState = function(){
    var State = {
        state0: function(){
            console.log('第一种状态')
        },
        state1: function(){
            console.log('第二种状态')
        },
        state2: function(){
            console.log('第三种状态')
        },
        state3: function(){
            console.log('第四种状态')
        }
    }
    function show(result){
        State['state' + result] && State['state' + result]();
    }
    return {
        show: show
    }
}();

ResultState.show(3);
//ResultState.show(4);