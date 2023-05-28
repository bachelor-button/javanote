module.exports = {
    locales: {
        "/": {
            lang: "zh-CN",
            title: "Java全栈",
            description:
                "Java 基础, Java 部分源码, JVM, Spring, Spring Boot, Spring Cloud, 数据库原理, MySQL, ElasticSearch, Docker, Linux, 分布式, 中间件, Git"
        }
    },
    base: "/javanote/",
    themeConfig: {
        smoothScroll: true,
        sidebar: {
            "/note/basic/java/": [
                "day01/",
                "day02/",
                "day03/",
                "day04/",
                "day05/",
                "day06/",
                "day07/",
                "day08/",
                "day09/",
                "day10/",
                "day11/",
                "day12/",
                "day13/",
                "day14/",
                "day15/",
                "day16/",
                "day17/",
                "day18/",
                "day19/",
                "day20/",
                "day21/",
                "day22/",
                "day23/"
            ],
            "/note/basic/linux/": [
                "background/",
                "authority/",
                "commands/auxiliary-command/",
                "environment/",
                "service/",
                "shell/"
            ],
            "/note/basic/mysql/": [
                "mysql-basic/",
                "mysql-multiple-tables/",
                "mysql-functions&transactions&dcl/",
                "jdbc&connection-pool&dbutils/"
            ],
            "/note/basic/web/": [
                "WEBday01_HTML-CSS/",
                "WEBday02_JS&Regular-expression/",
                "WEBday03_VUE&Mall-project-first-phase/",
                "WEBday04_XML&Tomcat&Http/",
                "WEBday05_Servlet/",
                "WEBday06_Request&Response/",
                "WEBday07_The-second-phase-of-the-book-city-project/",
                "WEBday08_Thymeleaf/",
                "WEBday09_The-third-phase-of-the-book-city-project/",
                "WEBday10_Conversation-&-Book-City-Project-Phase-4/",
                "WEBday11_The-fourth-phase-of-the-book-city-project/",
                "WEBday12_Filter&Listenler&Book-City-Project-Phase-5/",
                "WEBday13_Book-City-Project-Phase-5/",
                "WEBday14_Ajax&Axios&Book-City-Project-Phase-6/",
                "WEBday15_The-sixth-stage-of-the-book-city-project-&-summary/"
            ],
            "/note/advance/juc/": [
                "chapter01/",
                "chapter02/",
                "chapter03/",
                "chapter04/",
                "chapter05/",
                "chapter06/",
                "chapter07/",
                "chapter08/",
                "chapter09/"
            ],
            "/note/advance/jvm/": [
                "chapter01/",
                "chapter02/",
                "chapter03/",
                "chapter04/",
                "chapter05/",
                "chapter06/",
                "chapter07/",
                "chapter08/",
                "chapter09/",
                "chapter10/",
                "chapter11/",
            ],
            "/note/advance/mysql/": [
                "chapter01/",
                "chapter02/",
                "chapter03/",
                "chapter04/",
                "chapter05/",
                "chapter06/",
                "chapter07/",
                "chapter08/",
                "chapter09/",
                "chapter10/",
                "chapter11/"
            ],
            "/note/microservice/": [
                "springboot/",
                {
                    title: "springcloud",
                    children: ["springcloud/day01/", "springcloud/day02/"]
                },
                "distributed-transaction/",
                "docker/"
            ],
            "/note/middleware/": [
                {
                    title: "elasticsearch",
                    children: ["elasticsearch/day01/", "elasticsearch/day02/"]
                },
                {
                    title: "rabbitmq",
                    children: ["rabbitmq/day01/", "rabbitmq/day02/"]
                },
                "nginx/",
                "redis/"
            ],
            "/note/others/": ["cryptography/"],
            "/note/ssm/": [
                {
                    title: "mybatis",
                    children: [
                        "mybatis/basic-usage/",
                        "mybatis/cache/",
                        "mybatis/dynamic-sql/",
                        "mybatis/generator/",
                        "mybatis/others/",
                        "mybatis/preface/",
                        "mybatis/sqlmap-xml/"
                    ]
                },
                {
                    title: "spring",
                    children: [
                        "spring/AOP-aspect-oriented-programming/agency-model/",
                        "spring/AOP-aspect-oriented-programming/annotation-based-AOP/",
                        "spring/AOP-aspect-oriented-programming/AOP-terminology/",
                        "spring/AOP-aspect-oriented-programming/scene-setting/",
                        "spring/AOP-aspect-oriented-programming/the-impact-of-AOP-on-obtaining-beans/",
                        "spring/AOP-aspect-oriented-programming/XML-based-AOP/",
                        "spring/declarative-transaction/annotation-based-declarative-transaction/",
                        "spring/declarative-transaction/declarative-transaction/",
                        "spring/declarative-transaction/declarative-transaction-concept/",
                        "spring/declarative-transaction/JDBCTemplate/",
                        "spring/declarative-transaction/XML-based-declarative-transaction/",
                        "spring/IOC-container/beans-based-on-annotations/",
                        "spring/IOC-container/Introduction-to-spring/",
                        "spring/IOC-container/IOC-container-concept/",
                        "spring/IOC-container/XML-management-bean/",
                        "spring/spring5-new-features/JSP305/",
                        "spring/spring5-new-features/junit5/"
                    ]
                },
                {
                    title: "springmvc",
                    children: [
                        "springmvc/basic-function/",
                        "springmvc/principle-of-operation/",
                        "springmvc/request&response/",
                        "springmvc/restful/",
                        "springmvc/specific-functional-unit/",
                        "springmvc/ssm-integration/"
                    ]
                }
            ],
            "/note/tools/": [
                "git/",
                {
                    title: "maven",
                    children: [
                        "maven/jar-problem/",
                        "maven/maven-idea/",
                        "maven/maven-install&config/",
                        "maven/maven-overview/",
                        "maven/maven-with-command/"
                    ]
                }
            ]
        },

        nav: [
            {
                text: "基础",
                items: [
                    {
                        text: "Java",
                        link: "/note/basic/java/day01/"
                    },
                    {
                        text: "linux",
                        link: "/note/basic/linux/background/"
                    },
                    {
                        text: "mysql",
                        link: "/note/basic/mysql/mysql-basic/"
                    },
                    {
                        text: "web",
                        link: "/note/basic/web/WEBday01_HTML-CSS/"
                    }
                ]
            },
            {
                text: "高级",
                items: [
                    {
                        text: "JUC",
                        link: "/note/advance/juc/chapter01/"
                    },
                    {
                        text: "JVM",
                        link: "/note/advance/jvm/chapter01/"
                    },
                    {
                        text: "MYSQL",
                        link: "/note/advance/mysql/chapter01/"
                    },
                ]
            },
            {
                text: "中间件",
                items: [
                    {
                        text: "rabbitmq",
                        link: "/note/middleware/rabbitmq/day01/"
                    },
                    {
                        text: "elasticsearch",
                        link: "/note/middleware/elasticsearch/day01/"
                    },
                    {
                        text: "Redis",
                        link: "/note/middleware/redis/"
                    },
                    {
                        text: "nginx",
                        link: "/note/middleware/nginx/"
                    }
                ]
            },
            {
                text: "微服务",
                items: [
                    {
                        text: "springboot",
                        link: "/note/microservice/springboot/"
                    },
                    {
                        text: "springcloud",
                        link: "/note/microservice/springcloud/day01/"
                    },
                    {
                        text: "Docker",
                        link: "/note/microservice/docker/"
                    },
                    {
                        text: "分布式事务",
                        link: "/note/microservice/distributed-transaction/"
                    }
                ]
            },
            {
                text: "工具",
                items: [
                    {
                        text: "git",
                        link: "/note/tools/git/"
                    },
                    {
                        text: "maven",
                        link: "/note/tools/maven/maven-overview/"
                    }
                ]
            },
            {
                text: "ssm",
                items: [
                    {
                        text: "mybatis",
                        link: "/note/ssm/mybatis/preface/"
                    },
                    {
                        text: "spring",
                        link:
                            "/note/ssm/spring/AOP-aspect-oriented-programming/agency-model/"
                    },
                    {
                        text: "springmvc",
                        link: "/note/ssm/springmvc/basic-function/"
                    }
                ]
            },
            {
                text: "其他",
                items: [
                    {
                        text: "密码学",
                        link: "/note/others/cryptography/"
                    }
                ]
            }

        ]
    },
    plugins: [
        ["@vuepress/medium-zoom"],
        ["@vuepress/active-header-links"],
        ["img-lazy"],
        ["vuepress-plugin-code-copy"],
        ["fulltext-search"],
        ["@vuepress/back-to-top"]
    ]
};
