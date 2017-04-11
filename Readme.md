## herCo
基于Generator做的node流程控制工具
## example


``` javascript
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
```

``` javascript
herCo(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  console.log(res); // => [1, 2, 3]
}).catch(onerror);
```

``` javascript
herCo(function *(){
  // yield any promise
  var result = yield Promise.resolve(true);
}).catch(onerror);

herCo(function *(){
  // resolve multiple promises in parallel
  var a = Promise.resolve(1);
  var b = Promise.resolve(2);
  var c = Promise.resolve(3);
  var res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
}).catch(onerror);

// errors can be try/catched
herCo(function *(){
  try {
    yield Promise.reject(new Error('boom'));
  } catch (err) {
    console.error(err.message); // "boom"
 }
}).catch(onerror);

function onerror(err) {
  // log any uncaught errors
  // co will not throw any errors you do not handle!!!
  // HANDLE ALL YOUR ERRORS!!!
  console.error(err.stack);
}
```
