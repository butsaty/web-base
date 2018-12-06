(function() {
  'use strict';

  const routes = [
    { url: '/', templateUrl: 'home.html' },
    { url: '/sign-in', templateUrl: 'sign-in.html' }
  ];
  const container =  document.getElementById('main-content');
  const refArray  = [document.getElementById('home'),
                     document.getElementById('sign-in')];  

  function getRouteUrl(key){
    return routes.find(item => {
      return item.url === key;
    }).templateUrl;
  }

  function getPageContent(url){
    return fetch(url)
      .then(response => {
        return response.text();
      })
      .then(text => { 
        return text;
      })
      .catch(e => console.log(e));
  }

  function updateContent(template){
    container.innerHTML = template;
  }

  function addEventClick(item) {
    item.addEventListener("click", e => {  
      var templateUrl = getRouteUrl(e.target.getAttribute('href'));

      getPageContent(templateUrl)
      .then(content => {
        updateContent(content);
        history.pushState(content, null, item.href); 
      });
      e.preventDefault();
    });
  }

  window.onload = function() {
    refArray.forEach(item => {
      addEventClick(item);
    });

    window.addEventListener("popstate", e => {
      updateContent(e.state);
    });

    getPageContent(getRouteUrl(location.pathname))
    .then(content => {
      updateContent(content);
      history.replaceState(content, null, null);
    }); 
  }

})();