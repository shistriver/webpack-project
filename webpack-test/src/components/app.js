import './css/common.css';
import layer from './layer/layer.js';

const App = function(){
  var dom = document.getElementById('app');
  console.log(layer)
  var layer = new layer();
  //dom.innerHTML = layer.tpl;
}

new App();
