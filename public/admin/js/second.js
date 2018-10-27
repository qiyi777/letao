
$(function () {

  var page = 1
  var pageSize = 5


  function rander() {

    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var html = template('tmp', info)
        $('tbody').html(html)

        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / pageSize),
          onPageClicked: function (a, b, c, currentPage) {
            page = currentPage
            //重新渲染
            rander()
          }
        })
      }
    })
  }

  rander()

  //点击按钮弹出模态框  添加分类功能
  $('.default .btn').on('click', function () {

    $('#secondModal').modal('show')

    //发送ajax请求  获取数据  动态添加到里面
    $.ajax({

      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        var html = template('tem', info)

        $('#secondModal .dropdown-menu').html(html)

      }

    })

  })

  //
  //点击当前这个按钮  让下拉的成为当前按钮的值
  $('#secDown').on('click', 'li', function () {

    $('.classfix')
      .html($(this)
        .children()
        .text())

    //隐藏域获取当前表单的id值
    $('.categoryId').val($(this).data('id'))

    //手动设置添加一级分类时让表单值为正常有值
    $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')

  })


  //上传图片功能实现
  $("#fileupload").fileupload({
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      //获取文件的URL地址
      var src = data.result.picAddr
      //显示在下面
      $('.img img').attr('src', src)

      //让图片在下面的隐藏域的value值中显示
      $('.brandLogo').val($('.img img').attr('src'))

      ///手动设置添加一级分类时让表单值为正常有值
      $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  })


  //验证表单

  $("form").bootstrapValidator({
    excluded: [],//不校验的内容
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },//校验规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌图片"
          }
        }
      }
    }
  })


  //表单校验成功  发送ajax请求
  $("form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑

    $.ajax({
      url: '/category/addSecondCategory',
      type: 'post',
      data: $('form').serialize(),
      success: function (info) {
        // console.log(info);

        if (info.success) {
            //重新渲染页面
            rander()
            //关闭模态框
            $('#secondModal').modal('hide')

            //清空表单
            $('form')[0].reset();

            //清空插件提示
            $('form')
            .data('bootstrapValidator')
            .resetForm(true)

            //让下拉框归位
            $('.dropdown .classfix').html('请选择一级分类')

            //让图片归位
            $('.img img').attr('src','./images/none.png')

        }
      }
    })
  });



})