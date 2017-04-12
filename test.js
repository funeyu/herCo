var fs = require("fs");
var herCo = require('./herCo')


herCo(function *(){
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(function(error) {
  console.log(error)
});

// ===========================================================
herCo(function*(){
    var data1 = yield readFile('herCo.js');
    console.log(data1);
    var data2 = yield readFile('herCo.js');
    console.log(data2);
});

function readFile( path ){
    return function(callback){
       fs.readFile( path , 'utf-8', callback);
    }
}

// ============================================================
herCo(function* () {
  try {
    var result = yield Promise.reject("true");
    var result2 = yield new Promise(function(resolve, reject) {
      setTimeout(function(){
        resolve('finished here')
      }, 1000)
    })
    return result2;
  } catch(error) {
    return 'success'
  }

}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error('warning:' + err);
});

// ===============================================================
herCo(function* () {
    var result = yield Promise.reject("true");
    var result2 = yield new Promise(function(resolve, reject) {
      setTimeout(function(){
        resolve('finished here')
      }, 1000)
    })
    return result2;

}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error('warning:' + err);
});
