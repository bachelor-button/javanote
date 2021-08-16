# 04-数据字典列表展示

## 一、后端接口

### 1、实体类添加属性

Dict中添加属性

```java
@ApiModelProperty(value = "是否包含子节点")
@TableField(exist = false)//在数据库表中忽略此列
private boolean hasChildren;
```

### 2、Service层实现数据查询

接口：DictService

List`<Dict>` listByParentId(Long parentId);

实现：DictServiceImpl

```java
@Override
public List<Dict> listByParentId(Long parentId) {
    List<Dict> dictList = baseMapper.selectList(new QueryWrapper<Dict>().eq("parent_id", parentId));
    dictList.forEach(dict -> {
        //如果有子节点，则是非叶子节点
        boolean hasChildren = this.hasChildren(dict.getId());
        dict.setHasChildren(hasChildren);
    });
    return dictList;
}

/**
     * 判断该节点是否有子节点
     */
private boolean hasChildren(Long id) {
    QueryWrapper<Dict> queryWrapper = new QueryWrapper<Dict>().eq("parent_id", id);
    Integer count = baseMapper.selectCount(queryWrapper);
    if(count.intValue() > 0) {
        return true;
    }
    return false;
}
```

### 3、Controller层接收前端请求

```java
@ApiOperation("根据上级id获取子节点数据列表")
@GetMapping("/listByParentId/{parentId}")
public R listByParentId(
    @ApiParam(value = "上级节点id", required = true)
    @PathVariable Long parentId) {
    List<Dict> dictList = dictService.listByParentId(parentId);
    return R.ok().data("list", dictList);
}
```

## 二、前端调用

### 1、api

创建 src/api/core/dict.js

```js
import request from '@/utils/request'
export default {
  listByParentId(parentId) {
    return request({
      url: `/admin/core/dict/listByParentId/${parentId}`,
      method: 'get'
    })
  }
}
```

### 2、组件脚本

定义data

list: [], //数据字典列表

生命周期函数

```js

created() {
    this.fetchData()
},
```

获取数据的方法

```js


import dictApi from '@/api/core/dict'

// 调用api层获取数据库中的数据 fetchData() { dictApi.listByParentId(1).then(response => { this.list = response.data.list })
},

//延迟加载子节点 getChildren(row, treeNode, resolve) { dictApi.listByParentId(row.id).then(response => { //负责将子节点数据展示在展开的列表中  
resolve(response.data.list)
})
},
```

### 3、组件模板
```html
<el-table :data="list" border row-key="id" lazy :load="load">
    <el-table-column label="名称" align="left" prop="name" />
    <el-table-column label="编码" prop="dictCode" />
    <el-table-column label="值" align="left" prop="value" />
</el-table>
```

### 4、流程优化

数据导入后刷新页面的数据列表
```html
//上传成功回调 fileUploadSuccess(response) { if (response.code === 0) { this.$message.success('数据导入成功')
this.dialogVisible = false this.fetchData()
} else { this.$message.error(response.message)
} },
```

