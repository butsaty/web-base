(function() {
  'use strict';

  const routes = [
    { url: '/', template: '<h1>Home</h1>' },
    { url: '/sign-in', template: '<h1>Sign-In</h1>' },
    { url: '/sign-up', template: '<h1>Sign-Up</h1>' }
  ];
  const container = document.getElementById('app');
  const refArray = [document.getElementById('homeRef'),
                    document.getElementById('signInRef'),
                    document.getElementById('signUpRef')];  

  function getTemplate(key){
    return routes.find(item => {
      return item.url === key;
    }).template;
  }

  function updateTemplate(template){
    container.innerHTML = template;
  }  

  function addEventClick(item) {
    item.addEventListener("click", e => {      
      var template = getTemplate(e.target.getAttribute('href'));      
      updateTemplate(template);   

      history.pushState(template, null, item.href);
      e.preventDefault();
    })
  }

  window.onload = function() {
    refArray.forEach(item => {
      addEventClick(item);
    });

    window.addEventListener("popstate", e => {
      updateTemplate(e.state);
    });

    var template = getTemplate(location.pathname);
    updateTemplate(template);
    history.replaceState(template, null, null);
  }

})();