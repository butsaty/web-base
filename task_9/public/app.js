(
  function() {
  'use strict';

  let awesomplete; 
  let searchComponent;

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
  app.component(
    'my-search',
    {
      template: '<input type="text">',
      beforeMount: function (component, item, componentData){
        searchComponent = item;
        item.innerHTML = componentData.innerHTML;
        item.setAttribute('placeholder', componentData.placeholder);
        item.setAttribute('size', componentData.size);
        
        item.addEventListener('input', (event)=> {
            fetch('http://127.0.0.1:8080/api/search?query=' + event.target.value, {
              method: 'GET',
            })
            .then(response => {
              response.json()
              .then(result => {
                awesomplete._list = result;
              })              
            });            
        });        
      }
    }    
  );

  app.navigate('/');

  window.onload = function() {
    awesomplete = new Awesomplete(searchComponent);

    window.addEventListener("popstate", e => {
      app.root().innerHTML = e.state;
    });   
  }  
})();