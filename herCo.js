var herCo = function(gen) {

  var g = gen();
  if (!isGenerator(g)) return

  return new Promise(function(resolve, reject){

    walk(g, resolve)
  })
}

// 迭代执行yield
function walk(gen, resolve) {

  var result = gen.next()
  next()
  
  function next() {
    console.log(result)
    if (result.done) return resolve(result.value)

    if (isPromise(result.value)) {
      result.value.then(function(data) {
        result = gen.next(data)

        next()
      }).catch(function(error) {
        gen.throw(error)
      })
    }
  }

}

function isPromise(obj) {
  return obj instanceof Promise || typeof obj.then === 'function'
}

function isGenerator(gen){
  return typeof gen.next === 'function' && typeof gen.throw === 'function'
}
module.exports = herCo



herCo(function* () {
  var result = yield Promise.resolve(true);
  var result2 = yield new Promise(function(resolve, reject) {
    setTimeout(function(){
      resolve('finished here')
    }, 1000)
  })
  return result2;
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err);
});
