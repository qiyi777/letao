// import { template } from "handlebars";

$(function () {


  var currentPage = 1
  var pageSize = 5

  function rander() {
    $.ajax({

      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        var html = template('page', info)
        // console.log(html)

        $('tbody').html(html)
        // 使用分页插件
        $("#paginator").bootstrapPaginator({
          //当前页
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          // 总页数
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, page) {
            currentPage = page
            console.log(page)
            rander()

          }
        })

      }

    })
  }

  //加载页面先调用一次
  rander()

  var id = 0
  var isDelete = 0

  //点击任意按钮显示模态框
  $('tbody').on('click', '.btn', function () {
    console.log(id, isDelete)
    //显示模态框
    $("#userModal").modal("show")
    //获取id
    id = $(this).parent().data('id')
    //获取isDelete
    isDelete = $(this).hasClass('btn-success') ? 1 : 0


  })

  //点击发送ajax请求
  $(".btn_user").on('click', function () {

    $.ajax({

      url: '/user/updateUser',
      type: 'post',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (info) {

        console.log(info);

        if (info.success) {
          rander()
        }

        //关闭模态框
        $("#userModal").modal("hide")

      }

    })
  })




})