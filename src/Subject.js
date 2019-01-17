"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Subject is like an Observable, but can multicast to many Observers.
 * Subjects are like EventEmitters: they maintain a registry of many listeners.
 *
 *
 * Every Subject is an Observable. Given a Subject, you can subscribe to it,
 * providing an Observer, which will start receiving values normally.
 *
 *
 * Every Subject is an Observer. It is an object with the methods next(v), error(e), and complete().
 * To feed a new value to the Subject, just call next(theValue),
 * and it will be multicasted to the Observers registered to listen to the Subject.
 *
 * Observable被不同的观察者订阅是相互独立的，但是subject既是一个observable，可以被订阅来获取值，
 * 也是一个observer，有observer的next()、error()、complete()方法
 * (简单来说就是它可被订阅获取值，也可以主动发送值给oberver,并且是多播的)
 */
// const subject = new Subject<number>();
// // 这里作为可观察对象
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });
// // 这里subject作为观察者
// subject.next(1);
// subject.next(2);
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// 这里通过subject使单播的observable实现了多播
// const subject = new Subject<number>();
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });
//
// const observable = from([1, 2, 3]);
// const observer = (val) => {
//     console.log('单播：', val);
// };
// observable.subscribe(observer);
// observable.subscribe(observer);
// observable.subscribe(subject); // 这里subject作为Observable的观察者，调用了next方法，（但同时作为可观察对象，发出了值,使订阅它的观察者同时获取到了值）
// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
/**
 * BehaviorSubject,有个初始值（被订阅后立即发送），并且会记录最新的值作为初始值
 */
// const subject = new BehaviorSubject(0); // 0 is the initial value
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
//
// subject.next(1);
// subject.next(2);
//
// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });
//
// subject.next(3);
// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
/**
 * ReplaySubject 缓存3个值给新的订阅
 * @type {ReplaySubject}
 */
// const subject = new ReplaySubject(3); // buffer 3 values for new subscribers
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
//
// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);
//
// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });
//
// subject.next(5);
// Logs:
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerB: 2
// observerB: 3
// observerB: 4
// observerA: 5
// observerB: 5
/**
 * ReplaySubject 缓存100个值给新的订阅，并且这些值要在500ms内
 * @type {ReplaySubject}
 */
// const subject = new ReplaySubject(100, 500 /* windowTime */);
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
//
// let i = 1;
// setInterval(() => subject.next(i++), 200);
//
// setTimeout(() => {
//     subject.subscribe({
//         next: (v) => console.log(`observerB: ${v}`)
//     });
// }, 1000);
// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerA: 4
// observerA: 5
// observerB: 3
// observerB: 4
// observerB: 5
// observerA: 6
// observerB: 6
// ...
/**
 * AsyncSubject 只会把最新的值发给observer观察者，并且要到complete()
 * @type {AsyncSubject}
 */
// const subject = new AsyncSubject();
//
// subject.subscribe({
//     next: (v) => console.log(`observerA: ${v}`)
// });
//
// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);
//
// subject.subscribe({
//     next: (v) => console.log(`observerB: ${v}`)
// });
//
// subject.next(5);
// subject.complete();
// Logs:
// observerA: 5
// observerB: 5 
