(
  function() {
  'use strict';

  const app = wd.createRoot('app')
    .routes([
       { url: '/', templateUrl: 'home.html' },
       { url: '/sign-in', templateUrl: 'sign-in.html' }
    ]);

  const refArray  = [document.getElementById('home'),
                     document.getElementById('sign-in')];  
 
  function addEventClick(item) {
    item.addEventListener("click", e => {  
      app.navigate(e.target.getAttribute('href'));
      e.preventDefault();
    });
  }

  app.navigate('/');

  window.onload = function() {
    refArray.forEach(item => {
      addEventClick(item);
    });

    window.addEventListener("popstate", e => {
      app.root().innerHTML = e.state;
    });   
  }
})();