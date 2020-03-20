import _ from 'lodash'
import './access/css/style.css';
import Icon from './access/image/a.png';
import Data from './access/data/data.xml';
function component() {
    var element = document.createElement('div');
      // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    console.log(Data);
    return element;
}
  
document.body.appendChild(component());