/**
 * Created by shiyuanzhong on 2017/4/20.
 */

var a = 9;
function fn() {
    a = 0;
    return function (b) {
        return b + a++;
    }
}

var f = fn();
var m = f(5);
console.log(m);//5

var n = fn()(5);
console.log(n);//5

var x = f(5);
console.log(x);//6

console.log(a);//2