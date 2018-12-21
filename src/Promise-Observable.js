"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var es6_promise_1 = require("es6-promise");
var operators_1 = require("rxjs/internal/operators");
/**
 * 1、Promise和Observable，它们之间是可以通过RxJS的API互相转换的
 */
// let somePromise = new Promise((resolve, reject) => {
//
// });
// let someObservable = Observable.create(observer => {
//     // observer.next(1);
// })
// const ob = from(somePromise); // Promise转为Observable
// const promise = someObservable.toPromise(); // Observable转为Promise
//
// console.log('Promise转为Observable: ', ob);
// console.log('Observable转为Promise: ', promise);
/**
 * 2、Promise 是异步的，Observable可异步可同步
 */
// Promise.resolve('promise').then(val => {
//     console.log(val);
// })
//
// // 同步执行的observable
// Observable.create(observer => {
//     observer.next('sync-observable');
// }).subscribe(val => {
//     console.log(val);
// })
//
// // 异步的setTimeout执行的observable
// Observable.create(observer => {
//     setTimeout(() => {
//         observer.next('async-setTimeout1-observable');
//     })
// }).subscribe(val => {
//     console.log(val);
// })
//
// console.log('console');
//
// setTimeout(() => {
//     console.log('setTimeout')
// })
//
// Observable.create(observer => {
//     setTimeout(() => {
//         observer.next('async-setTimeout2-observable');
//     })
// }).subscribe(val => {
//     console.log(val);
// })
//
// // 异步的Promise执行的observable
// Observable.create(observer => {
//     Promise.resolve().then(() => {
//         observer.next('async-promise-observable');
//     })
// }).subscribe(val => {
//     console.log(val);
// })
/**
 * 3、promise只能发出一个值，observable可以发出多个值，并且可中断
 */
// let p = new Promise((resolve, reject) => {
//     setInterval(() => {
//         resolve(1)
//     }, 2000)
// }).then(val => {
//     console.log(val);
// })
// let ob = Observable.create(observer => {
//     let _id = setInterval(() => {
//         observer.next('a')
//     }, 2000);
//
//     setTimeout(() => {
//         observer.complete();
//     }, 7000)
//
//     // return {
//     //     unsubscribe() {
//     //         clearInterval(_id);
//     //     }
//     // }
// }).subscribe(val => {
//     console.log(val);
// }, () => {
//     console.log('error!');
// }, () => {
//     console.log('complete!');
// })
// setTimeout(() => {
//     ob.unsubscribe();
// }, 5000)
//
//
// let ob2 = interval(1000).subscribe(val => {
//     console.log(val);
// })
//
// setTimeout(() => {
//     ob2.unsubscribe();
// }, 2500);
/*
 forkJoin 类似于promise的Promise.all   (都是有一个失败就整体进入异常)
 当所有 observables 完成时，将每个 observable
 的最新值作为数组发出
 */
var myPromise = function (val, delay) {
    return new es6_promise_1.Promise(function (resolve) {
        return setTimeout(function () { return resolve("\u8BF7\u6C42\u8FD4\u56DE\u503C\uFF1A" + val); }, delay);
    });
};
es6_promise_1.Promise.all([myPromise('hello', 3000), myPromise('world', 5000)]).then(function (_a) {
    var r1 = _a[0], r2 = _a[1];
    console.log('5s后返回:', r1 + " " + r2 + "!");
});
var example = rxjs_1.forkJoin(
// observable返回形式的请求
rxjs_1.of('Hello').pipe(operators_1.delay(3000)), rxjs_1.of('World').pipe(operators_1.delay(5000)));
//输出: ["Hello", "World"]
var subscribe = example.subscribe(function (val) { return console.log(val); });
