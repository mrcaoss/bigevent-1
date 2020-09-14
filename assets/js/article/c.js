$(function () {
    //更新视图
    initTable()
    function initTable() {
        $.get('/my/article/cates', function (res) {
            if (res.status === 0) {
                console.log(res.data);
                //template模板    模板ID        res返回的值
                var strHtml = template('tpl-table', res)
                $('tbody').html(strHtml)
            }
        })
    }

    var addIndex = 0
    var editIndex = 0

    // 添加分类
    $('#addBtn').on('click', function (e) {
        e.preventDefault()
        var strAddHtml = $('#tpl-add').html()
        addIndex = layui.layui.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: strAddHtml,
        })
    })
    //添加
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault()
        var formdata = $(this).serialize()
        $.post('/my/article/addcates', formdata, function (res) {
            if (res.status === 0) {
                console.log(res.message);
                // 关闭弹出层
                layui.layer.close(addIndex)
                //更新视图
                initTable()
            }
        })
    })
    // 编辑
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault()
        var strEditHtml = $('#tpl-edit').html()
        editIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: strEditHtml,
        })
        var Id = $(this).attr('data-id')
        $.get(`/my/article/cates/${Id}`, function (res) {
            if (res.status === 0) {
                console.log(res.data);
                layui.form.val('editForm', res.data)
            }
        })
    })
    //修改确定
    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault()
        var formdata = $(this).serialize()
        $.post(`/my/article/updatacate`, formdata, function (res) {
            if (res.status === 0) {
                layui.layer.close(editIndex)
                initTable()
            }
        })
    })

    //删除分类
    $('tbody').on('click', '.btn.delete', function (e) {
        e.preventDefault()
        var Id = $(this).attr('data-is')
        layer.confirm('sure 吗', { icon: 3, title: 'really?' }, function (index) {
            $.get(`/my/article/deletecate/${Id}`, function (res) {
                if (res.status === 0) {
                    layer.close(index)
                    initTable()
                }
            })
        })
    })
})