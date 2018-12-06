(
  function() {
  'use strict';

  const app = wd.createRoot('app')
    .routes([
        { url: '/', templateUrl: 'home.html' },
        { url: '/sign-in', templateUrl: 'sign-in.html' }
    ]);
  app.component(
    'my-link',
    {
      template: '<a href=""></a>',
      beforeMount: function (component, item, componentData){
        item.innerHTML = componentData.innerHTML;
        item.setAttribute('href', componentData.href);
        item.addEventListener('click', (event)=> {
          let url = item.getAttribute('href');
          app.navigate(url);
          event.preventDefault();
        });
      }
    }
  );
  app.navigate('/');

  window.onload = function() {
    window.addEventListener("popstate", e => {
      app.root().innerHTML = e.state;
    });   
  }
})();