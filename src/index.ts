
import {Observable, of} from "rxjs";
import {Promise} from "es6-promise";
import {map} from "rxjs/internal/operators";

/**
 * Observable (可观察对象): 表示一个概念，这个概念是一个可调用的未来值或事件的集合。(核心类型)
 Observer (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
 Subscription (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
 Operators (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap
 等这样的操作符来处理集合。
 Subject (主题): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
 Schedulers (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或
 requestAnimationFrame 或其他
 *
 */


/**
 * 举个例子 假设可观察对象（Observable）是一家报纸供应商，你观察者（observer），你只要订阅了报纸（调用observable的subscribe方法），
 * 就会把报纸给你发送过来，
 * 至于报纸是从什么纸做的，然后加工印刷什么的，你观察者不需要关心，你只管看就行了（用它给的返回值就行了），
 * 中间的加工印刷等就是操作符（Operators），用来加工成报纸，
 * 但是我要怎么把报纸给你，就需要你观察者（observer）提供方式（observer必须要有next方法）；
 * 报纸送的过程中出错了（observer可以有error方法，可以没有，你觉得
 * 没送给你无所谓）；报纸一直送下去或者送完了告知你（需要observer的complete方法，该方法也可以没有，直接送完不送了）
 * 但只要调用了observer的error或者complete方法，后面再用next发送给你你也收不到了。
 * 只要你订阅了，报纸供应商会给你提供取消订阅的方式unsubscribe()方法,不要报纸了就调用该方法.
 * 特点：不订阅不会去加工报纸（只有订阅了才会开始处理）
 */

// 创建可观察对象（一般会用一些操作符去创建，不自己写，如of、interval、from等）
const ob = Observable.create(function subscribe(observer) {
    let n = 1;
    // 每隔一秒送你一份纸
    let _id = setInterval(() => {
        observer.next(`纸${n}`);
        n++;
    }, 1000);
    // 5秒后送完了，通知你
    setTimeout(() => {
        clearInterval(_id);
        observer.complete();
    }, 5001);
    return {
        // 给你提供取消订阅的方法
        unsubscribe() {
            clearInterval(_id);
        }
    }

});
ob.subscribe({
    next() {

    }
})




// 创建观察者
const observer = {
    next(val) {
        // 收到一份报纸
        console.log(`收到一份报纸: ${val}`);
    },
    error(err) {
        // 送报纸中出问题了（以后也不会送了）
        console.log('送报纸中出问题了！')
    },
    complete() {
        console.log(`送完了，以后也不会送了`)
    }
}

// 加工成报纸
const ob2 = ob.pipe(map(val => {
    console.log(`${val}加工成报纸`);
    return `报${val}`;
}));

// 订阅
const subscription1 = ob2.subscribe(observer);

// 两个是相互独立的，不共享（subject是多播的）
// const subscription2 = ob2.subscribe(observer);

// 4.5s后取消订阅，不要报纸了
// setTimeout(() => {
//     console.log('我自己不要报纸了.')
//     subscription1.unsubscribe();
// }, 4500)