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

    if (isThunkFunction(result.value)) {
      result.value.call(null, function(err, data) {
        if (err) {
          try {
            resolve(gen.throw(err).value)
          } catch (error) {
            reject(error)
          }
          // 只要出错就将整个yield结束，不在next()
          return
        }

        result = gen.next(data)
        next()
      })
    }


  }

}

function isPromise(obj) {
  return obj instanceof Promise || typeof obj.then === 'function'
}

/*
  thunkFunction: 例如
  const thunk = function(fileName, codeType) {
    return function(callback){}
  }
*/
function isThunkFunction(obj) {
  return typeof obj === 'function'
}

function isGenerator(gen){
  return typeof gen.next === 'function' && typeof gen.throw === 'function'
}

module.exports = herCo
