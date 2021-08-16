# 03-表单数据展示

![images](./images/75e2f80b-b425-4f68-8edd-15d25605483d.png)

## 一、根据编码获取数据字典

1、controller

sevice-core 中添加接口方法

```java
package com.atguigu.srb.core.controller.api;

@Api(tags = "数据字典")
@RestController
@RequestMapping("/api/core/dict")
@Slf4j
public class DictController {

    @Resource
    private DictService dictService;

    @ApiOperation("根据dictCode获取下级节点")
    @GetMapping("/findByDictCode/{dictCode}")
    public R findByDictCode(
            @ApiParam(value = "节点编码", required = true)
            @PathVariable String dictCode) {
        List<Dict> list = dictService.findByDictCode(dictCode);
        return R.ok().data("dictList", list);
    }

}
```

2、service

接口：DictService

```java
List<Dict> findByDictCode(String dictCode);
```

实现：DictServiceImpl

```java
@Override
public List<Dict> findByDictCode(String dictCode) {
    QueryWrapper<Dict> dictQueryWrapper = new QueryWrapper<>();
    dictQueryWrapper.eq("dict_code", dictCode);
    Dict dict = baseMapper.selectOne(dictQueryWrapper);
    return this.listByParentId(dict.getId());
}
```

## 二、前端展示借款人信息

1、展示下拉列表

pages/user/borrower.vue 中调用接口

定义 methods：

```vue
initSelected() {
    //学历列表
    this.$axios
    .$get('/api/core/dict/findByDictCode/education')
    .then((response) => {
        this.educationList = response.data.dictList
    })

    //行业列表
    this.$axios
    .$get('/api/core/dict/findByDictCode/industry')
    .then((response) => {
        this.industryList = response.data.dictList
    })

    //收入列表
    this.$axios
    .$get('/api/core/dict/findByDictCode/income')
    .then((response) => {
        this.incomeList = response.data.dictList
    })

    //还款来源列表
    this.$axios
    .$get('/api/core/dict/findByDictCode/returnSource')
    .then((response) => {
        this.returnSourceList = response.data.dictList
    })

    //联系人关系列表
    this.$axios
    .$get('/api/core/dict/findByDictCode/relation')
    .then((response) => {
        this.contactsRelationList = response.data.dictList
    })
},
```

页面加载时调用

```vue
created(){
    this.initSelected()
},
```
