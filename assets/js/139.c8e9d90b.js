(window.webpackJsonp=window.webpackJsonp||[]).push([[139],{2404:function(t,e,a){"use strict";a.r(e);var s=a(21),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"第六节-覆盖索引"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第六节-覆盖索引"}},[t._v("#")]),t._v(" 第六节 覆盖索引")]),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"images","data-src":a(624),loading:"lazy"}})]),t._v(" "),s("p",[t._v("对于 B+ 树来说，创建索引时，索引字段对应的数据全部在叶子节点中保存。反过来说，如果我们在 select 子句中仅仅查询创建了索引的字段，那么不需要查询数据库就能够得到数据。")]),t._v(" "),s("p",[t._v("再换个角度我们也能发现：每一个字段的索引中包含了这个字段的所有数据，这么看来也可以说索引中保存了整个列。")]),t._v(" "),s("p",[t._v("当一个复合索引能够覆盖 select、where、join on、order by、having 等各个子句中涉及的字段，那么就可以称为：覆盖索引。")]),t._v(" "),s("p",[s("RouterLink",{attrs:{to:"/note/advance/mysql/chapter08/verse05.html"}},[t._v("上一节")]),t._v(" "),s("RouterLink",{attrs:{to:"/note/advance/mysql/chapter08/index.html"}},[t._v("回目录")])],1)])}),[],!1,null,null,null);e.default=n.exports},624:function(t,e,a){t.exports=a.p+"assets/img/img024.cf95641a.png"}}]);