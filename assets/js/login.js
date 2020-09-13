$(function () {
  // link-login
  $('#link-login').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // link-reg
  $('#link-reg').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 自定义规则
  // window.$
  // var form = window.layui.form

  layui.form.verify({
    //LayUI的验证写法有二
    // 1. 也支持下述数组的形式
    // 2. 既支持上述函数式的方式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

    // login的form的rule
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

    // reg的form的rule
    repassword: function (value) {
      //value：表单的值
      if ($('#reg-psd').val() !== value) {
        return '密码不一致'
      }
    },
  })

  // 发送注册请求reg-btn

  // 1. 绑定submit事件

  $('#btn-reg').submit(function (e) {
    // 2. 阻止默认行为
    e.preventDefault()
    // 3. 获取表单数据
    // var username = $('.reg-box input [name=username]').val()
    var username = $('#reg-username').val()
    var password = $('#reg-psd').val()
    // 4. 看接口文档 发送ajax
    // 项目的请求根路径为 http://ajax.frontend.itheima.net
    var formdata = {
      username: username,
      password: password,
    }
    $.post('/api/reguser', formdata, function (res) {
      // 5. 处理res响应
      // 请求是否成功，0：成功；1：失败
      if (res.status === 0) {
        $('#link-reg').click()
      }

      // 进入登录页面index.html
      // window.location.href="/index.html"

      layui.layer.msg(res.message)
    })
  })

  // login请求
  $('#btn-login').submit(function (e) {
    e.preventDefault()
    var formdata = $(this).serialize()
    $.post('/api/login', formdata, function (res) {
      if (res.status === 0) {
        // 跳转
        window.location.href = '/index.html'
        // token(令牌)  场景：当要去请求有权限（）要求的接口时-  --- TODO 看接口文档
        // console.log(res.token)
        // if(res.token.length!==0){
        //   window.localStorage.setItem('token', res.token)
        // }
        res.token.length !== 0 &&
          window.localStorage.setItem('token', res.token)
      }
      layui.layer.msg(res.message)
    })
  })
})

// function==>
// 1. 形参-> 默认形参-> (e)
// 2. 返回值-> return -> var 变量 = fn()
