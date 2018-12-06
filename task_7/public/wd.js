let wd = {
    createRoot: function (appName) {
      'use strict';
      let appRoutes = [];

      //public functions
      let routes = function(routeList) {
          appRoutes = routeList;
          return this;
      };

      let root = function(appName){
          return document.querySelector('[wd-root]', appName);
      }
      
      let navigate = function(url){
          var templateUrl = getRouteUrl(url);
          getPageContent(templateUrl)
          .then(content => {
            debugger;
            updateContent(content);
            history.pushState(content, null, url); 
          });
      };

      //private functions
      function getRouteUrl(key){
          return appRoutes.find(item => {
              return item.url === key;
          }).templateUrl;
      }

      function updateContent(template){
          root(appName).innerHTML = template;
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
      
      //public properties
      return {
          root: root,
          routes: routes,
          navigate: navigate        
      }  
    }
};