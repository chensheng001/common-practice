/* -------------------------- ES6语法特性demo ------------------------ */

/* ------------ let 和 const 命令 */

function f1() {
  // 变量污染
  var tmp = new Date();
  function f() {
    console.log(tmp);
    if (false) {
      var tmp = "hello world";
    }
  }
  f();

  // 变量泄露
  var s = "hello";
  for (var i = 0; i < s.length; i++) {
    console.log(s[i]);
  }
  console.log(i);
}
f1();

/* --------------- 变量的解构赋值 */
function compileFn() {
  //数组的解构
  let [a, b, c] = [1, 2, 3];

  //对象的解构
  let { foo, bar } = { foo: "aaa", bar: "bbb" };

  // 字符串的解构
  const [a, b, c, d, e] = "hello";
}

/* --------------- 字符串的扩展 */

// 模板字符串

// 传统jq拼接
/* 
$('#result').append(
    'There are <b>' + basket.count + '</b> ' +
    'items in your basket, ' +
    '<em>' + basket.onSale +
    '</em> are on sale!'
);
 */

// now...

/* $('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`); */

// 扩展方法 includes(), startsWith(), endsWith()

/* --------------- 函数的扩展 */

function f2() {
  // rest参数
  function add(...values) {
    let sum = 0;
    for (var val of values) {
      sum += val;
    }
    return sum;
  }
  add(2, 5, 3);

  function p() {
    // ES5写法
    return Array.prototype.slice.call(arguments);
  }
  p(1, 2, 3, 4, 5);

  //箭头函数

  // 正常函数写法
  let aa = function (v) {
    return v * 2;
  };

  // 箭头函数写法
  let bb = (v) => v * 2;
}

/* --------------- 数组的扩展 */

function f3() {
  // 扩展运算符 ...
  console.log(...[1, 2, 3]);
  let arra = [1, 2, 3];
  let arrb = [4, 5, 6];
  let result = [...arra, ...arrb];

  // Array.from();
  let arrayLike = {
    0: "a",
    1: "b",
    2: "c",
    length: 3,
  };

  // ES5的写法
  var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
  // ES6的写法
  let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

  // Array.of();
  Array.of(3, 11, 8); // [3,11,8]

  // Array.find();
  console.log([1, 4, -5, 10].find((n) => n < 0));

  // Array.includes()
  console.log([1, 2, 3].includes(2));

  // Array.flat()
  console.log([1, 2, [3, 4]].flat());
}
// f3();

/* --------------- 对象的扩展 */
function f4() {
  // 解构赋值
  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };

  // Object.assign
  let obj1 = { a: 1 };
  let obj2 = { b: 1 };
  let infoPage1 = Object.assign(obj1, obj2);
  let infoPage2 = { ...obj1, ...obj2 };

  // Object.is()
  Object.is("foo", "foo");
  Object.is({}, {});

  //Object.keys() ; Object.values() ; Object.entries()
}
// f4();

/* --------------- Set 和 Map 数据结构 */

function f5() {
  // Set  方法add,delete,has

  // 数组相互转换,数组去重, 数组交集，并集
  let set = new Set([1, 2, 3, 4, 4]);
  console.log([...set]);

  let arr1 = [1, 2, 3];
  let arr2 = [2, 3, 4];
  let union = [...new Set([...arr1, ...arr2])];
  console.log(union);

  // Map  方法 set, has, delete
  const map = new Map([
    ["name", "张三"],
    ["title", "Author"],
  ]);
}
// f5();

/* --------------- Proxy */

function f6() {
  var obj = new Proxy(
    { a: 1 },
    {
      get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
      },
      set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
      },
    }
  );
  console.log(obj.a);
  obj.a = 2;
}
// f6();

/* --------------- async 函数 */

function f7() {
  // 多个异步操作
  // 回调函数
  function one(callback) {
    console.log(1);
    return callback;
  }

  function two(callback) {
    console.log(2);
    return callback;
  }

  function three() {
    console.log(3);
  }

  // one(two(three()));

  function promise1() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("promise1");
      }, 2000);
    });
  }

  function promise2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("promise2");
      }, 1000);
    });
  }

  // promise 写法
  // promise1().then(data1 => {
  //     console.log(data1);
  //     promise2().then(data2 => {
  //         console.log(data2);
  //     })
  // });

  function promise3() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("promise3");
      }, 2000);
    });
  }

  function promise4() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("promise4");
      }, 1000);
    });
  }

  async function done() {
    let result3 = await promise3();
    let result4 = await promise4();
    console.log(result3, result4);
  }
  // done();
}
// f7();

/* --------------- class类 */

function f8() {
  //传统实例对象
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
  };

  var p = new Point(1, 2);

  // new
  class Point2 {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    toString() {
      return "(" + this.x + ", " + this.y + ")";
    }
  }

  // 关于类   继承  super 静态方法
  class A {
    static method() {}
  }

  class B extends A {
    constructor() {
      super();
    }
  }
}

/* --------------- Module 的语法 */

function f9() {
  //   export default function foo() {
  //     console.log("foo");
  //   }
  //   import { func1, func2 } from "moduleA";
}
