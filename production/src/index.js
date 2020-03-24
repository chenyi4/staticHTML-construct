import { cube , square} from './math.js';
import './../access/index.css'
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('div');
  var element = document.createElement('pre');
   // lodash 是由当前 script 脚本 import 导入进来的
  element.innerHTML = [
    'Hello webpack2!',
    '5 cubed is equal to ' + cube(5)+square(2)
  ].join('\n\n');
    
    return element;
}
  
document.body.appendChild(component());
