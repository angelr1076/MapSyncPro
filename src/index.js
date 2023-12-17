import './styles/style.css';

const main = document.querySelector('#main');

function myComponent() {
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'content', 'id', 'content');

  return mainContainer;
}

main.appendChild(myComponent());
