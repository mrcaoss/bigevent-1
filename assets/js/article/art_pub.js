$(function () {
    var state = '已发布'
    $('#caogao').click(function () {
        state = '草稿'
    })
    initEditor()
    $.get(`/my/article/cates`, function (res) {
        if (res.status === 0) {
            //模块把返回值
            var strHTML = template('cate', res)
            $('[name=cate_id]').html(strHTML)
            //调用下列渲染
            layui.form.render()
        }
    })

    //初始化图片剪裁器
    var $image = $('#image')

    //裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview',
    }

    //初始化裁剪区域
    $image.cropper(options)

    $('#chooseImage').click(function () {
        $('#file').click()
    })

    //xiaohuiquyu
    $('#file').change(function (e) {
        var fd = e.target.files[0]
        console.log(fd);
        var newImgURL = URL.createObjectURL(fd)
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })

    $('#formPub').submit(function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', state)
        fd.forEach(function (v, k) {
            console.log(k, v);
        })
    })

})