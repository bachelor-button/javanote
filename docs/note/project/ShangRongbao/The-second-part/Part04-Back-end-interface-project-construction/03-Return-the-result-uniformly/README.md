# 03-统一返回结果

## 一、定义统一返回结果

### 1、数据格式的定义

项目中我们会将响应封装成json返回，一般我们会将所有接口的数据格式统一， 使前端对数据的操作更一致、轻松。

一般情况下，统一返回数据格式没有固定的格式，只要能描述清楚返回的数据状态以及要返回的具体数据就可以。但是一般会包含状态码、返回消息、数据这几部分内容

例如，我们的系统要求返回的基本数据格式如下：

成功：

```json
    {
  "code": 0,
  "message": "成功",
  "data": "数据"
}
```

失败：

```json
{
  "code": -1,
  "message": "失败",
  "data": null
}
```

因此，我们定义统一结果

```json

{
  "code": "数字",
  //业务响应码
  "message": "字符串",
  //   返回消息
  "data": "对象"
  //  返回数据 
}
```

### 2、创建枚举

在guigu-common中创建result包，创建枚举 Response Enum

```java
package com.atguigu.common.result;

@Getter @AllArgsConstructor @ToString public enum ResponseEnum {

    SUCCESS(0, "成功"),
    ERROR(-1, "服务器内部错误"),
    ;

    // 响应状态码
    private Integer code;
    // 响应信息
    private String message;

}
```

完整的枚举源代码：ResponseEnum.java

### 3、定义同统一结果类

```java
package com.atguigu.common.result;

@Data public class R {

    private Integer code;

    private String message;

    private Map<String, Object> data = new HashMap();

    /**
     * 构造器私有
     */
    private R(){}

    /**
     * 返回成功
     */
    public static R ok(){
        R r = new R();
        r.setCode(ResponseEnum.SUCCESS.getCode());
        r.setMessage(ResponseEnum.SUCCESS.getMessage());
        return r;
    }

    /**
     * 返回失败
     */
    public static R error(){
        R r = new R();
        r.setCode(ResponseEnum.ERROR.getCode());
        r.setMessage(ResponseEnum.ERROR.getMessage());
        return r;
    }

    /**
     * 设置特定结果
     */
    public static R setResult(ResponseEnum responseEnum){
        R r = new R();
        r.setCode(responseEnum.getCode());
        r.setMessage(responseEnum.getMessage());
        return r;
    }

    public R message(String message){
        this.setMessage(message);
        return this;
    }

    public R code(Integer code){
        this.setCode(code);
        return this;
    }

    public R data(String key, Object value){
        this.data.put(key, value);
        return this;
    }

    public R data(Map<String, Object> map){
        this.setData(map);
        return this;
    }

}
```

## 三、使用统一返回结果

### 1、修改listAll

```java
@ApiOperation("积分等级列表")
@GetMapping("/list")
public R listAll(){ List<IntegralGrade> list = integralGradeService.list(); return R.ok().data("list", list); }
```

2 、修改removeById

```java
@ApiOperation(value = "根据id删除积分等级", notes="逻辑删除")
@DeleteMapping("/remove/{id}")
public R removeById(
@ApiParam(value = "数据id", required = true, example = "1")
@PathVariable Long id){ boolean result = integralGradeService.removeById(id); if(result){ //return R.setResult(
ResponseEnum.UPLOAD_ERROR); return R.ok().message("删除成功"); }else{ return R.error().message("删除失败"); } }
```

### 3、新增数据

```java
@ApiOperation("新增积分等级")
@PostMapping("/save")
public R save(
@ApiParam(value = "积分等级对象", required = true)
@RequestBody IntegralGrade integralGrade){ boolean result = integralGradeService.save(integralGrade); if (result) {
return R.ok().message("保存成功"); } else { return R.error().message("保存失败"); } }
```

### 4、根据id查询

```java
@ApiOperation("根据id获取积分等级")
@GetMapping("/get/{id}")
public R getById(
@ApiParam(value = "数据id", required = true, example = "1")
@PathVariable Long id
){ IntegralGrade integralGrade = integralGradeService.getById(id); if(integralGrade != null){ return R.ok().data("
record", integralGrade); }else{ return R.error().message("数据不存在"); } }
```

### 5、根据id修改

```java
@ApiOperation("更新积分等级")
@PutMapping("/update")
public R updateById(
@ApiParam(value = "积分等级对象", required = true)
@RequestBody IntegralGrade integralGrade){ boolean result = integralGradeService.updateById(integralGrade); if(result){
return R.ok().message("修改成功"); }else{ return R.error().message("修改失败"); } }
```

