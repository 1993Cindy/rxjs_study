import {concat, forkJoin, interval, merge, of, throwError} from "rxjs/index";
import {catchError, delay, filter, map, mapTo, mergeMap, switchMap, take} from "rxjs/internal/operators";
/**
 * 操作符（例如当observable（可观察对象）被订阅后(调用可观察对象的subscribe()方法)，对提供出来的值进行操作，如过滤filter等等，再给观察者observer）
 */

/**
 * 1、of  按顺序发出任意数量的值
 */
// const ofSource = of({ name: 'fuyu' }, [1, 2, 3], function hello() {
//     return 'Hello';
// });
// // 输出: {name: 'fuyu}, [1,2,3], function hello() { return 'Hello' }
// ofSource.subscribe(val => console.log(val));


/**
 * 2、 interval 基于给定时间间隔发出数字序列; take  在完成前发出N个值(N由参数决定)
 */
// 每1秒发出数字序列中的值
// const intervalSource = interval(1000);
// // 数字: 0,1,2,3,4,5....
// // intervalSource.subscribe(val => console.log(val));
// intervalSource.pipe(take(2)).subscribe(val => {
//     console.log('take(2)后: ', val);
// })


/**
 * 3、 map  对源 observable 的每个值应用投射函数。filter 过滤      (观察每个发射值被操作的顺序（一个一个进行的）)
 */
// 发出 (1,2,3,4,5)
// const ofSource = of(1, 2, 3, 4, 5);
// // 每个数字加10
// const example = ofSource.pipe(map((val: number) => val + 10), filter(val => val > 13));
// // 输出: 14,15
// example.subscribe(val => console.log(val));

/**
 * catchError 处理 observable 序列中的错误（要在 catch 函数中返回一个 observable !）
 */
// const source = throwError('This is an error!');
// // 处理错误，并返回带有错误信息的 observable
// const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
// // 输出: 'I caught: This is an error'
// const subscribe = example.subscribe(val => console.log(val));


/**
 * 4、merge 将多个 observables 转换成单个 observable 。mapTo  将每个发出值映射成常量
 */

// const example = merge(
//     interval(1000).pipe(mapTo(1)),
//     interval(4100).pipe(mapTo(4.1)),
// );
// example.subscribe(val => console.log(val))


/**
 * 5 concat  按照顺序，前一个 observable 完成了再订阅下一个 observable 并发出值。
 */

// const example = concat(
//     interval(1000).pipe(mapTo(1), take(6)),
//     interval(4100).pipe(mapTo(4.1)),
// );
// example.subscribe(val => console.log(val))


//定时发请求
// 4、mergeMap 映射成 observable 并发出值
// 5、switchMap 映射成 observable，在每次发出时，会取消前一个内部 observable (你所提供函数的结果) 的订阅，
// 然后订阅一个新的 observable
//


// 5秒后发出0，mergeMap把它映射成Observable（也就是第一个去发请求的那个observable），
// 再过2.5秒后也就是7.5秒的时候返回"我是请求结果！0"；
// 10秒后发出1，mergeMap把它映射成Observable（也就是第二个去发请求的那个observable），
// 再过2.5秒后也就是12.5秒的时候返回"我是请求结果！1"；
// 15秒后发出2，mergeMap把它映射成Observable（也就是第三个去发请求的那个observable），
// 再过2.5秒后也就是17.5秒的时候返回"我是请求结果！2"；（但是在16秒的时候，被取消订阅了，所以没有进行不到这里，换成18秒取消订阅就能获取到这个结果）
// let s1 = interval(5000)
//         .pipe(
//             mergeMap(val => {
//                 // console.log('val', val);
//                 return of(`我是请求结果！${val}`).pipe(delay(2500)); // 这里相当于2500ms后返回请求内容
//             })).subscribe(val => {
//             console.log(val);
//         });
// setTimeout(() => {
//     s1.unsubscribe();
// }, 16000);

// 我是请求结果！0
// 我是请求结果！1
// 我是请求结果！2
// 我是请求结果！3
// 我是请求结果！4
// 我是请求结果！5
// 我是请求结果！6
// 我是请求结果！7
    // 第九次的时候，过了9秒，9+2.5 = 11.5 > 10.6,并订阅不到结果，所以改成11.6就能返回"我是请求结果！8"
// let s2 = interval(1000)
//         .pipe(
//             mergeMap(val => {
//                 // console.log('val', val);
//                 return of(`我是请求结果！${val}`).pipe(delay(2500)); // 这里相当于2500ms后返回请求内容
//             })).subscribe(val => {
//             console.log(val);
//         });
// setTimeout(() => {
//     s2.unsubscribe();
// }, 10600);



// switchMap 映射成 observable，在每次发出时，会取消前一个内部 observable (你所提供函数的结果) 的订阅，然后订阅一个新的 observable
    // 每隔一秒去发请求，但是每个请求要2.5秒，请求的这个observable还没返回就被取消掉了，替换成新的observable，所以一个请求结果都订阅不到，10.6秒后取消
    // mergeMap 场景：点击一个按钮，2.5s后打印一条消息 （每个都独立）
    // switchMap 场景：点击一个按钮，要2.5s后打印一条消息，如果2.5s内再次点击，就会重置时间（超过2.5后再点击无所谓）
// let s3 = interval(1000)
//     .pipe(
//         take(8), // 加这个条件会有一个结果"我是请求结果！7"
//         switchMap(val => {
//             // console.log('val', val);
//             return of(`我是请求结果！${val}`).pipe(delay(2500)); // 这里相当于2500ms后返回请求内容
//         })).subscribe(val => {
//         console.log(val);
//     });
// setTimeout(() => {
//     s3.unsubscribe();
// }, 10600);


