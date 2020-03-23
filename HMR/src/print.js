export default function printMe() {
    var element = document.createElement('div');
    console.log('I get called from 123456!');
    var btn2 = document.createElement('button');

    btn2.innerHTML = '11232221222';

    element.appendChild(btn2);
    document.body.appendChild(element);
  }