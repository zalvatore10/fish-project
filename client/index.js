/* eslint-disable no-console */
/* eslint-disable no-alert */

import './stylesheets/style.css';
import './stylesheets/mystyles.css';

console.log('Webpack Working');
// Default parameters Es6/2015
const show = (m = 'buen dia!!') => {
  alert(m);
};

show();

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('Calling an async function');
  const result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();
