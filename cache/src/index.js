import print from './print'

async function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
      const element = document.createElement('div');
      const button = document.createElement('button');
      const br = document.createElement('br');

      button.innerHTML = 'Click me and look at the console!';
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
      element.appendChild(br);
      element.appendChild(button);
    
    // Note that because a network request is involved, some indication
    // of loading would need to be shown in a production-level site/app.
    button.onclick = e => import(/* webpackChunkName: "math" */ './math').then(module => {
      const math = module.default;
      math();
    });
    print();
   
      console.log('sss');
      return element;
  });
  }
 
  getComponent().then(component => {
    document.body.appendChild(component);
  });