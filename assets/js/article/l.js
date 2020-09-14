$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    template.defaults.imports.formatDate = function (olddate) {
        var timenew = moment(olddate).format('MMMM Do YYYY, h:mm:ss a')
        return timenew
    }
    initList()
    function initList() {
        $.get(`/my/article/list`, q, function (res) {
            if (res.status === 0) {
                console.log(res);
                var strHtml = template('tpl-table', res)
                $('tbody').html(strHtml)
            }
        })
    }
})