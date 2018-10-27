$(function () {

  var page = 1
  var pageSize = 3

  function rander() {

    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info)
        var html = template('tmp', info)

        $('tbody').html(html)

        // 准备分页插件
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, currentpage) {
            page = currentpage
            rander()
          }
        })


      }
    })
  }

  rander()


  //点击添加分类弹出模态框  
  $('.default .btn').on('click', function () {
    //弹出模态框
    $('#firstModal').modal('show')
  })


  //验证表单
  //表单校验功能
  var $form = $("form")
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryName: {

        validators: {
          notEmpty: {
            message: "请输入一级分类的名称"
          }
        }

      }
    }
  })

  //表单校验成功
  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑

    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      data: $form.serialize(),
      success: function(info){
          // console.log(info);
          page = 1
          //重新渲染页面
          rander()
          //关闭模态框
          $('#firstModal').modal('hide')
          //清空表单
          $form
          .data('bootstrapValidator')
          .resetForm(true)
      }

    })

  })


})