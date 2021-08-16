# 02-Excel数据批量导入

## 一、后端接口

### 1、添加依赖

core中添加如下依赖

```xml

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
</dependency>

<dependency>
<groupId>org.apache.xmlbeans</groupId>
<artifactId>xmlbeans</artifactId>
</dependency>
```

### 2、创建Excel实体类

```java
package com.atguigu.srb.core.pojo.dto;
@Data
public class ExcelDictDTO {

    @ExcelProperty("id")
    private Long id;

    @ExcelProperty("上级id")
    private Long parentId;

    @ExcelProperty("名称")
    private String name;

    @ExcelProperty("值")
    private Integer value;

    @ExcelProperty("编码")
    private String dictCode;
}
```

### 3、创建监听器

```java
package com.atguigu.srb.core.listener;

@Slf4j
//@AllArgsConstructor //全参
@NoArgsConstructor //无参
public class ExcelDictDTOListener extends AnalysisEventListener<ExcelDictDTO> {

    /**
     * 每隔5条存储数据库，实际使用中可以3000条，然后清理list ，方便内存回收
     */
    private static final int BATCH_COUNT = 5;
    List<ExcelDictDTO> list = new ArrayList();

    private DictMapper dictMapper;

	//传入mapper对象
    public ExcelDictDTOListener(DictMapper dictMapper) {
        this.dictMapper = dictMapper;
    }

    /**
     *遍历每一行的记录
     * @param data
     * @param context
     */
    @Override
    public void invoke(ExcelDictDTO data, AnalysisContext context) {
        log.info("解析到一条记录: {}", data);
        list.add(data);
        // 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM
        if (list.size() >= BATCH_COUNT) {
            saveData();
            // 存储完成清理 list
            list.clear();
        }
    }

    /**
     * 所有数据解析完成了 都会来调用
     */
    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        // 这里也要保存数据，确保最后遗留的数据也存储到数据库
        saveData();
        log.info("所有数据解析完成！");
    }

    /**
     * 加上存储数据库
     */
    private void saveData() {
        log.info("{}条数据，开始存储数据库！", list.size());
        dictMapper.insertBatch(list);  //批量插入
        log.info("存储数据库成功！");
    }
}
```

### 4、Mapper层批量插入

接口：DictMapper

```java
void insertBatch(List<ExcelDictDTO> list);
```

xml：DictMapper.xml

```xml

<insert id="insertBatch">
    insert into dict (
    id ,
    parent_id ,
    name ,
    value ,
    dict_code
    ) values
    <foreach collection="list" item="item" index="index" separator=",">
        (
        #{item.id} ,
        #{item.parentId} ,
        #{item.name} ,
        #{item.value} ,
        #{item.dictCode}
        )
    </foreach>
</insert>
```

### 5、Service层创建监听器实例

接口 DictService

```java
void importData(InputStream inputStream);
```

实现：DictServiceImpl

注意：

此处添加了事务处理，默认情况下rollbackFor = RuntimeException.class

```java
@Transactional(rollbackFor = {Exception.class})
@Override
public void importData(InputStream inputStream) {
    // 这里 需要指定读用哪个class去读，然后读取第一个sheet 文件流会自动关闭
    EasyExcel.read(inputStream, ExcelDictDTO.class, new ExcelDictDTOListener(baseMapper)).sheet().doRead();
    log.info("importData finished");
}
```

### 6、Controller层接收客户端上传

AdminDictController

```java
package com.atguigu.srb.core.controller.admin;

@Api(tags = "数据字典管理")
@RestController
@RequestMapping("/admin/core/dict")
@Slf4j
@CrossOrigin
public class AdminDictController {

    @Resource
    private DictService dictService;

    @ApiOperation("Excel批量导入数据字典")
    @PostMapping("/import")
    public R batchImport(
            @ApiParam(value = "Excel文件", required = true)
            @RequestParam("file") MultipartFile file) {

        try {
            InputStream inputStream = file.getInputStream();
            dictService.importData(inputStream);
            return R.ok().message("批量导入成功");
        } catch (Exception e) {
            //UPLOAD_ERROR(-103, "文件上传错误"),
            throw new BusinessException(ResponseEnum.UPLOAD_ERROR, e);
        }
    }
}
```

### 7、添加mapper发布配置

注意：因为maven工程在默认情况下src/main/java目录下的所有资源文件是不发布到target目录下的，因此我们需要在pom.xml中添加xml配置文件发布配置

```xml

<build>
    <!-- 项目打包时会将java目录中的*.xml文件也进行打包 -->
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

### 8、Swagger测试接口

## 二、前端调用

### 1、创建页面组件

创建 src/ views/core/dict/list.vue

```html

<template>
    <div class="app-container">

    </div>
</template>

<script>
export default {

}


</script>
```

### 2、配置路由

```html
{ path: '/core', component: Layout, redirect: '/core/dict/list', name: 'coreDict', meta: { title: '系统设置', icon: '
el-icon-setting' }, alwaysShow: true, children: [
{ path: 'dict/list', name: '数据字典', component: () => import('@/views/core/dict/list'), meta: { title: '数据字典' } }
]
},
```

### 3、实现数据导入

```html

<template>
    <div class="app-container">
        <div style="margin-bottom: 10px;">
            <el-button
                    @click="dialogVisible = true"
                    type="primary"
                    size="mini"
                    icon="el-icon-download"
            >
                导入Excel
            </el-button>
        </div>

        <el-dialog title="数据字典导入" :visible.sync="dialogVisible" width="30%">
            <el-form>
                <el-form-item label="请选择Excel文件">
                    <el-upload
                            :auto-upload="true"
                            :multiple="false"
                            :limit="1"
                            :on-exceed="fileUploadExceed"
                            :on-success="fileUploadSuccess"
                            :on-error="fileUploadError"
                            :action="BASE_API + '/admin/core/dict/import'"
                            name="file"
                            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">
                    取消
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
  // 定义数据
  data() {
    return {
      dialogVisible: false, //文件上传对话框是否显示
      BASE_API: process.env.VUE_APP_BASE_API //获取后端接口地址
    }
  },

  methods: {
    // 上传多于一个文件时
    fileUploadExceed() {
      this.$message.warning('只能选取一个文件')
    },

    //上传成功回调
    fileUploadSuccess(response) {
      if (response.code === 0) {
        this.$message.success('数据导入成功')
        this.dialogVisible = false
      } else {
        this.$message.error(response.message)
      }
    },

    //上传失败回调
    fileUploadError(error) {
      this.$message.error('数据导入失败')
    }
  }
}

</script>
```

