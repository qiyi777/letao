
$(function () {

  var page = 1
  var pageSize = 2


  function rander() {

    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var html = template('tmp', info)

        $('tbody').html(html)

        //分页插件
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, currentPage) {
            page = currentPage
            //重新渲染
            rander()
          },
          //设置按钮的文字
          itemTexts:function(type,page){
            switch (type) {
              case 'first':
                return '首页'
              case 'prev':
                return '上一页'
              case 'page':
                return page
              case 'next':
                return '下一页'
              case 'last':
                return '尾页'
            }
          },
          //鼠标悬浮  提示消息
          tooltipTitles: function (type, page) {
            switch (type) {
              case 'first':
                return '首页'
              case 'prev':
                return '上一页'
              case 'page':
                return page
              case 'next':
                return '下一页'
              case 'last':
                return '尾页'
            }
          },
          //设置成移入小黑色的悬浮提示消息
          useBootstrapTooltip: true
        })

      }
    })
  }

  //列表渲染
  rander()


})