# 01-前端整合发送短信验证码

## 一、运行srb-site

### 1、解压

srb_site

### 2、运行
```shell
npm run dev
```

## 二、前端页面整合

pages/register.vue
```html
  methods: {
    //发短信  
    send() {
      if (!this.userInfo.mobile) {
        this.$message.error('请输入手机号')
        return
      }

      //防止重复提交
      if (this.sending) return
      this.sending = true

      //倒计时
      this.timeDown()

      //远程调用发送短信的接口
      this.$axios
        .$get('/api/sms/send/' + this.userInfo.mobile)
        .then((response) => {
          this.$message.success(response.message)
        })
    },

    //倒计时
    timeDown() {
      console.log('进入倒计时')
      this.leftSecond = this.second
      //创建定时器
      const timmer = setInterval(() => {
        //计数器减一
        this.leftSecond--
        if (this.leftSecond <= 0) {
          //停止定时器
          clearInterval(timmer)
          //还原计数器
          this.leftSecond = this.second
          //还原按钮状态
          this.sending = false
        }
      }, 1000)
    },
  },
```

