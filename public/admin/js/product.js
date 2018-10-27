
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
          itemTexts: function (type, page) {
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


  //点击按钮  弹出模态框  并且请求数据渲染到页面
  $('.default .btn').on('click', function () {

    //弹出模态框
    $('#secondModal').modal('show')

    //使用ajax获取数据 添加到UL下的LI
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        console.log(info);
        // 一个一个添加到Lizhong
        $('#secDown').html(template('tem', info))


      }
    })


  })



  //获取当前产品名称  存到表单中
  $('#secDown').on('click', 'li', function () {

    var val = $(this).children().text()
    //把当前的text值添加到span上
    $('.classfix').html(val)

    $('#brandId').val($(this).data('id'))

    //当选了的时候让表单校验手动成功
    $('form')
      .data('bootstrapValidator')
      .updateStatus('brandId', 'VALID')

  })


  //验证表单
  $('form').bootstrapValidator({
    //默认验证所有
    excluded: [],
    //验证的
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      //验证产品分类
      brandId: {
        validators: {

          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      //验证产品分类
      proName: {
        validators: {

          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      //验证商品描述
      proDesc: {
        validators: {

          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      //验证商品库存
      num: {
        validators: {

          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d{0,3}$/,
            message: '请输入正确的商品库存(1-9999之间)'
          }
        }
      },
      //商品尺码校验
      size: {
        validators: {

          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^[3-4][2-9]-[3-4][2-6]$/,
            message: '请输入正确的商品尺码(32-46之间)'
          }
        }
      },
      oldPrice: {
        validators: {

          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {

          notEmpty: {
            message: '请输入商品价格'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
    }
  })

  //定义数组  把图片存储在数组中
  var imgs = []

  //上传图片  获取图片上传地址
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      //当数组的长度大于等于三  说明超过3张 直接返回
      if (imgs.length >= 3) {
        return false
      }

      console.log(data.result);
      //把图片存储在数组中
      imgs.push(data.result)
      // console.log(data);

      //把图片显示在页面中
      $('<img width="100" src="' + data.result.picAddr + '" alt="">').appendTo('.img')

      //验证是不是三张图片  不是的话手动校验失败
      if (imgs.length === 3) {
        $('form')
          .data('bootstrapValidator')
          .updateStatus('brandLogo', 'VALID')
      } else {
        $('form')
          .data('bootstrapValidator')
          .updateStatus('brandLogo', 'INVALID')
      }

    }

  })


  // //提交表单  校验文件
  $('form').on('success.form.bv', function (e) {

    //注册表单校验成功事件
    e.preventDefault()

    // &picName2="2.jpg"&picAddr2="images/2.jpg"
    // &picName3="3.jpg"&picAddr3="images/3.jpg"
    //准备数据
    var prompt = $('form').serialize()

    //图片地址
    prompt += '&picName1=' + imgs[0].picName + '&picAddr1=' + imgs[0].picAddr
    prompt += '&picName2=' + imgs[1].picName + '&picAddr2=' + imgs[1].picAddr
    prompt += '&picName3=' + imgs[2].picName + '&picAddr3=' + imgs[2].picAddr
    console.log(prompt)

    //发送ajax 请求
    $.ajax({

      url: '/product/addProduct',
      type: 'post',
      data: prompt,
      success: function (info) {
          // console.log(info);
          
          if(info.success){

            page = 1
            //重新渲染页面
            rander() 
            
            //关闭模态框
            $('#secondModal').modal('hide')

            //清空表单
            $('form')[0].reset()

            //清空验证表单提示
            $('form')
            .data('bootstrapValidator')
            .resetForm(true)

            //清空数组
            imgs = []

            //清空元素
            $('.img img').remove()

            //让按钮值修改为请选择二级分类
            $('.classfix').html('请选择二级分类')

          }

          //

      }

    })


  })



})