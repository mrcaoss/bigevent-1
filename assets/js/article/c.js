$(function () {
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

    // 分类按钮
    $('#addBtn').on('click', function (e) {
        e.preventDefault()
        var strAddHtml = $('#tpl-add').html()
        addIndex = $('#tpl-add').html()

    })
})