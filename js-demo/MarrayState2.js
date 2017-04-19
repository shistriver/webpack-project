/**
 * Created by shiyuanzhong on 2017/4/19.
 */
var MarryState = function() {
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
    var Action = {
        changeStates: function () {
            var arg = arguments;
            _currentStates = {};
            if(arg.length){
                for(var i=0; i<arg.length; i++){
                    _currentStates[arg[i]] = true;
                }
            }
            return this;
        },
        goes: function(){
            console.log('第一次触发');
            for(var k in _currentStates){
                states[k] && states[k]();
            }
            return this;
        }
    }
    return {
        change: Action.changeStates,
        goes: Action.goes
    }
};

MarryState().change('jump','shoot').goes().goes().change('move').goes();