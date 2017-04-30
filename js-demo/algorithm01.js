/**
 * Created by shiyuanzhong on 2017/4/23.
 */

//查找字符串中出现最多的字符和个数


function quickSort(arr) {
    if(arr.length <= 1){
        return arr;
    }
    var index = Math.floor(arr.length / 2);
    var value = arr.splice(index, 1)[0];
    var left = [], right = [];
    for(var i=0; i<arr.length; i++){
        var cur = arr[i];
        (cur > value) ? right.push(cur) : left.push(cur);
    }
    return quickSort(left).concat([value], quickSort(right));
}
var arr = [9,8,3,4,6,1,2,3,11];

console.log(quickSort(arr));
