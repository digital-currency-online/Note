// 看Promise的执行顺序
new Promise(resolve => {
    console.log(1);
    resolve(3);
}).then(num => {
    console.log(num)
});
console.log(2)

// 这道题的输出是123


// 如果在promise里面再加一个promise：

new Promise(resolve => {
    console.log(1);
    resolve(3);
    Promise.resolve().then(()=> console.log(4))
}).then(num => {
    console.log(num)
});
console.log(2)

// 执行顺序是1243，第二个Promise的顺序会比第一个的早，所以直观来看也是比较奇怪，这是为什么呢？

// Promise的实现有很多库，有jQuery的deferred，还有很多提供polyfill的，如es6-promise，lie等，
// 它们的实现都基于Promise/A+标准，这也是ES6的Promise采用的。

// JavaScript 回调函数存在的问题
/*
由于浏览器的这种内部事件循环机制，
所以JavaScript一直以callback回调的方式来处理事件任务。
因此无所避免的对于多个的JavaScript异步任务的处理，将会遇见”callback hell“（回调地狱），使得这类代码及其不可读和难易维护。
*/
asyncTask1(data, function (data1){

    asyncTask2(data1, function (data2){

        asyncTask3(data2, function (data3){
                // .... 魔鬼式的金字塔还在继续
        });

    });

});

// Promise的作用
asyncTask1(data)
    .then(function(data1){
        return asyncTask2(data1);
    })
    .then(function(data2){
       return asyncTask3(data2);
    })
    // 仍然可以继续then方法

// Promise将原来回调地狱中的回调函数，从横向式增加巧妙的变为了纵向增长。以链式的风格，纵向的书写，使得代码更加的可读和易于维护。

// 实例

// 多个异步任务的串行处理
// 使用Angular中$http的实现如下：
$http.get('/demo1')
 .then(function(data){
     console.log('demo1', data);
     return $http.get('/demo2', {params: data.result});
  })
 .then(function(data){
     console.log('demo2', data);
     return $http.get('/demo3', {params: data.result});
  })
 .then(function(data){
     console.log('demo3', data.result);
  });

// 多个异步任务的串行处理
// 在有些场景下，我们所要处理的多个异步任务之间并没有像上例中的那么强的依赖关系，
// 只需要在这一系列的异步任务全部完成的时候执行一些特定逻辑。
// 这个时候为了性能的考虑等，我们不需要将它们都串行起来执行，
// 并行执行它们将是一个最优的选择。如果仍然采用回调函数，则这是一个非常恼人的问题。利用Promise则同样可以优雅的解决它：
$q.all([$http.get('/demo1'),
        $http.get('/demo2'),
        $http.get('/demo3')
])
.then(function(results){
    console.log('result 1', results[0]);
    console.log('result 2', results[1]);
    console.log('result 3', results[2]);
});





