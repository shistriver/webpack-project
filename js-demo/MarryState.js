/**
 * Created by shiyuanzhong on 2017/4/19.
 */
var MarryState = function() {
    //内部状态私有变量
    var states = {
        jump: function(){
            console.log('jump');
        },
        move: function(){
            console.log('move');
        },
        shoot: function(){
            console.log('shoot');
        },
        squat: function(){
            console.log('squat');
        }
    };
    //动作控制类
    var Action = {
        changeState: function(){
            //组合动作通过传递多个参数实现
            var arg = arguments;
            _currentsState = {};
            //如果有动作则添加动作
            if(arg.length){
                //遍历动作
                for(var i=0; i<arg.length; i++){
                    _currentsState[arg[i]] = true;
                }
            }
            //返回动作控制类
            return this;
        },
        //执行动作
        goes: function() {
            console.log('触发第一次动作');
            //遍历内部状态保存的动作
            for(var i in _currentsState){
                states[i] && states[i]();
            }
            return this;
        }
    }
    return {
        change: Action.changeState,
        goes: Action.goes
    }
};

MarryState().change('jump', 'shoot').goes().goes().change('shoot').goes();