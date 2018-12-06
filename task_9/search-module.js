(function() {
  'use strict';
  
  const arr = [ 
      'Amazing arrivals', 
      'American lifestyle', 
      'I kind of love that',
      'Get with the program',
      'Just fly'];  

  module.exports = {
      searchByQuery: function(substr) { 
        let result = new Array();
        arr.forEach(function(item) {
            if(item.toLowerCase().indexOf(substr.toLowerCase()) != -1)
                result.push(item);                
        });

        return result;
    }
  }
})();