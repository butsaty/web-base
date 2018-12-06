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
      };
      
      let navigate = function(url){
          var templateUrl = getRouteUrl(url);
          getPageContent(templateUrl)
          .then(content => {
            updateContent(content);
            history.pushState(content, null, url); 
          });
      };

      let component = (name, description) => {          
          let getData = (element) => {
              let data = {};
              data.innerHTML = element.innerHTML;
              Array.prototype.slice.call(element.attributes)
                  .forEach(function(attr) {
                      data[attr.name] = attr.value
                  });
              return data;
          };

          let htmlPrototype = Object.create(HTMLElement.prototype);
          htmlPrototype.createdCallback = function() {
              let newData = new DOMParser()
                  .parseFromString(description.template,'text/html')
                  .body
                  .firstChild;

              let oldData = getData(this);
              description.beforeMount(this, newData, oldData);

              this.parentNode.replaceChild(newData, this);
          };

          document.registerElement(name, {
              prototype: htmlPrototype
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
          navigate: navigate,
          component: component
      };
    }
};