// navigate path without re-rendering
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// client-side router
const router = async () => {
  const routes = [
    // if user goes to the PATH, run VIEW
    { path: '/', view: () => console.log('Viewing Home') },
    { path: '/todolist', view: () => console.log('Viewing todolist') },
    { path: '/painter', view: () => console.log('Viewing painter') },
    { path: '/calculator', view: () => console.log('Viewing calculator') },
    { path: '/clock', view: () => console.log('Viewing clock') },
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

  console.log(current.route.view());
};

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
