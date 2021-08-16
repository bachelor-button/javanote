# 第一节 HelloWorld

## 1、物理建模

```sql
CREATE DATABASE `mybatis-example`;

USE `mybatis-example`;

CREATE TABLE `t_emp`(
emp_id INT AUTO_INCREMENT,
emp_name CHAR(100),
emp_salary DOUBLE(10,5),
PRIMARY KEY(emp_id)
);

INSERT INTO `t_emp`(emp_name,emp_salary) VALUES("tom",200.33);
```

## 2、逻辑建模

### ①创建Maven module

![./images](./images/img001.png)

### ②创建Java实体类

> 实体类是和现实世界中某一个具体或抽象的概念对应，是软件开发过程中，为了管理现实世界中的数据而设计的模型。
>
> 实体类的多个不同的叫法：
>
> domain：领域模型
>
> entity：实体
>
> POJO：Plain Old Java Object
>
> Java bean：一个Java类

```java
/**
 * 和数据库表t_emp对应的实体类
 * emp_id INT AUTO_INCREMENT
 * emp_name CHAR(100)
 * emp_salary DOUBLE(10,5)
 *
 * Java的实体类中，属性的类型不要使用基本数据类型，要使用包装类型。因为包装类型可以赋值为null，表示空，而基本数据类型不可以。
 */
public class Employee {

    private Integer empId;

    private String empName;

    private Double empSalary;

    public Employee() {

    }

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public Double getEmpSalary() {
        return empSalary;
    }

    public void setEmpSalary(Double empSalary) {
        this.empSalary = empSalary;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "empId=" + empId +
                ", empName='" + empName + '\'' +
                ", empSalary=" + empSalary +
                '}';
    }

    public Employee(Integer empId, String empName, Double empSalary) {
        this.empId = empId;
        this.empName = empName;
        this.empSalary = empSalary;
    }
}
```

## 3、搭建框架开发环境

### ①导入依赖

```xml
<dependencies>
    <!-- Mybatis核心 -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.7</version>
    </dependency>

    <!-- junit测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>

    <!-- MySQL驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.3</version>
    </dependency>
</dependencies>
```

### ②准备配置文件

#### [1]Mybatis全局配置文件

习惯上命名为mybatis-config.xml，这个文件名仅仅只是建议，并非强制要求。将来整合Spring之后，这个配置文件可以省略，所以大家操作时可以直接复制、粘贴。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!-- environments表示配置Mybatis的开发环境，可以配置多个环境，在众多具体环境中，使用default属性指定实际运行时使用的环境。default属性的取值是environment标签的id属性的值。 -->
    <environments default="development">
        <!-- environment表示配置Mybatis的一个具体的环境 -->
        <environment id="development">

            <!-- Mybatis的内置的事务管理器 -->
            <transactionManager type="JDBC"/>

            <!-- 配置数据源 -->
            <dataSource type="POOLED">

                <!-- 建立数据库连接的具体信息 -->
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis-example"/>
                <property name="username" value="root"/>
                <property name="password" value="atguigu"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <!-- Mapper注册：指定Mybatis映射文件的具体位置 -->
        <!-- mapper标签：配置一个具体的Mapper映射文件 -->
        <!-- resource属性：指定Mapper映射文件的实际存储位置，这里需要使用一个以类路径根目录为基准的相对路径 -->
        <!--    对Maven工程的目录结构来说，resources目录下的内容会直接放入类路径，所以这里我们可以以resources目录为基准 -->
        <mapper resource="mappers/EmployeeMapper.xml"/>
    </mappers>
</configuration>
```

注意：配置文件存放的位置是src/main/resources目录下。

#### [2]Mybatis映射文件

相关概念：Mapping）对象关系映射。

* 对象：Java的实体类对象
* 关系：关系型数据库
* 映射：二者之间的对应关系

| Java概念 | 数据库概念 |
| -------- | ---------- |
| 类       | 表         |
| 属性     | 字段/列    |
| 对象     | 记录/行    |

![./images](./images/img002.png)

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!-- mapper是根标签，namespace属性：在Mybatis全局范围内找到一个具体的Mapper配置 -->
<!-- 引入接口后，为了方便通过接口全类名来找到Mapper配置文件，所以通常将namespace属性设置为接口全类名 -->
<mapper namespace="com.atguigu.mybatis.dao.EmployeeMapper">

    <!-- 编写具体的SQL语句，使用id属性唯一的标记一条SQL语句 -->
    <!-- resultType属性：指定封装查询结果的Java实体类的全类名 -->
    <select id="selectEmployee" resultType="com.atguigu.mybatis.entity.Employee">
        <!-- Mybatis负责把SQL语句中的#{}部分替换成“?”占位符，在#{}内部还是要声明一个见名知意的名称 -->
        select emp_id empId,emp_name empName,emp_salary empSalary from t_emp where emp_id=#{empId}
    </select>
</mapper>
```

注意：EmployeeMapper.xml所在的目录要和mybatis-config.xml中使用mapper标签配置的一致。

## 5、junit测试代码

```java
@Test
public void testSelectEmployee() throws IOException {

    // 1.创建SqlSessionFactory对象
    // ①声明Mybatis全局配置文件的路径
    String mybatisConfigFilePath = "mybatis-config.xml";

    // ②以输入流的形式加载Mybatis配置文件
    InputStream inputStream = Resources.getResourceAsStream(mybatisConfigFilePath);

    // ③基于读取Mybatis配置文件的输入流创建SqlSessionFactory对象
    SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    // 2.使用SqlSessionFactory对象开启一个会话
    SqlSession session = sessionFactory.openSession();

    // 3.根据Mapper配置文件的名称空间+SQL语句的id找到具体的SQL语句
    // 格式是：名称空间.SQL语句的id
    String statement = "com.atguigu.mybatis.dao.EmployeeMapper.selectEmployee";

    // 要传入SQL语句的参数
    Integer empId = 1;

    // 执行SQL语句
    Object result = session.selectOne(statement, empId);

    System.out.println("o = " + result);

    // 4.关闭SqlSession
    session.close();
}
```

说明：

* SqlSession：代表Java程序和会话。（HttpSession是Java程序和浏览器之间的会话）
* SqlSessionFactory：是“生产”SqlSession的“工厂”。
* 工厂模式：如果创建某一个对象，使用的过程基本固定，那么我们就可以把创建这个对象的相关代码封装到一个“工厂类”中，以后都使用这个工厂类来“生产”我们需要的对象。

## 6、修正一个误区

### ①误区

刚开始接触框架，我们会认为Java程序会转入XML配置文件中执行，但其实框架会在初始化时将XML文件读取进来，封装到对象中，再然后就都是Java代码的执行了，XML中的配置是没法执行的。

### ②图解

![./images](./images/img009.png)

### ③源码

#### [1]封装Configuration对象

所在类：org.apache.ibatis.session.defaults. DefaultSqlSessionFactory

![./images](./images/img010.png)

#### [2]准备去获取已映射的指令

所在类：org.apache.ibatis.session.defaults. DefaultSqlSession

![./images](./images/img011.png)

#### [3]正式获取已映射的指令

所在类：org.apache.ibatis.session. Configuration

![./images](./images/img012.png)

#### [4]mappedStatements对象结构

mappedStatements对象的类型：Configuration类中的一个静态内部类：StrictMap

![./images](./images/img013.png)



# 第二节 HelloWorld强化

## 1、加入日志

### ①目的

在Mybatis工作过程中，通过打印日志的方式，将要执行的SQL语句打印出来。

### ②操作

#### [1]加入依赖

```xml
<!-- log4j日志 -->
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

#### [2]加入log4j的配置文件

![./images](./images/img003.png)

支持XML和properties属性文件两种形式。无论使用哪种形式，文件名是固定的：

* log4j.xml
* log4j.properties

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">

<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">

    <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8" />
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m  (%F:%L) \n" />
        </layout>
    </appender>
    <logger name="java.sql">
        <level value="debug" />
    </logger>
    <logger name="org.apache.ibatis">
        <level value="info" />
    </logger>
    <root>
        <level value="debug" />
        <appender-ref ref="STDOUT" />
    </root>
</log4j:configuration>
```

### ③日志的级别

FATAL(致命)>ERROR(错误)>WARN(警告)>INFO(信息)>DEBUG(调试)<br/>

从左到右打印的内容越来越详细

### ④STDOUT

是standard output的缩写，意思是标准输出。对于Java程序来说，打印到标准输出就是打印到控制台。

### ⑤打印效果

> DEBUG 05-24 18:51:13, 331 ==>  Preparing: select emp_id empId, emp_name empName, emp_salary empSalary from t_emp where emp_id=?  (BaseJdbcLogger.java:137)
> DEBUG 05-24 18:51:13, 371 ==> Parameters: 1(Integer)  (BaseJdbcLogger.java:137)
> DEBUG 05-24 18:51:13, 391 <==      Total: 1  (BaseJdbcLogger.java:137)
> o = Employee{empId=1, empName='tom', empSalary=200.33}

## 2、关联外部属性文件

### ①需求

在实际开发时，同一套代码往往会对应多个不同的具体服务器环境。使用的数据库连接参数也不同。为了更好的维护这些信息，我们建议把数据库连接信息提取到Mybatis全局配置文件外边。

### ②做法

![./images](./images/img014.png)

创建jdbc.properties配置文件

```properties
wechat.dev.driver=com.mysql.jdbc.Driver
wechat.dev.url=jdbc:mysql://192.168.198.100:3306/mybatis-example
wechat.dev.username=root
wechat.dev.password=atguigu

wechat.test.driver=com.mysql.jdbc.Driver
wechat.test.url=jdbc:mysql://192.168.198.150:3306/mybatis-example
wechat.test.username=root
wechat.test.password=atguigu

wechat.product.driver=com.mysql.jdbc.Driver
wechat.product.url=jdbc:mysql://192.168.198.200:3306/mybatis-example
wechat.product.username=root
wechat.product.password=atguigu
```

在Mybatis全局配置文件中指定外部jdbc.properties文件的位置

```xml
<properties resource="jdbc.properties"/>
```

在需要具体属性值的时候使用${key}格式引用属性文件中的键

```xml
<dataSource type="POOLED">

    <!-- 建立数据库连接的具体信息（引用了外部属性文件中的数据） -->
    <property name="driver" value="${wechat.dev.driver}"/>
    <property name="url" value="${wechat.dev.url}"/>
    <property name="username" value="${wechat.dev.username}"/>
    <property name="password" value="${wechat.dev.password}"/>

</dataSource>
```

## 3、用上Mapper接口

Mybatis中的Mapper接口相当于以前的Dao。但是区别在于，Mapper仅仅是接口，我们不需要提供实现类。

### ①思路

![./images](./images/img004.png)

### ②调整junit代码

```java
public class ImprovedMybatisTest {

    private SqlSession session;

    // junit会在每一个@Test方法前执行@Before方法
    @Before
    public void init() throws IOException {
         session = new SqlSessionFactoryBuilder()
                 .build(
                         Resources.getResourceAsStream("mybatis-config.xml"))
                 .openSession();
    }

    // junit会在每一个@Test方法后执行@After方法
    @After
    public void clear() {
        session.commit();
        session.close();
    }

}
```

### ③完成Mapper接口

```java
public interface EmployeeMapper {

    Employee selectEmployee(Integer empId);

}
```

* 方法名和SQL的id一致
* 方法返回值和resultType一致
* 方法的参数和SQL的参数一致
* 接口的全类名和映射配置文件的名称空间一致

### ④最终的junit测试方法

```java
@Test
public void testUsrMapperInterface() {

    // 1.根据EmployeeMapper接口的Class对象获取Mapper接口类型的对象
    EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

    // 2.调用EmployeeMapper接口的方法完成对数据库的操作
    Emp emp = employeeMapper.selectEmployee(1L);

    // 3.打印查询结果
    System.out.println("emp = " + emp);
}
```

## 10、增删改操作

### ①insert

SQL语句

```xml
<insert id="insertEmployee">
    <!-- 现在在这条SQL语句中，#{}中的表达式需要被用来从Emp emp实体类中获取emp_name的值、emp_salary的值 -->
    <!-- 而我们从实体类中获取值通常都是调用getXxx()方法 -->
    <!-- 而getXxx()方法、setXxx()方法定义了实体类的属性 -->
    <!-- 定义属性的规则是：把get、set去掉，剩下部分首字母小写 -->
    <!-- 所以我们在#{}中使用getXxx()方法、setXxx()方法定义的属性名即可 -->
    insert into t_emp(emp_name,emp_salary) values(#{empName},#{empSalary})
</insert>
```

Java代码中的Mapper接口：

```java
public interface EmployeeMapper {

    Employee selectEmployee(Integer empId);

    int insertEmployee(Employee employee);
}
```

Java代码中的junit测试：

```java
@Test
public void testSaveEmployee() {

    EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

    // 创建要保存到数据库的对象
    Employee employee = new Employee();

    // 给实体类对象设置具体属性值
    employee.setEmpName("jerry");
    employee.setEmpSalary(5000.33);

    // 执行保存操作
    int result = employeeMapper.insertEmployee(employee);

    // 打印受影响的行数
    System.out.println("result = " + result);
}
```

### ②delete

SQL语句

```xml
    <delete id="deleteEmployee">
        delete from t_emp where emp_id=#{empId}
    </delete>
```

Java代码中的Mapper接口：

```java
public interface EmployeeMapper {

    Employee selectEmployee(Integer empId);

    int insertEmployee(Employee employee);

    int deleteEmployee(Integer empId);
}
```

Java代码中的junit测试：

```java
@Test
public void testRemoveEmployee() {

    EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

    int result = employeeMapper.deleteEmployee(1);

    System.out.println("result = " + result);
}
```

### ③update

SQL语句：

```xml
<update id="updateEmployee">
    update t_emp set emp_name=#{empName},emp_salary=#{empSalary} where emp_id=#{empId}
</update>
```

Java代码中的Mapper接口：

```java
public interface EmployeeMapper {

    Employee selectEmployee(Integer empId);

    int insertEmployee(Employee employee);

    int deleteEmployee(Integer empId);

    int updateEmployee(Employee employee);
}
```

Java代码中的junit测试：

```java
@Test
public void testUpdateEmployee() {

    EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

    Employee employee = new Employee(2, "AAAAAA", 6666.66);

    int result = employeeMapper.updateEmployee(employee);

    System.out.println("result = " + result);
}
```



# 第三节 给SQL语句传参

## 1、#{}方式

Mybatis会在运行过程中，把配置文件中的SQL语句里面的?”占位符，发送给数据库执行。

配置文件中的SQL：

```xml
<delete id="deleteEmployeeById">
    delete from t_emp where emp_id=#{empId}
</delete>
```

实际执行的SQL：

```sql
delete from t_emp where emp_id=?
```

## 2、${}方式

将来会根据${}拼字符串

### ①SQL语句

```xml
<select id="selectEmployeeByName" resultType="com.atguigu.mybatis.entity.Employee">
    select emp_id empId,emp_name empName,emp_salary empSalary from t_emp where emp_name like '%${empName}%'
</select>
```

### ②Mapper接口

注意：由于Mapper接口中方法名是作为SQL语句标签的id，不能重复，所以不允许重载！

```java
public interface EmployeeMapper {

    Employee selectEmployee(Integer empId);

    Employee selectEmployeeByName(@Param("empName") String empName);

    int insertEmployee(Employee employee);

    int deleteEmployee(Integer empId);

    int updateEmployee(Employee employee);
}
```

### ③junit测试

```java
@Test
public void testDollar() {

    EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

    Employee employee = employeeMapper.selectEmployeeByName("r");

    System.out.println("employee = " + employee);
}
```

### ④实际打印的SQL

```sql
select emp_id empId,emp_name empName,emp_salary empSalary from t_emp where emp_name like '%r%'
```

### ⑤应用场景举例

在SQL语句中，数据库表的表名不确定，需要外部动态传入，此时不能使用#{}，因为数据库不允许表名位置使用问号占位符，此时只能使用${}。<br/>

其他情况，只要能用#{}肯定不用${}，避免SQL注入。



# 第四节 数据输入

## 1、Mybatis总体机制概括

![./images](./images/img005.png)

## 2、概念说明

这里数据输入具体是指上层方法（例如Service方法）调用Mapper接口时，数据传入的形式。

* 简单类型：只包含一个值的数据类型
  + 基本数据类型：int、byte、short、double、……
  + 基本数据类型的包装类型：Integer、Character、Double、……
  + 字符串类型：String
* 复杂类型：包含多个值的数据类型
  + 实体类类型：Employee、Department、……
  + 集合类型：List、Set、Map、……
  + 数组类型：int[]、String[]、……
  + 复合类型：List&lt; Employee&gt; 、实体类中包含集合……

## 3、单个简单类型参数

### ①Mapper接口中抽象方法的声明

```java
Employee selectEmployee(Integer empId);
```

### ②SQL语句

```xml
<select id="selectEmployee" resultType="com.atguigu.mybatis.entity.Employee">
    select emp_id empId,emp_name empName,emp_salary empSalary from t_emp where emp_id=#{empId}
</select>
```

## 4、实体类类型参数

### ①Mapper接口中抽象方法的声明

```java
int insertEmployee(Employee employee);
```

### ②SQL语句

```xml
<insert id="insertEmployee">
    insert into t_emp(emp_name,emp_salary) values(#{empName},#{empSalary})
</insert>
```

### ③对应关系

![./images](./images/img006.png)

### ④结论

Mybatis会根据#{}中传入的数据，加工成getXxx()方法，通过反射在实体类对象中调用这个方法，从而获取到对应的数据。填充到#{}这个位置。

## 5、零散的简单类型数据

### ①Mapper接口中抽象方法的声明

```java
int updateEmployee(@Param("empId") Integer empId,@Param("empSalary") Double empSalary);
```

### ②SQL语句

```xml
    <update id="updateEmployee">
        update t_emp set emp_salary=#{empSalary} where emp_id=#{empId}
    </update>
```

### ③对应关系

![./images](./images/img007.png)

## 6、Map类型参数

### ①Mapper接口中抽象方法的声明

```java
int updateEmployeeByMap(Map<String, Object> paramMap);
```

### ②SQL语句

```xml
    <update id="updateEmployeeByMap">
        update t_emp set emp_salary=#{empSalaryKey} where emp_id=#{empIdKey}
    </update>
```

### ③junit测试

```java
@Test
public void testUpdateEmpNameByMap() {

    EmployeeMapper mapper = session.getMapper(EmployeeMapper.class);

    Map<String, Object> paramMap = new HashMap<>();

    paramMap.put("empSalaryKey", 999.99);
    paramMap.put("empIdKey", 5);

    int result = mapper.updateEmployeeByMap(paramMap);

    System.out.println("result = " + result);
}
```

### ④对应关系

#{}中写Map中的key

### ⑤使用场景

有很多零散的参数需要传递，但是没有对应的实体类类型可以使用。使用@Param注解一个一个传入又太麻烦了。所以都封装到Map中。



# 第五节 数据输出

## 1、返回单个简单类型数据

### ①Mapper接口中的抽象方法

```java
int selectEmpCount();
```

### ②SQL语句

```java
    <select id="selectEmpCount" resultType="int">
        select count(*) from t_emp
    </select>
```

### ③junit测试

```java
    @Test
    public void testEmpCount() {

        EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

        int count = employeeMapper.selectEmpCount();

        System.out.println("count = " + count);
    }
```

## 2、返回实体类对象

### ①Mapper接口的抽象方法

```java
Employee selectEmployee(Integer empId);
```

### ②SQL语句

```xml
<!-- 编写具体的SQL语句，使用id属性唯一的标记一条SQL语句 -->
<!-- resultType属性：指定封装查询结果的Java实体类的全类名 -->
<select id="selectEmployee" resultType="com.atguigu.mybatis.entity.Employee">
    <!-- Mybatis负责把SQL语句中的#{}部分替换成“?”占位符 -->
    <!-- 给每一个字段设置一个别名，让别名和Java实体类中属性名一致 -->
    select emp_id empId,emp_name empName,emp_salary empSalary from t_emp where emp_id=#{maomi}
</select>
```

通过给数据库表字段加别名，让查询结果的每一列都和Java实体类中属性对应起来。

### ③增加全局配置自动识别对应关系

做了下面的配置，select语句中可以不给字段设置别名

```xml
<!-- 在全局范围内对Mybatis进行配置 -->
<settings>
    <!-- 具体配置 -->
    <!-- 从org.apache.ibatis.session.Configuration类中可以查看能使用的配置项 -->
    <!-- 将mapUnderscoreToCamelCase属性配置为true，表示开启自动映射驼峰式命名规则 -->
    <!-- 规则要求数据库表字段命名方式：单词_单词 -->
    <!-- 规则要求Java实体类属性名命名方式：首字母小写的驼峰式命名 -->
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

## 3、返回Map类型

适用于SQL查询返回的各个字段综合起来并不和任何一个现有的实体类对应，没法封装到实体类对象中。能够封装成实体类类型的，就不使用Map类型。

### ①Mapper接口的抽象方法

```java
Map<String,Object> selectEmpNameAndMaxSalary();
```

### ②SQL语句

```xml
<!-- Map<String,Object> selectEmpNameAndMaxSalary(); -->
<!-- 返回工资最高的员工的姓名和他的工资 -->
<select id="selectEmpNameAndMaxSalary" resultType="map">
        SELECT
            emp_name 员工姓名,
            emp_salary 员工工资,
            (SELECT AVG(emp_salary) FROM t_emp) 部门平均工资
        FROM t_emp WHERE emp_salary=(
            SELECT MAX(emp_salary) FROM t_emp
        )
</select>
```

### ③junit测试

```java
    @Test
    public void testQueryEmpNameAndSalary() {

        EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

        Map<String, Object> resultMap = employeeMapper.selectEmpNameAndMaxSalary();

        Set<Map.Entry<String, Object>> entrySet = resultMap.entrySet();

        for (Map.Entry<String, Object> entry : entrySet) {
            String key = entry.getKey();
            Object value = entry.getValue();
            System.out.println(key + "=" + value);
        }
    }
```

## 4、返回List类型

查询结果返回多个实体类对象，希望把多个实体类对象放在List集合中返回。此时不需要任何特殊处理，在resultType属性中还是设置实体类类型即可。

### ①Mapper接口中抽象方法

```java
List<Employee> selectAll();
```

### ②SQL语句

```xml
    <!-- List<Employee> selectAll(); -->
    <select id="selectAll" resultType="com.atguigu.mybatis.entity.Employee">
        select emp_id empId,emp_name empName,emp_salary empSalary
        from t_emp
    </select>
```

### ③junit测试

```java
    @Test
    public void testSelectAll() {

        EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

        List<Employee> employeeList = employeeMapper.selectAll();

        for (Employee employee : employeeList) {
            System.out.println("employee = " + employee);
        }

    }
```

## 5、返回自增主键

### ①使用场景

例如：保存订单信息。需要保存Order对象和List&lt; OrderItem&gt; 。其中，OrderItem对应的数据库表，包含一个外键，指向Order对应表的主键。<br/>

在保存List&lt; OrderItem&gt; 的时候，需要使用下面的SQL：

```sql
insert into t_order_item(item_name,item_price,item_count,order_id) values(...)
```

这里需要用到的order_id，是在保存Order对象时，数据库表以自增方式产生的，需要特殊办法拿到这个自增的主键值。至于，为什么不能通过查询最大主键的方式解决这个问题，参考下图：

![./images](./images/img008.png)

### ②在Mapper配置文件中设置方式

#### [1]Mapper接口中的抽象方法

```java
int insertEmployee(Employee employee);
```

#### [2]SQL语句

```xml
<!-- int insertEmployee(Employee employee); -->
<!-- useGeneratedKeys属性字面意思就是“使用生成的主键” -->
<!-- keyProperty属性可以指定主键在实体类对象中对应的属性名，Mybatis会将拿到的主键值存入这个属性 -->
<insert id="insertEmployee" useGeneratedKeys="true" keyProperty="empId">
    insert into t_emp(emp_name,emp_salary)
    values(#{empName},#{empSalary})
</insert>
```

### [3]junit测试

```java
@Test
public void testSaveEmp() {

    EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

    Employee employee = new Employee();

    employee.setEmpName("john");
    employee.setEmpSalary(666.66);

    employeeMapper.insertEmployee(employee);

    System.out.println("employee.getEmpId() = " + employee.getEmpId());

}
```

### ④注意

Mybatis是将自增主键的值设置到实体类对象中，而不是以Mapper接口方法返回值的形式返回。

### ⑤不支持自增主键的数据库

而对于不支持自增型主键的数据库（例如 Oracle），则可以使用 selectKey 子元素：selectKey  元素将会首先运行，id  会被设置，然后插入语句会被调用

```xml
<insert id="insertEmployee"
		parameterType="com.atguigu.mybatis.beans.Employee"
			databaseId="oracle">
		<selectKey order="BEFORE" keyProperty="id"
                                       resultType="integer">
			select employee_seq.nextval from dual
		</selectKey>
		insert into orcl_employee(id,last_name,email,gender) values(#{id},#{lastName},#{email},#{gender})
</insert>
```

或者是

```xml
<insert id="insertEmployee"
		parameterType="com.atguigu.mybatis.beans.Employee"
			databaseId="oracle">
		<selectKey order="AFTER" keyProperty="id"
                                         resultType="integer">
			select employee_seq.currval from dual
		</selectKey>
	insert into orcl_employee(id,last_name,email,gender) values(employee_seq.nextval,#{lastName},#{email},#{gender})
</insert>
```

## 6、数据库表字段和实体类属性对应关系

### ①别名

将字段的别名设置成和实体类属性一致。

```xml
<!-- 编写具体的SQL语句，使用id属性唯一的标记一条SQL语句 -->
<!-- resultType属性：指定封装查询结果的Java实体类的全类名 -->
<select id="selectEmployee" resultType="com.atguigu.mybatis.entity.Employee">
    <!-- Mybatis负责把SQL语句中的#{}部分替换成“?”占位符 -->
    <!-- 给每一个字段设置一个别名，让别名和Java实体类中属性名一致 -->
    select emp_id empId,emp_name empName,emp_salary empSalary from t_emp where emp_id=#{maomi}
</select>
```

> 关于实体类属性的约定：
>
> getXxx()方法、setXxx()方法把方法名中的get或set去掉，首字母小写。

### ②全局配置自动识别驼峰式命名规则

在Mybatis全局配置文件加入如下配置：

```xml
<!-- 使用settings对Mybatis全局进行设置 -->
<settings>
    <!-- 将xxx_xxx这样的列名自动映射到xxXxx这样驼峰式命名的属性名 -->
    <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

SQL语句中可以不使用别名

```xml
<!-- Employee selectEmployee(Integer empId); -->
<select id="selectEmployee" resultType="com.atguigu.mybatis.entity.Employee">
    select emp_id,emp_name,emp_salary from t_emp where emp_id=#{empId}
</select>
```

### ③使用resultMap

使用resultMap标签定义对应关系，再在后面的SQL语句中引用这个对应关系

```xml
<!-- 专门声明一个resultMap设定column到property之间的对应关系 -->
<resultMap id="selectEmployeeByRMResultMap" type="com.atguigu.mybatis.entity.Employee">

    <!-- 使用id标签设置主键列和主键属性之间的对应关系 -->
    <!-- column属性用于指定字段名；property属性用于指定Java实体类属性名 -->
    <id column="emp_id" property="empId"/>

    <!-- 使用result标签设置普通字段和Java实体类属性之间的关系 -->
    <result column="emp_name" property="empName"/>
    <result column="emp_salary" property="empSalary"/>
</resultMap>

<!-- Employee selectEmployeeByRM(Integer empId); -->
<select id="selectEmployeeByRM" resultMap="selectEmployeeByRMResultMap">
    select emp_id,emp_name,emp_salary from t_emp where emp_id=#{empId}
</select>
```


