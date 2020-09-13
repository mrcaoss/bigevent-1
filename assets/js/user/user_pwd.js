$(function () {
  // diff
  // same
  layui.form.verify({
    len: [/^\S{6,12}$/, '长度必须6到12位，不能有空格'],

    // 验证新密码不能和原密码相同
    diff: function (value) {
      // value 表示新密码
      // 获取原密码
      var oldPwd = $('[name="oldPwd"]').val()
      if (value === oldPwd) {
        return '新密码不能和原密码相同'
      }
    },
    // 验证新密码和确认密码是否相同
    same: function (value) {
      // value 表示新密码
      // 获取原密码
      var newPwd = $('[name="newPwd"]').val()
      if (value !== newPwd) {
        return '第三个和第二个必须一样'
      }
    },
  })

  //   修改密码按钮
  $('#changePwd').click(function (e) {
    e.preventDefault()

    // console.log()

    $.post('/my/updatepwd', $('#formInfo').serialize(), function (res) {
      //   console.log(res)
      // 成功
      //   密码：98989812  222222
      if (res.status === 0) {
        //   提示框
        // 重置按钮触发
        $('button[type="reset"]').click()
      } else {
        // 失败
      }
    })
  })
})

// let-> ES6 的声明变量 的语法
// node第一天讲ES6
