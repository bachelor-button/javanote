# 02-使用缓存获取数据

将数据字典存入Redis

DictServiceImpl

注意：当redis服务器宕机时，我们不要抛出异常，要正常的执行后面的流程，使业务可以正常的运行
```java
@Resource
private RedisTemplate redisTemplate;

@Override
public List<Dict> listByParentId(Long parentId) {

    //先查询redis中是否存在数据列表
    List<Dict> dictList = null;
    try {
        dictList = (List<Dict>)redisTemplate.opsForValue().get("srb:core:dictList:" + parentId);
        if(dictList != null){
            log.info("从redis中取值");
            return dictList;
        }
    } catch (Exception e) {
        log.error("redis服务器异常：" + ExceptionUtils.getStackTrace(e));//此处不抛出异常，继续执行后面的代码
    }

    log.info("从数据库中取值");
    dictList = baseMapper.selectList(new QueryWrapper<Dict>().eq("parent_id", parentId));
    dictList.forEach(dict -> {
        //如果有子节点，则是非叶子节点
        boolean hasChildren = this.hasChildren(dict.getId());
        dict.setHasChildren(hasChildren);
    });

    //将数据存入redis
    try {
        redisTemplate.opsForValue().set("srb:core:dictList:" + parentId, dictList, 5, TimeUnit.MINUTES);
        log.info("数据存入redis");
    } catch (Exception e) {
        log.error("redis服务器异常：" + ExceptionUtils.getStackTrace(e));//此处不抛出异常，继续执行后面的代码
    }
    return dictList;
}
```

