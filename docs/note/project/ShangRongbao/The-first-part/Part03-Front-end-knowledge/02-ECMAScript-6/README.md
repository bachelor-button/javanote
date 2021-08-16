# 02-ECMAScript 6 简介

## 一、ECMAScript

### 1、ECMA

ECMA（European Computer Manufacturers Association）中文名称为欧洲计算机制

造商协会，这个组织的目标是评估、开发和认可电信和计算机标准。

1994年后该组织改名为Ecma国际。

### 2、ECMAScript

ECMAScript 是由 Ecma 国际通过 ECMA-262 标准化的脚本程序设计语言。

### 3、什么是 ECMA-262

Ecma 国际制定了许多标准，而 ECMA-262 只是其中的一个

### 4、ECMA-262 历史

ECMA-262（ECMAScript）历史版本查看网址

http://www.ecma-international.org/publications/standards/Ecma-262-arch.htm

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |
|      |      |      |
|      |      |      |
|      |      |      |
|      |      |      |

### 5、ECMAScript 和 JavaScript 的关系

一个常见的问题是，ECMAScript 和 JavaScript 到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 Jscript 和 ActionScript）

## 二、基本语法

ES6相对之前的版本语法更严格，新增了面向对象的很多特性以及一些高级特性。本部分只学习项目开发中涉及到ES6的最少必要知识，方便项目开发中对代码的理解。

### 1、let声明变量

创建文件夹02-ES6-demo，创建 01-let.js

```js
//声明变量
let a
let b,c,d
let e = 100
let f = 521, g = 'iloveyou', h = []

//1. 变量不能重复声明
let name = 'Helen'
let name = '环'//报错：SyntaxError: Identifier 'name' has already been declared

//2. 存在块儿级作用域
// if else while for 
{
   let star = 5
}
console.log(star)//报错：star is not defined

//3. 不存在变量提升
console.log(song)//报错：Cannot access 'song' before initialization
let song = '依然爱你';
```

### 2、const声明常量

创建 02-const.js

```js
//声明常量
const SCHOOL = '尚硅谷'
console.log(SCHOOL)

//1. 一定要赋初始值
const A//报错：SyntaxError: Missing initializer in const declaration

//2. 一般常量使用大写(潜规则)
const a = 100

//3. 常量的值不能修改
SCHOOL = 'ATGUIGU'//报错：TypeError: Assignment to constant variable.

console.log(PLAYER)//报错：ReferenceError: PLAYER is not defined

//4. 对于数组和对象的元素修改, 不算做对常量的修改, 不会报错
const TEAM = ['康师傅','海狗人参丸','雷神','阳哥']
TEAM.push('环') //常量地址不变，不会报错
TEAM = 100 //报错：TypeError: Assignment to constant variable.
```

### 3、解构赋值

创建 03-解构赋值.js

```js
//ES6 允许按照一定模式从数组和对象中提取值，对变量进行赋值，
//这被称为解构赋值。
//1. 数组的解构
const F4 = ['小沈阳','刘能','赵四','宋小宝']
let [xiao, liu, zhao, song] = F4
console.log(xiao)
console.log(liu)
console.log(zhao)
console.log(song)

//2. 对象的解构
const zbs = {
    username: '赵本山',
    age: '不详',
    xiaopin: function(){
        console.log("演小品");
    }
}

let {username, age, xiaopin} = zbs
console.log(username)
console.log(age)
console.log(xiaopin)
xiaopin()

//3. 根据名字自动解构
// let {xiaopin} = zbs
// xiaopin()
```




### 4、模板字符串

创建 04-模板字符串.js

模板字符串相当于加强版的字符串，用反引号``

除了作为普通字符串，还可以用来定义多行字符串，还可以在字符串中加入变量和表达式。

```js
// ES6 引入新的声明字符串的方式 『``』 '' ""
//1. 声明
let str = `我也是一个字符串哦!`
console.log(str, typeof str)

//2. 内容中可以直接出现换行符
let list = `<ul>
            <li>沈腾</li>
            <li>玛丽</li>
            <li>魏翔</li>
            <li>艾伦</li>
            </ul>`
console.log(list)

//3. 变量拼接
let lovest = '贾玲'
let out = `我喜欢${lovest}`
console.log(out)
```

### 5、声明对象简写

创建 05-声明对象简写.js

```js
let username = 'Tom'
let age = 2
let sing = function () {
  console.log('I love Jerry')
}

// 传统
let person1 = {
  username: username,
  age: age,
  sing: sing,
}
console.log(person1)
person1.sing()

// ES6：这样的书写更加简洁
let person2 = {
  age,
  username,
  sing,
}
console.log(person2)
person2.sing()
```

### 6、定义方法简写

创建 06-定义方法简写.js

```js
// 传统
let person1 = {
  sayHi: function () {
    console.log('Hi')
  },
}
person1.sayHi()

// ES6
let person2 = {
  sayHi() {
    console.log('Hi')
  },
}
person2.sayHi()
```

### 7、参数的默认值

注意：函数在JavaScript中也是一种数据类型，JavaScript中没有方法的重载

创建 07-参数的默认值.js

```js
//ES6 允许给函数参数赋值初始值
//1. 形参初始值 具有默认值的参数
function add(a, b, c = 0) {
  return a + b + c
}
let result = add(1, 2)
console.log(result)

//2. 与解构赋值结合
function connect({ host = '127.0.0.1', username, password, port }) {
  console.log(host)
  console.log(username)
  console.log(password)
  console.log(port)
}
connect({
  host: 'atguigu.com',
  username: 'root',
  password: 'root',
  port: 3306,
})
```

### 8、对象拓展运算符

创建 08-对象扩展运算符.js

扩展运算符（spread）也是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列，对数组进行解包。

```js
//展开对象(拷贝对象)
let person = { name: '路飞', age: 17 }
// let someone = person //引用赋值
let someone = { ...person } //对拷拷贝
someone.name = '索隆'
console.log(person)
console.log(someone)
```

### 9、箭头函数

创建 09-箭头函数.js

箭头函数提供了一种更加简洁的函数书写方式。基本语法是：

参数=>函数体

箭头函数多用于匿名函数的定义

```js
//声明一个函数
let fn = function(a){
  return a + 100
}

//箭头函数
let fn = (a) => {
  return a + 100
}

//简写
let fn = a => a + 100

//调用函数
let result = fn(1)
console.log(result)
```

10、Promise

Promise 是ES6 引入的异步编程的新解决方案。语法上 Promise 是一个构造函数， 用来封装异步操作并可以获取其成功或失败的结果。

创建 10-Promise基本语法.js

```js
const fs = require('fs')

//实例化 Promise 对象：
//Promise对象有三个状态：初始化、成功、失败
const p = new Promise((resolve, reject) => {
  //调用readFile方法读取磁盘文件：异步操作
  fs.readFile('./他.txt', (err, data) => {
    //当文件读取失败时，可以获取到err的值
    if (err) reject(err) //reject将Promise对象的状态设置为失败

    //当文件读取成功时，可以获取到data的值
    resolve(data) //resolve将Promise对象的状态设置为成功

  })
})

//调用 promise 对象的方法
//then：当 Promise状态成功时执行
//catch：当 Promise状态失败时执行
p.then(response => {
  console.log(response.toString())
}).catch(error => {
  console.log('出错了')
  console.error(error)
})
```

总结：借助于Promise，可以使异步操作中的成功和失败的处理函数独立出来。

