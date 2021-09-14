# 第九天 商品搜索

# 1 搜索后台实现

## 1.1 关键字搜索

service

```java
package com.atguigu.gmall.list.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.atguigu.gmall.list.service.SearchService;
import com.atguigu.gmall.model.list.Goods;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

/**
 * 商品搜索的实现类
 */
@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    /**
     * 搜索商品
     *
     * @param searchMap
     * @return
     */
    @Override
    public Map<String, Object> search(Map<String, String> searchMap) {
        //参数校验
        if(searchMap == null){
            return null;
        }
        try {
            //构建查询条件
            SearchRequest searchRequest = buildQueryParams(searchMap);
            //执行搜索
            SearchResponse searchResponse =
                    restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            //解析结果
            return getSearchData(searchResponse);
        }catch (Exception e){
            e.printStackTrace();
        }
        //返回结果
        return null;
    }

    /**
     * 构建查询条件
     * @param searchMap
     * @return
     */
    private SearchRequest buildQueryParams(Map<String, String> searchMap) {
        //查询请求的request初始化
        SearchRequest searchRequest = new SearchRequest();
        //条件构造器初始化
        SearchSourceBuilder builder = new SearchSourceBuilder();
        //构建条件
        String keywords = searchMap.get("keywords");
        if(!StringUtils.isEmpty(keywords)){
            builder.query(QueryBuilders.matchQuery("title", keywords));
        }
        searchRequest.source(builder);
        //返回条件
        return searchRequest;
    }

    /**
     * 解析搜索到的结果
     * @param searchResponse
     */
    private Map<String, Object> getSearchData(SearchResponse searchResponse) {
        //初始化返回结果
        Map<String, Object> result = new HashMap<>();
        //商品列表初始化
        List<Goods> goodsList = new ArrayList<>();
        //获取命中的对象
        SearchHits hits = searchResponse.getHits();
        //获取迭代器
        Iterator<SearchHit> iterator = hits.iterator();
        while (iterator.hasNext()){
            SearchHit next = iterator.next();
            //获取字符串对象
            String sourceAsString = next.getSourceAsString();
            //反序列化
            Goods goods = JSONObject.parseObject(sourceAsString, Goods.class);
            goodsList.add(goods);
        }
        result.put("goodsList", goodsList);
        //返回
        return result;
    }
}
```

接口类

```java
package com.atguigu.gmall.list.service;

import java.util.Map;

/**
 * 搜索服务的接口层
 */
public interface SearchService {

    /**
     * 搜索商品
     * @param searchMap
     * @return
     */
    public Map<String,Object> search(Map<String,String> searchMap);
}
```

controller

```java
@Autowired
private SearchService searchService;
/**
 * 搜索商品
 * @param searchMap
 * @return
 */
@GetMapping(value = "/search")
public Map<String, Object> search(@RequestParam Map<String, String> searchMap){
    return searchService.search(searchMap);
}
```

## 1.2 品牌聚合

service

```java
package com.atguigu.gmall.list.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.atguigu.gmall.list.service.SearchService;
import com.atguigu.gmall.model.list.Goods;
import com.atguigu.gmall.model.list.SearchResponseTmVo;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.LongTerms;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedLongTerms;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

/**
 * 商品搜索的实现类
 */
@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    /**
     * 搜索商品
     *
     * @param searchMap
     * @return
     */
    @Override
    public Map<String, Object> search(Map<String, String> searchMap) {
        //参数校验
        if(searchMap == null){
            return null;
        }
        try {
            //构建查询条件
            SearchRequest searchRequest = buildQueryParams(searchMap);
            //执行搜索
            SearchResponse searchResponse =
                    restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            //解析结果
            return getSearchData(searchResponse);
        }catch (Exception e){
            e.printStackTrace();
        }
        //返回结果
        return null;
    }

    /**
     * 构建查询条件
     * @param searchMap
     * @return
     */
    private SearchRequest buildQueryParams(Map<String, String> searchMap) {
        //查询请求的request初始化
        SearchRequest searchRequest = new SearchRequest();
        //条件构造器初始化
        SearchSourceBuilder builder = new SearchSourceBuilder();
        //构建查询条件
        String keywords = searchMap.get("keywords");
        if(!StringUtils.isEmpty(keywords)){
            builder.query(QueryBuilders.matchQuery("title", keywords));
        }
        //构建聚合查询条件---品牌
        builder.aggregation(
                AggregationBuilders.terms("aggTmId").field("tmId")
                .subAggregation(AggregationBuilders.terms("aggTmName").field("tmName"))
                .subAggregation(AggregationBuilders.terms("aggTmLogoUrl").field("tmLogoUrl"))
                .size(1000000)
        );

        searchRequest.source(builder);
        //返回条件
        return searchRequest;
    }

    /**
     * 解析搜索到的结果
     * @param searchResponse
     */
    private Map<String, Object> getSearchData(SearchResponse searchResponse) {
        //初始化返回结果
        Map<String, Object> result = new HashMap<>();
        //商品列表初始化
        List<Goods> goodsList = new ArrayList<>();
        //获取命中的对象
        SearchHits hits = searchResponse.getHits();
        //获取迭代器
        Iterator<SearchHit> iterator = hits.iterator();
        while (iterator.hasNext()){
            SearchHit next = iterator.next();
            //获取字符串对象
            String sourceAsString = next.getSourceAsString();
            //反序列化
            Goods goods = JSONObject.parseObject(sourceAsString, Goods.class);
            goodsList.add(goods);
        }
        result.put("goodsList", goodsList);
        //获取全部的聚合数据
        Map<String, Aggregation> aggregationMap = searchResponse.getAggregations().asMap();
        //获取品牌的聚合结果
        List<SearchResponseTmVo> tradeMarkAggResult = getTradeMarkAggResult(aggregationMap);
        result.put("tradeMarkAggResult", tradeMarkAggResult);
        //返回
        return result;
    }

    /**
     * 获取聚合的结果
     * @param aggregationMap
     */
    private List<SearchResponseTmVo> getTradeMarkAggResult(Map<String, Aggregation> aggregationMap) {
        List<SearchResponseTmVo> searchResponseTmVoList = new ArrayList<>();
        //获取品牌的聚合结果--品牌的id是long类型的
        ParsedLongTerms aggTmId = (ParsedLongTerms)aggregationMap.get("aggTmId");
        for (Terms.Bucket bucket : aggTmId.getBuckets()) {
            SearchResponseTmVo searchResponseTmVo = new SearchResponseTmVo();
            //获取品牌的id
            long tmId = bucket.getKeyAsNumber().longValue();
            searchResponseTmVo.setTmId(tmId);
            //获取自聚合的结果
            Aggregations aggregations = bucket.getAggregations();
            ParsedStringTerms aggTmName = aggregations.get("aggTmName");
            //获取品牌的名字
            if(aggTmName.getBuckets().size() > 0){
                String tmName = aggTmName.getBuckets().get(0).getKeyAsString();
                searchResponseTmVo.setTmName(tmName);
            }
            //获取logo的地址
            ParsedStringTerms aggTmLogoUrl = aggregations.get("aggTmLogoUrl");
            if(aggTmLogoUrl.getBuckets().size() > 0){
                String tmLogoUrl = aggTmLogoUrl.getBuckets().get(0).getKeyAsString();
                searchResponseTmVo.setTmLogoUrl(tmLogoUrl);
            }
            searchResponseTmVoList.add(searchResponseTmVo);
        }
        return searchResponseTmVoList;
    }
}
```

## 1.3 平台属性聚合

设置平台属性聚合的条件

```java
//平台属性的聚合条件设置
builder.aggregation(
        AggregationBuilders.nested("aggAttrs", "attrs").subAggregation(
                AggregationBuilders.terms("aggAttrId").field("attrs.attrId")
                    .subAggregation(AggregationBuilders.terms("aggAttrName").field("attrs.attrName"))
                    .subAggregation(AggregationBuilders.terms("aggAttrValue").field("attrs.attrValue"))
                .size(1000000)
        )
);
```

解析平台属性的聚合结果

```java
/**
 * 获取平台属性的聚合结果
 * @param aggregationMap
 */
private List<SearchResponseAttrVo> getBaseAttrResult(Map<String, Aggregation> aggregationMap) {
    List<SearchResponseAttrVo> searchResponseAttrVoList = new ArrayList<>();
    //获取平台属性nested类型的聚合结果
    ParsedNested aggAttrs = (ParsedNested)aggregationMap.get("aggAttrs");
    //获取子聚合的结果
    ParsedLongTerms aggAttrId = aggAttrs.getAggregations().get("aggAttrId");
    //遍历获取平台属性的名称和值
    for (Terms.Bucket bucket : aggAttrId.getBuckets()) {
        SearchResponseAttrVo searchResponseAttrVo = new SearchResponseAttrVo();
        //获取平台属性的id
        long attrId = bucket.getKeyAsNumber().longValue();
        searchResponseAttrVo.setAttrId(attrId);
        //获取子聚合的结果
        ParsedStringTerms aggAttrName = bucket.getAggregations().get("aggAttrName");
        if(aggAttrName.getBuckets().size() > 0){
            //获取平台属性的名字
            String attrName = aggAttrName.getBuckets().get(0).getKeyAsString();
            searchResponseAttrVo.setAttrName(attrName);
        }
        ParsedStringTerms aggAttrValue = bucket.getAggregations().get("aggAttrValue");
        List<String> attrValues = new ArrayList<>();
        if(aggAttrValue.getBuckets().size() > 0){
            for (Terms.Bucket aggAttrValueBucket : aggAttrValue.getBuckets()) {
                //遍历获取值
                String attrValue = aggAttrValueBucket.getKeyAsString();
                attrValues.add(attrValue);
            }
        }
        searchResponseAttrVo.setAttrValueList(attrValues);
        searchResponseAttrVoList.add(searchResponseAttrVo);
    }
    return searchResponseAttrVoList;
}
```

## 1.4 组合查询

### 1.4.1 品牌查询

```java
//构建bool查询
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        //构建查询条件
        String keywords = searchMap.get("keywords");
        if(!StringUtils.isEmpty(keywords)){
            boolQueryBuilder.must(QueryBuilders.matchQuery("title", keywords));
//            builder.query(QueryBuilders.matchQuery("title", keywords));
        }
        //品牌的查询条件:参数就是 1:华为
        String tradeMark = searchMap.get("tradeMark");
        if(!StringUtils.isEmpty(tradeMark)){
            String[] split = tradeMark.split(":");
            if (split.length > 0){
                //使用品牌id查询
                boolQueryBuilder.must(QueryBuilders.termQuery("tmId", split[0]));
                //品牌的名称--任选一个
//                boolQueryBuilder.must(QueryBuilders.termQuery("tmName", split[1]));
            }
        }
//设置全部的查询条件
        builder.query(boolQueryBuilder);
```

### 1.4.2 平台属性查询

```java
//平台属性的查询attr_网络制式=电信3G&attr_显示屏幕尺寸=4.0-4.9英寸&attr_摄像头像素=摄像头
for (String attrName : searchMap.keySet()) {
    //判断是否为平台属性
    if(attrName.startsWith("attr_")){
        //获取平台属性选择的值: 电信3G
        String attrValue = searchMap.get(attrName);
        //平台属性的名称进行处理
        attrName = attrName.replace("attr_", "");
        //拼接条件
        BoolQueryBuilder nestedBool = new BoolQueryBuilder();
        nestedBool.must(QueryBuilders.termQuery("attrs.attrName",attrName));
        nestedBool.must(QueryBuilders.termQuery("attrs.attrValue",attrValue));
        NestedQueryBuilder nestedQuery = QueryBuilders.nestedQuery("attrs", nestedBool, ScoreMode.None);
        //设置到总条件中去
        boolQueryBuilder.must(nestedQuery);
    }
}
```

### 1.4.3 价格查询

```java
//价格查询----price=1000-2000元或3000元以上
String price = searchMap.get("price");
if(!StringUtils.isEmpty(price)){
    //价格切分
    price = price.replace("元", "").replace("以上", "");
    String[] split = price.split("-");
    //价格大于起始值
    boolQueryBuilder.must(QueryBuilders.rangeQuery("price").gte(split[0]));
    if(split.length > 1){
        //价格小于最大值
        boolQueryBuilder.must(QueryBuilders.rangeQuery("price").lt(split[1]));
    }
}
```

### 1.4.4 分页查询

```java
//分页查询
Integer size = 100;//后台固定每页显示100条数据
//获取页码
Integer pageNum = getPageNum(searchMap.get("pageNum"));
builder.from((pageNum -1) * size);
builder.size(size);
//设置全部的查询条件
builder.query(boolQueryBuilder);

```

计算页码的方法

```java
	/**
     * 获取用户输入的页面,计算起始行号
     * @param pageNum
     * @return
     */
    private Integer getPageNum(String pageNum) {
        try {
            return Integer.parseInt(pageNum) > 0?Integer.parseInt(pageNum):1;
        }catch (Exception e){
            return 1;
        }
    }
```

### 1.4.5 排序

```java
//排序---softField=price  softRule=ASC/DESC
String softField = searchMap.get("softField");
String softRule = searchMap.get("softRule");
if(!StringUtils.isEmpty(softField) && !StringUtils.isEmpty(softRule)){
    builder.sort(softField, softRule.equals("ASC")?SortOrder.ASC:SortOrder.DESC);
}else{
    builder.sort("createTime", SortOrder.DESC);
}
```

### 1.4.6 高亮查询

设置高亮的条件

```java
//设置高亮查询
HighlightBuilder highlightBuilder = new HighlightBuilder();
highlightBuilder.field("title");
highlightBuilder.preTags("<font style='color:green'>");
highlightBuilder.postTags("</font>");
builder.highlighter(highlightBuilder);
```

解析高亮的数据

```java
//获取高亮的数据
HighlightField highlightField = next.getHighlightFields().get("title");
if(highlightField != null){
    Text[] fragments = highlightField.getFragments();
    if(fragments != null && fragments.length > 0){
        String title = "";
        for (Text fragment : fragments) {
            title += fragment;
        }
        goods.setTitle(title);
    }
}
```

# 2 搜索页面实现

## 2.1 商品数据展示

```html
<li class="yui3-u-1-5" th:each="goods:${goodsList}">
   <div class="list-wrap">
      <div class="p-img">
         <a href="item.html"  target="_blank">
                                  <img th:src="${goods.defaultImg}" />
                              </a>
      </div>
      <div class="price">
         <strong>
               <em>¥</em>
               <i th:text="${goods.price}"></i>
            </strong>
      </div>
      <div class="attr">
         <a target="_blank" href="item.html" th:utext="${goods.title}"></a>
      </div>
      <div class="commit">
         <i class="command" th:text="${goods.id}"></i>
      </div>
      <div class="operate">
         <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
         <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
      </div>
   </div>
</li>
```

## 2.2 数据回显

数据回显的后台

```java
//将参数再返回给页面,用于条件的回显
model.addAttribute("searchMap", searchMap);
```

页面

```html
<form action="/web/list" class="sui-form form-inline">
   <!--searchAutoComplete-->
   <div class="input-append">
      <input type="text" id="autocomplete" name="keywords"
                                    th:value="${#maps.containsKey(searchMap, 'keywords')}?${searchMap.keywords}:''"
                                    class="input-error input-xxlarge" />
      <button class="sui-btn btn-xlarge btn-danger" type="submit">搜索</button>
   </div>
</form>
```

## 2.3 品牌条件展示

```html
<div class="type-wrap logo">
   <div class="fl key brand">品牌</div>
   <div class="value logos">
      <ul class="logo-list">
         <li th:each="trade:${tradeMarkResult}">
                            <a th:text="${trade.tmName}"
                                th:href="@{${url}(tradeMark=${trade.tmId}+':' + ${trade.tmName})}">
                            </a>
                        </li>
      </ul>
   </div>
   <div class="ext">
      <a href="javascript:void(0);" class="sui-btn">多选</a>
      <a href="javascript:void(0);">更多</a>
   </div>
</div>
```

## 2.4 平台属性条件展示

```html
<div class="type-wrap" th:each="attrInfo:${baseAttrResult}">
   <div class="fl key" th:text="${attrInfo.attrName}"></div>
   <div class="fl value">
      <ul class="type-list">
         <li th:each="attrValue:${attrInfo.attrValueList}">
            <a th:text="${attrValue}"></a>
         </li>
      </ul>
   </div>
   <div class="fl ext"></div>
</div>
```

## 2.5 品牌与平台属性条件组合查询

```html
<div class="type-wrap logo" th:unless="${#maps.containsKey(searchMap, 'tradeMark')}">
   <div class="fl key brand">品牌</div>
   <div class="value logos">
      <ul class="logo-list">
         <li th:each="trade:${tradeMarkResult}">
                            <a th:text="${trade.tmName}"
                                th:href="@{${url}(tradeMark=${trade.tmId}+':' + ${trade.tmName})}">
                            </a>
                        </li>
      </ul>
   </div>
   <div class="ext">
      <a href="javascript:void(0);" class="sui-btn">多选</a>
      <a href="javascript:void(0);">更多</a>
   </div>
</div>
<div class="type-wrap" th:each="attrInfo:${baseAttrResult}"
                th:unless="${#maps.containsKey(searchMap, 'attr_' + attrInfo.attrName)}">
   <div class="fl key" th:text="${attrInfo.attrName}"></div>
   <div class="fl value">
      <ul class="type-list">
         <li th:each="attrValue:${attrInfo.attrValueList}">
            <a th:text="${attrValue}"
                               th:href="@{${url}('attr_'+${attrInfo.attrName}=${attrValue})}"
                            ></a>
         </li>
      </ul>
   </div>
   <div class="fl ext"></div>
</div>
```



