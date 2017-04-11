var herCo = function(gen) {

  var g = gen();
  if (!isGenerator(g)) return

  return new Promise(function(resolve, reject){

    walk(g, resolve, reject)
  })
}

// 迭代执行yield
function walk(gen, resolve, reject) {

  var result = gen.next()
  next()

  function next() {
    if (result.done) return resolve(result.value)

    if (isPromise(result.value)) {
      result.value.then(function(data) {
        result = gen.next(data)

        next()
      }).catch(function(error) {
        try {
          resolve(gen.throw(error).value)
        } catch (err){
          reject(err)
        }
        gen.throw(error)
      })
    }
  }

}

function isPromise(obj) {
  return obj instanceof Promise || typeof obj.then === 'function'
}

// function is
function isGenerator(gen){
  return typeof gen.next === 'function' && typeof gen.throw === 'function'
}
module.exports = herCo



// herCo(function* () {
//   try {
//     var result = yield Promise.reject("true");
//     var result2 = yield new Promise(function(resolve, reject) {
//       setTimeout(function(){
//         resolve('finished here')
//       }, 1000)
//     })
//     return result2;
//   } catch(error) {
//     return 'success'
//   }
//
// }).then(function (value) {
//   console.log(value);
// }, function (err) {
//   console.error('warning:' + err);
// });

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
