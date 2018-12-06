module.exports = {
     extraOperators: function(input) {
        var resultArr = [];
        input = input.split(" ");
        for(var i = 0; i < input.length; i++) {
            if(isNumeric(input[i])) {
                resultArr.push(input[i]);
            } else {
                var a = resultArr.pop();
                var b = resultArr.pop();

                if(input[i] === "%") {
                    i++;
                }
                if(input[i] === "+") {
                    resultArr.push(parseInt(a) + parseInt(b));
                } else if(input[i] === "-") {
                    resultArr.push(parseInt(b) - parseInt(a));
                } else if(input[i] === "*") {
                    resultArr.push(parseInt(a) * parseInt(b));
                }
            }
        }
        if(resultArr.length > 1) {
            return "error";
        } else {
            return resultArr.pop();
        }
    }
};

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}