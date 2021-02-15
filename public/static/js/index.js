import Home from './view/Home.js';
import Todolist from './view/Todolist.js';

// navigate path without re-rendering
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// client-side router
const router = async () => {
  const routes = [
    // if user goes to the PATH, run VIEW
    { path: '/', view: Home },
    { path: '/todolist', view: Todolist },
    // { path: '/painter', view: () => console.log('Viewing painter') },
    // { path: '/calculator', view: () => console.log('Viewing calculator') },
    // { path: '/clock', view: () => console.log('Viewing clock') },
  ];

  // Check if each route matches with the current location
  const matchingRoutes = routes.map((route) => {
    return {
      route: route,
      isMatched: location.pathname === route.path,
    };
  });

  // find the route which is the current path (isMatched is true)
  let current = matchingRoutes.find((route) => route.isMatched);

  // if the path is not found -> default is root path
  if (!current) {
    current = {
      route: routes[0],
      isMatched: true,
    };
  }

  const view = new current.route.view(); // create the instance (view is class)
  document.querySelector('#app').innerHTML = await view.getHtml();
};

// get page active when history goes backward & forward
window.addEventListener('popstate', router);

// run router() after all of DOM has loaded up
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href); // navigate to href path
    }
  });
  router();
});
