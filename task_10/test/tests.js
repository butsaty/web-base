var expect    = require("chai").expect;
var functions = require('../app/js/polish-notation');

describe('Execute positive cases of finction extraOperators',function(){
  it('should have 15',function(){
    let res = functions.extraOperators("1 2 + 4 * 3 +");
    expect(res).to.equal(15);
  });

  it('should have 15',function(){
    let res = functions.extraOperators("1 2 % + 4 * 3 +");
    expect(res).to.equal(15);
  });

  it('should have 17',function(){
    let res = functions.extraOperators("1 2 + 4 * 3 + 2 +");
    expect(res).to.equal(17);
  });
});