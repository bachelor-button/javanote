(window.webpackJsonp=window.webpackJsonp||[]).push([[174],{2337:function(e,t,r){"use strict";r.r(t);var o=r(21),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"第六节-线程池的拒绝策略"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#第六节-线程池的拒绝策略"}},[e._v("#")]),e._v(" 第六节 线程池的拒绝策略")]),e._v(" "),r("p",[e._v("一般我们创建线程池时，为防止资源被耗尽，任务队列都会选择创建有界任务队列，但这种模式下如果出现任务队列已满且线程池创建的线程数达到你设置的最大线程数时，这时就需要你指定ThreadPoolExecutor的RejectedExecutionHandler参数即合理的拒绝策略，来处理线程池“超载”的情况。")]),e._v(" "),r("p",[e._v("ThreadPoolExecutor自带的拒绝策略如下：")]),e._v(" "),r("ul",[r("li",[e._v("AbortPolicy(默认)：直接抛出RejectedExecutionException异常阻止系统正常运行")]),e._v(" "),r("li",[e._v("CallerRunsPolicy：“调用者运行”一种调节机制，该策略既不会抛弃任务，也不会抛出异常，而是将某些任务回退到调用者，从而降低新任务的流量。")]),e._v(" "),r("li",[e._v("DiscardOldestPolicy：抛弃队列中等待最久的任务，然后把当前任务加入队列中尝试再次提交当前任务。")]),e._v(" "),r("li",[e._v("DiscardPolicy：该策略默默地丢弃无法处理的任务，不予任何处理也不抛出异常。如果允许任务丢失，这是最好的一种策略。")])]),e._v(" "),r("p",[e._v("以上内置的策略均实现了RejectedExecutionHandler接口，也可以自己扩展RejectedExecutionHandler接口，定义自己的拒绝策略。")]),e._v(" "),r("p",[r("RouterLink",{attrs:{to:"/note/advance/juc/chapter06/verse05.html"}},[e._v("上一节")]),e._v(" "),r("RouterLink",{attrs:{to:"/note/advance/juc/chapter06/index.html"}},[e._v("回目录")]),e._v(" "),r("RouterLink",{attrs:{to:"/note/advance/juc/chapter06/verse07.html"}},[e._v("下一节")])],1)])}),[],!1,null,null,null);t.default=a.exports}}]);