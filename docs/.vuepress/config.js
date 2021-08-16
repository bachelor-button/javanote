module.exports = {
    locales: {
        "/": {
            base: "/javanote/",
            lang: "zh-CN",
            title: "Java全栈",
            description:
                "Java 基础, Java 部分源码, JVM, Spring, Spring Boot, Spring Cloud, 数据库原理, MySQL, ElasticSearch, Docker, Linux, 分布式, 中间件, Git",
        },
    },
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
                "day23/",
            ],
            "/note/basic/linux/": [
                "background/",
                "authority/",
                "commands/auxiliary-command/",
                "environment/",
                "service/",
                "shell/",
            ],
            "/note/basic/mysql/": [
                "mysql-basic/",
                "mysql-multiple-tables/",
                "mysql-functions&transactions&dcl/",
                "jdbc&connection-pool&dbutils/",
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
                "WEBday15_The-sixth-stage-of-the-book-city-project-&-summary/",
            ],
            "/note/microservice/": [
                "springboot/",
                {
                    title: "springcloud",
                    children: ["springcloud/day01/", "springcloud/day02/"],
                },
                "distributed-transaction/",
                "docker/",
            ],
            "/note/middleware/": [
                {
                    title: "elasticsearch",
                    children: ["elasticsearch/day01/", "elasticsearch/day02/"],
                },
                {
                    title: "rabbitmq",
                    children: ["rabbitmq/day01/", "rabbitmq/day02/"],
                },
                "nginx/",
                "redis/",
            ],
            "/note/others/": ["cryptography/"],
            "/note/project/meinian/": [
                "note1/",
                "note2/",
                "note3/",
                "note4/",
                "note5/",
                "note6/",
                "note7/",
                "note8/",
                "note9/",
                "note10/",
                "note11/",
                "note12/",
            ],
            "/note/project/ShangRongbao/": [
                {
                    title: "第一部分",
                    children: [
                        {
                            title: "第一节",
                            children: [
                                "The-first-part/Part01-Project-Introduction/01-introduction/",
                                "The-first-part/Part01-Project-Introduction/02-Development-environment/",
                                "The-first-part/Part01-Project-Introduction/03-Shangrongbao/",
                            ],
                        },
                        {
                            title: "第二节",
                            children: [
                                "The-first-part/Part02-MyBatis-Plus/01-MyBatis-Plus/",
                                "The-first-part/Part02-MyBatis-Plus/02-Basic-CRUD/",
                                "The-first-part/Part02-MyBatis-Plus/03-Common-notes/",
                                "The-first-part/Part02-MyBatis-Plus/04-Plugin/",
                                "The-first-part/Part02-MyBatis-Plus/05-Condition-Constructor/",
                            ],
                        },
                        {
                            title: "第三节",
                            children: [
                                "The-first-part/Part03-Front-end-knowledge/00-development-tools/",
                                "The-first-part/Part03-Front-end-knowledge/01-Node/",
                                "The-first-part/Part03-Front-end-knowledge/02-ECMAScript-6/",
                                "The-first-part/Part03-Front-end-knowledge/03-axios/",
                                "The-first-part/Part03-Front-end-knowledge/04-Modular/",
                                "The-first-part/Part03-Front-end-knowledge/05-Vue/",
                                "The-first-part/Part03-Front-end-knowledge/06-Vue-UI-component-library/",
                                "The-first-part/Part03-Front-end-knowledge/07-Vue-Router/",
                            ],
                        },
                    ],
                },
                {
                    title: "第二部分",
                    children: [
                        {
                            title: "第四节",
                            children: [
                                "The-second-part/Part04-Back-end-interface-project-construction/01-Create-Shangrongbao-interface-project/",
                                "The-second-part/Part04-Back-end-interface-project-construction/02-Point-level-CRUD/",
                                "The-second-part/Part04-Back-end-interface-project-construction/03-Return-the-result-uniformly/",
                                "The-second-part/Part04-Back-end-interface-project-construction/04-Unified-exception-handling/",
                                "The-second-part/Part04-Back-end-interface-project-construction/05-Unified-log-processing/",
                            ],
                        },
                        {
                            title: "第五节",
                            children: [
                                "The-second-part/Part05-front-end-construction/01-NPM-Package-Manager/",
                                "The-second-part/Part05-front-end-construction/02-front-end-management-platform/",
                                "The-second-part/Part05-front-end-construction/03-Route-configuration/",
                                "The-second-part/Part05-front-end-construction/04-Front-end-project-development-process/",
                                "The-second-part/Part05-front-end-construction/05-Improve-the-integral-level-module/",
                                "The-second-part/Part05-front-end-construction/06-About-Vue-components-(understand)/",
                            ],
                        },
                        {
                            title: "第六节",
                            children: [
                                "The-second-part/Part06-Alibaba-EasyExcel/01-Introduction-to-EasyExcel/",
                                "The-second-part/Part06-Alibaba-EasyExcel/02-Read-and-write-Excel/",
                            ],
                        },
                        {
                            title: "第七节",
                            children: [
                                "The-second-part/Part07-Data-Dictionary/01-Data-dictionary-design/",
                                "The-second-part/Part07-Data-Dictionary/02-Excel-data-batch-import/",
                                "The-second-part/Part07-Data-Dictionary/03-Excel-data-batch-export/",
                                "The-second-part/Part07-Data-Dictionary/04-Data-dictionary-list-display/",
                            ],
                        },
                        {
                            title: "第八节",
                            children: [
                                "The-second-part/Part08-Redis-cache/01-Integrated-Redis-cache/",
                                "The-second-part/Part08-Redis-cache/02-Use-cache-to-get-data/",
                            ],
                        },
                        {
                            title: "第九节",
                            children: [
                                "The-second-part/Part09-Alibaba-Cloud-SMS/01-Alibaba-Cloud-SMS-Service/",
                                "The-second-part/Part09-Alibaba-Cloud-SMS/02-Create-SMS-microservice/",
                            ],
                        },
                        {
                            title: "第十节",
                            children: [
                                "The-second-part/Part10-Distributed-File-System-Alibaba-Cloud-OSS/01-Alibaba-Cloud-Storage-OSS/",
                                "The-second-part/Part10-Distributed-File-System-Alibaba-Cloud-OSS/02-Use-SDK-to-access-OSS/",
                                "The-second-part/Part10-Distributed-File-System-Alibaba-Cloud-OSS/03-Create-OSS-microservice/",
                            ],
                        },
                        {
                            title: "第十一节",
                            children: [
                                "The-second-part/Part11-Access-token/01-Single-sign-on/",
                                "The-second-part/Part11-Access-token/02-JWT-token/",
                                "The-second-part/Part11-Access-token/03-JWT-test/",
                            ],
                        },
                        {
                            title: "第十二节",
                            children: [
                                "The-second-part/Part12-NuxtJS-server-side-rendering/01-Server-side-rendering-technology/",
                                "The-second-part/Part12-NuxtJS-server-side-rendering/02-Nuxt/",
                                "The-second-part/Part12-NuxtJS-server-side-rendering/03-Remote-data-acquisition-and-binding/",
                            ],
                        },
                        {
                            title: "第十三节",
                            children: [
                                "The-second-part/Part13-User-Registration/01-Front-end-integration-to-send-SMS-verification-code/",
                                "The-second-part/Part13-User-Registration/02-Realize-user-registration/",
                            ],
                        },
                        {
                            title: "第十四节",
                            children: [
                                "The-second-part/Part14-User-Authentication/01-Realize-user-login/",
                                "The-second-part/Part14-User-Authentication/02-Verify-user-login/",
                            ],
                        },
                        {
                            title: "第十五节",
                            children: [
                                "The-second-part/Part15-Member-Management/01-Member-Pagination-List/",
                                "The-second-part/Part15-Member-Management/02-Lock-and-unlock/",
                                "The-second-part/Part15-Member-Management/03-Display-login-log/",
                            ],
                        },
                    ],
                },
                {
                    title: "第三部分",
                    children: [
                        {
                            title: "第十六节",
                            children: [
                                "The-third-part/Part16-service-call/01-Registration-Center-and-Service-Discovery/",
                                "The-third-part/Part16-service-call/02-OpenFeign/",
                                "The-third-part/Part16-service-call/03-Sentinel/",
                            ],
                        },
                        {
                            title: "第十七节",
                            children: [
                                "The-third-part/Part17-Service-Gateway/01-Micro-Service-Gateway/",
                            ],
                        },
                    ],
                },
                {
                    title: "第四部分",
                    children: [
                        {
                            title: "第十八节",
                            children: [
                                "The-fourth-part/Part18-Account-Binding/01-Demand-introduction/",
                                "The-fourth-part/Part18-Account-Binding/02-Call-Huifubao-to-realize-account-creation/",
                                "The-fourth-part/Part18-Account-Binding/03-Callback-interface-to-realize-account-binding/",
                            ],
                        },
                        {
                            title: "第十九节",
                            children: [
                                "The-fourth-part/Part19-Loan-Limit-Application/01-Demand-introduction/",
                                "The-fourth-part/Part19-Loan-Limit-Application/02-Borrower-Information-Form/",
                                "The-fourth-part/Part19-Loan-Limit-Application/03-Form-data-display/",
                                "The-fourth-part/Part19-Loan-Limit-Application/04-Form-data-submission/",
                                "The-fourth-part/Part19-Loan-Limit-Application/05-Get-the-status-of-the-borrower/",
                            ],
                        },
                        {
                            title: "第二十节",
                            children: [
                                "The-fourth-part/Part20-Loan-Limit-Review/01-Borrowing-list-display/",
                                "The-fourth-part/Part20-Loan-Limit-Review/02-Borrower-information-display/",
                                "The-fourth-part/Part20-Loan-Limit-Review/03-Review-of-loan-limit/",
                            ],
                        },
                        {
                            title: "第二十一节",
                            children: [
                                "The-fourth-part/Part21-Loan-Application/01-Demand-introduction/",
                                "The-fourth-part/Part21-Loan-Application/02-Get-the-loan-amount/",
                                "The-fourth-part/Part21-Loan-Application/03-Submit-loan-application/",
                                "The-fourth-part/Part21-Loan-Application/04-Get-the-status-of-loan-application/",
                            ],
                        },
                        {
                            title: "第二十二节",
                            children: [
                                "The-fourth-part/Part22-Loan-Review/01-Borrowing-information-list/",
                                "The-fourth-part/Part22-Loan-Review/02-Loan-details/",
                                "The-fourth-part/Part22-Loan-Review/03--Loan-approval/",
                            ],
                        },
                        {
                            title: "第二十三节",
                            children: [
                                "The-fourth-part/Part23-Subject-Management/01-Demand-introduction/",
                                "The-fourth-part/Part23-Subject-Management/02-Generate-a-new-target/",
                                "The-fourth-part/Part23-Subject-Management/03-Subject-list/",
                                "The-fourth-part/Part23-Subject-Management/04-Subject-details/",
                            ],
                        },
                        {
                            title: "第二十四节",
                            children: [
                                "The-fourth-part/Part24-I-want-to-invest/01-List-of-investment-targets/",
                            ],
                        },
                        {
                            title: "第二十五节",
                            children: [
                                "The-fourth-part/Part25-recharge/01-Demand-introduction/",
                                "The-fourth-part/Part25-recharge/02-Recharge/",
                                "The-fourth-part/Part25-recharge/03-Callback-interface/",
                                "The-fourth-part/Part25-recharge/04-Idempotence-of-interface-calls/",
                            ],
                        },
                        {
                            title: "第二十六节",
                            children: [
                                "The-fourth-part/Part26-Bid/01-Demand-introduction/",
                                "The-fourth-part/Part26-Bid/02-Subject-details/",
                                "The-fourth-part/Part26-Bid/03-Calculate-the-income/",
                                "The-fourth-part/Part26-Bid/04-Bid/",
                                "The-fourth-part/Part26-Bid/05-Callback-interface/",
                            ],
                        },
                        {
                            title: "第二十七节",
                            children: [
                                "The-fourth-part/Part27-Loan/01-Demand-introduction/",
                                "The-fourth-part/Part27-Loan/02-Management-platform-lending/",
                                "The-fourth-part/Part27-Loan/03-Repayment-plan-and-repayment-plan/",
                            ],
                        },
                        {
                            title: "第二十八节",
                            children: [
                                "The-fourth-part/Part28-Investment-list-display/01-Management-terminal-displays-investment-records/",
                                "The-fourth-part/Part28-Investment-list-display/02-Display-investment-records-on-the-website/",
                                "The-fourth-part/Part28-Investment-list-display/03-The-management-terminal-displays-the-repayment-plan/",
                                "The-fourth-part/Part28-Investment-list-display/04-Repayment-plan-displayed-on-the-website/",
                                "The-fourth-part/Part28-Investment-list-display/05-Return-plan-displayed-on-the-website/",
                            ],
                        },
                        {
                            title: "第二十九节",
                            children: [
                                "The-fourth-part/Part29-Withdrawal-and-Repayment/01-Withdraw/",
                                "The-fourth-part/Part29-Withdrawal-and-Repayment/02-Repayment/",
                            ],
                        },
                        {
                            title: "第三十节",
                            children: [
                                "The-fourth-part/Part30-personal-center/01-Fund-Record/",
                                "The-fourth-part/Part30-personal-center/02-Personal-Center-Homepage/",
                            ],
                        },
                        {
                            title: "第三十一节",
                            children: [
                                "The-fourth-part/PartA-RabbitMQ/01-Integrate-Rabbit-MQ-to-send-SMS/",
                            ],
                        },
                    ],
                },
            ],
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
                        "mybatis/sqlmap-xml/",
                    ],
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
                        "spring/spring5-new-features/junit5/",
                    ],
                },
                {
                    title: "springmvc",
                    children: [
                        "springmvc/basic-function/",
                        "springmvc/principle-of-operation/",
                        "springmvc/request&response/",
                        "springmvc/restful/",
                        "springmvc/specific-functional-unit/",
                        "springmvc/ssm-integration/",
                    ],
                },
            ],
            "/note/tools/": [
                // {
                //     title: "git",
                //     children: [],
                // },
                "git/",
                {
                    title: "maven",
                    children: [
                        "maven/jar-problem/",
                        "maven/maven-idea/",
                        "maven/maven-install&config/",
                        "maven/maven-overview/",
                        "maven/maven-with-command/",
                    ],
                },
            ],
        },

        nav: [
            {
                text: "基础",
                items: [
                    {
                        text: "Java",
                        link: "/note/basic/java/day01/",
                    },
                    {
                        text: "linux",
                        link: "/note/basic/linux/background/",
                    },
                    {
                        text: "mysql",
                        link: "/note/basic/mysql/mysql-basic/",
                    },
                    {
                        text: "web",
                        link: "/note/basic/web/WEBday01_HTML-CSS/",
                    },
                ],
            },

            {
                text: "中间件",
                items: [
                    {
                        text: "rabbitmq",
                        link: "/note/middleware/rabbitmq/day01/",
                    },
                    {
                        text: "elasticsearch",
                        link: "/note/middleware/elasticsearch/day01/",
                    },
                    {
                        text: "Redis",
                        link: "/note/middleware/redis/",
                    },
                    {
                        text: "nginx",
                        link: "/note/middleware/nginx/",
                    },
                ],
            },
            {
                text: "微服务",
                items: [
                    {
                        text: "springboot",
                        link: "/note/microservice/springboot/",
                    },
                    {
                        text: "springcloud",
                        link: "/note/microservice/springcloud/day01/",
                    },
                    {
                        text: "Docker",
                        link: "/note/microservice/docker/",
                    },
                    {
                        text: "分布式事务",
                        link: "/note/microservice/distributed-transaction/",
                    },
                ],
            },
            // NavbarItem
            {
                text: "项目",
                items: [
                    {
                        text: "尚融宝",
                        link: "/note/project/ShangRongbao/The-first-part/Part01-Project-Introduction/01-introduction/",
                    },
                    {
                        text: "美年旅游",
                        link: "/note/project/meinian/note1/",
                    },
                ],
            },
            {
                text: "工具",
                items: [
                    {
                        text: "git",
                        link: "/note/tools/git/",
                    },
                    {
                        text: "maven",
                        link: "/note/tools/maven/maven-overview/",
                    },
                ],
            },
            {
                text: "ssm",
                items: [
                    {
                        text: "mybatis",
                        link: "/note/ssm/mybatis/preface/",
                    },
                    {
                        text: "spring",
                        link: "/note/ssm/spring/AOP-aspect-oriented-programming/agency-model/",
                    },
                    {
                        text: "springmvc",
                        link: "/note/ssm/springmvc/basic-function/",
                    },
                ],
            },
            {
                text: "其他",
                items: [
                    {
                        text: "密码学",
                        link: "/note/others/cryptography/",
                    },
                ],
            },

            // 字符串 - 页面文件路径
        ],
    },
    plugins: [
        ["@vuepress/medium-zoom"],
        ["@vuepress/active-header-links"],
        ["img-lazy"],
        ["vuepress-plugin-code-copy"],
        ["fulltext-search"],
        ["go-top"],
    ],
};
