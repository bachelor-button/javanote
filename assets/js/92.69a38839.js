(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{2341:function(t,s,a){"use strict";a.r(s);var n=a(21),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"第九章-cas"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#第九章-cas"}},[t._v("#")]),t._v(" 第九章 CAS")]),t._v(" "),n("h2",{attrs:{id:"_1、乐观锁工作机制"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、乐观锁工作机制"}},[t._v("#")]),t._v(" 1、乐观锁工作机制")]),t._v(" "),n("p",[n("img",{staticClass:"lazy",attrs:{alt:"images","data-src":a(499),loading:"lazy"}})]),t._v(" "),n("blockquote",[n("p",[t._v("初始状态：明天休息\t\t版本：0\n变更操作：明天户外拓展\t版本：1\n变更操作：明天补课\t\t版本基准：0\n更新基准：更新到版本1\n变更操作：明天补课\t\t版本基准：1")])]),t._v(" "),n("h2",{attrs:{id:"_2、cas概念"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、cas概念"}},[t._v("#")]),t._v(" 2、CAS概念")]),t._v(" "),n("p",[t._v("CAS：Compare and swap，比较并交换。")]),t._v(" "),n("p",[n("img",{staticClass:"lazy",attrs:{alt:"images","data-src":a(500),loading:"lazy"}})]),t._v(" "),n("p",[t._v("当我们想基于CAS机制修改变量a的时候：")]),t._v(" "),n("ul",[n("li",[t._v("将作为修改基准的旧值和内存实际值进行比较\n"),n("ul",[n("li",[t._v("一致：接受修改")]),t._v(" "),n("li",[t._v("不一致：不接受修改")])])])]),t._v(" "),n("h2",{attrs:{id:"_3、cas测试代码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、cas测试代码"}},[t._v("#")]),t._v(" 3、CAS测试代码")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),t._v(" atomicNumber "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" updateResult "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" atomicNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("compareAndSet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("666")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"修改结果："')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" updateResult "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('" 当前值："')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" atomicNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nupdateResult "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" atomicNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("compareAndSet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("777")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"修改结果："')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" updateResult "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('" 当前值："')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" atomicNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nupdateResult "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" atomicNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("compareAndSet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("666")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("777")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"修改结果："')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" updateResult "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('" 当前值："')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" atomicNumber"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("打印结果：")]),t._v(" "),n("blockquote",[n("p",[t._v("修改结果：true 当前值：666\n修改结果：false 当前值：666\n修改结果：true 当前值：777")])]),t._v(" "),n("h2",{attrs:{id:"_4、cas和自旋"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4、cas和自旋"}},[t._v("#")]),t._v(" 4、CAS和自旋")]),t._v(" "),n("p",[t._v("CAS是解决多线程并发安全问题的一种乐观锁算法。因为它在对共享变量更新之前，会先比较当前值是否与更新前的值一致，如果一致则更新，如果不一致则循环执行（称为"),n("span",{staticStyle:{color:"blue","font-weight":"bold"}},[t._v("自旋锁")]),t._v("），直到当前值与更新前的值一致为止，才执行更新。\nUnsafe类是CAS的核心类，提供硬件级别的原子操作（目前所有CPU基本都支持硬件级别的CAS操作）。")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对象、对象的地址、预期值、修改值")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("native")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("compareAndSwapInt")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),t._v(" var1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" var2"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" var4"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" var5"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("h2",{attrs:{id:"_5、aba问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5、aba问题"}},[t._v("#")]),t._v(" 5、ABA问题")]),t._v(" "),n("p",[n("img",{staticClass:"lazy",attrs:{alt:"images","data-src":a(501),loading:"lazy"}})]),t._v(" "),n("p",[t._v("进一步说明：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Person")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" num "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" personName"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("以num的值作为基准，运用CAS机制。")]),t._v(" "),n("ul",[n("li",[t._v("第一次修改：\n"),n("ul",[n("li",[t._v("基准旧值：5")]),t._v(" "),n("li",[t._v("新值：10")]),t._v(" "),n("li",[t._v("personName：tom")]),t._v(" "),n("li",[t._v("操作能够被接受")])])]),t._v(" "),n("li",[t._v("第二次修改：\n"),n("ul",[n("li",[t._v("基准旧值：10")]),t._v(" "),n("li",[t._v("新值：5")]),t._v(" "),n("li",[t._v("personName：jerry")]),t._v(" "),n("li",[t._v("操作能够被接受")])])]),t._v(" "),n("li",[t._v("第三次修改：\n"),n("ul",[n("li",[t._v("基准旧值：5")]),t._v(" "),n("li",[t._v("新值：666")]),t._v(" "),n("li",[t._v("personName：harry")]),t._v(" "),n("li",[t._v("当前操作无法判断是基于旧版还是新版")])])])]),t._v(" "),n("blockquote",[n("p",[t._v("当一个类中除了作为基准的数据之外还有其他数据也被连带修改，那么CAS机制中的ABA问题就有可能导致代码出错。")])]),t._v(" "),n("h2",{attrs:{id:"_6、cas机制的缺点"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_6、cas机制的缺点"}},[t._v("#")]),t._v(" 6、CAS机制的缺点")]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("开销大")]),t._v("：在并发量比较高的情况下，如果反复尝试更新某个变量，却又一直更新不成功，会给CPU带来较大的压力")]),t._v(" "),n("li",[n("strong",[t._v("ABA问题")]),t._v("：当变量从A修改为B再修改回A时，变量值等于期望值A，但是无法判断是否修改，CAS操作在ABA修改后依然成功——但此时无法识别是否是基于旧版的不该接受的修改。")]),t._v(" "),n("li",[n("strong",[t._v("不能保证代码块的原子性")]),t._v("：CAS机制所保证的只是一个变量的原子性操作，而不能保证整个代码块的原子性。")])]),t._v(" "),n("h2",{attrs:{id:"_7、cas原子性、有序性验证"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_7、cas原子性、有序性验证"}},[t._v("#")]),t._v(" 7、CAS原子性、有序性验证")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CASAtumicTest")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),t._v(" number "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AtomicInteger")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("incr")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" number"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("incrementAndGet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" args"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CASAtumicTest")]),t._v(" casAtumicTest "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CASAtumicTest")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Thread")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n                "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("System")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("out"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("println")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"number = "')]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" casAtumicTest"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("incr")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n            "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("打印效果：")]),t._v(" "),n("blockquote",[n("p",[t._v("number = 244\nnumber = 239\nnumber = 240\nnumber = 1000\nnumber = 998\nnumber = 999\nnumber = 997")])]),t._v(" "),n("p",[t._v("结论：")]),t._v(" "),n("ul",[n("li",[t._v("CAS能够为变量提供局部的原子性")]),t._v(" "),n("li",[t._v("CAS不能提供有序性")])]),t._v(" "),n("p",[n("RouterLink",{attrs:{to:"/note/advance/juc/chapter08/index.html"}},[t._v("上一章")]),t._v(" "),n("RouterLink",{attrs:{to:"/note/advance/juc/index.html"}},[t._v("回目录")])],1)])}),[],!1,null,null,null);s.default=e.exports},499:function(t,s,a){t.exports=a.p+"assets/img/img024.00d0867d.png"},500:function(t,s){t.exports="data:image/png;base64,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"},501:function(t,s,a){t.exports=a.p+"assets/img/img026.2068dc10.png"}}]);