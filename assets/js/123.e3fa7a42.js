(window.webpackJsonp=window.webpackJsonp||[]).push([[123],{2320:function(t,s,a){"use strict";a.r(s);var n=a(21),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"第四节-定制通信"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#第四节-定制通信"}},[t._v("#")]),t._v(" 第四节 定制通信")]),t._v(" "),n("p",[t._v("使用两个线程打印：12a34b56c78d……")]),t._v(" "),n("ul",[n("li",[t._v("线程A：负责打印数字")]),t._v(" "),n("li",[t._v("线程B：负责打印字母")])]),t._v(" "),n("h2",{attrs:{id:"_1、思路分析"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、思路分析"}},[t._v("#")]),t._v(" 1、思路分析")]),t._v(" "),n("p",[n("img",{staticClass:"lazy",attrs:{alt:"images","data-src":a(475),loading:"lazy"}})]),t._v(" "),n("h2",{attrs:{id:"_2、代码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、代码"}},[t._v("#")]),t._v(" 2、代码")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("O14PrintDigitalAlphabet")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明一个成员变量用于规定步数")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" step "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明一个成员变量作为要打印的数字")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" number "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明一个成员变量作为要打印的字符")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" alphabet "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建Lock对象和Condition对象")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Lock")]),t._v(" lock "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ReentrantLock")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Condition")]),t._v(" conditionDigital "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" lock"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("newCondition")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Condition")]),t._v(" conditionAlphabet "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" lock"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("newCondition")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明一个方法用于打印数字")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("printDigital")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行锁定")]),t._v("\n            lock"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("lock")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行判断")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("step "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n                "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 步数能够被3整除时不打印数字，所以当前线程等一会儿")]),t._v("\n                conditionDigital"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("await")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 干活")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 工作1：打印当前number")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 工作2：number++")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("currentThread")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getName")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('" number="')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" number"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 工作3：step++")]),t._v("\n            step"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 唤醒打印字母的线程")]),t._v("\n            conditionAlphabet"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("signal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InterruptedException")]),t._v(" e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解除锁定")]),t._v("\n            lock"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("unlock")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 声明一个方法用于打印字母")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("printAlphabet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行锁定")]),t._v("\n            lock"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("lock")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行判断")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("step "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n                "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 步数不能被3整除时不打印字母，所以当前线程等一会儿")]),t._v("\n                conditionAlphabet"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("await")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 干活")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 工作1：打印当前字母")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 工作2：alphabet++")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("currentThread")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getName")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('" alphabet="')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" alphabet"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 工作3：step++")]),t._v("\n            step"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 唤醒打印数字的线程")]),t._v("\n            conditionDigital"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("signal")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InterruptedException")]),t._v(" e"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("finally")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 解除锁定")]),t._v("\n            lock"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("unlock")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建资源对象")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("O14PrintDigitalAlphabet")]),t._v(" demo "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("O14PrintDigitalAlphabet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建两个线程")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("52")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                demo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("printDigital")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"thread-digital"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("26")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                demo"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("printAlphabet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"thread-alphabet"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[n("RouterLink",{attrs:{to:"/note/advance/juc/chapter03/verse03.html"}},[t._v("上一节")]),t._v(" "),n("RouterLink",{attrs:{to:"/note/advance/juc/chapter03/index.html"}},[t._v("回目录")]),t._v(" "),n("RouterLink",{attrs:{to:"/note/advance/juc/chapter03/verse05.html"}},[t._v("下一节")])],1)])}),[],!1,null,null,null);s.default=e.exports},475:function(t,s){t.exports="data:image/png;base64,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"}}]);