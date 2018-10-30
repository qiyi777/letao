
$(function () {

  //让当前页的表单框获取当前的value值
  var test = getSearch()

  // 如果是字符串需要把字符串转为数值不然获取不到数据
  test = (typeof test['key']) !== 'number' ? test['key'] : test['key'] - 0

  $('.search input').val(test)

  function rander() {

    //定义参数
    var parom = {
      proName: test,
      page: 1,
      pageSize: 100
    }

    var $active = $('.nav li.active')

    if ($active.length === 1) {
      //说明到了当前这个Li
      //找到当前这个Li的datatype值
      var type = $active.data('type')
      //确定传1还是传2
      var num = $active.find('.fa').hasClass('fa-angle-down') ? 2 : 1
      //把参数传递给要发送的data参数
      parom[type] = num

    }

    //发送ajax请求
    $.ajax({
      url: '/product/queryProduct',
      type: 'get',
      data: parom,
      success: function (info) {
        console.log(info.data);
        //渲染数据
        $('.product').html(template('tmp', info))
      }
    })
  }

  rander()

  //点击搜索 获取数据
  $('.search button').on('click', function () {
    //获取当前表单的值
    var val = $('.search input').val().trim()
    // console.log(val);
    //判断是否有值
    if (!val) {
      mui.toast('请输入要搜索的关键字')
      return
    }

    //搜索成功  直接发生跳转到当前页  把数据拼接到最后
    location.href = 'http://localhost:3000/m/searchList.html?key=' + val

  })


  //点击按钮让当前类变颜色
  $('.nav li[data-type]').on('click', function () {

    var $this = $(this)
    //判断当前元素有没有这个active类
    if ($this.hasClass('active')) {
      //有这个类就给子元素切换类
      $this.find('.fa').toggleClass('fa-angle-down')
      $this.find('.fa').toggleClass('fa-angle-up')

    } else {

      //如果当前没有这个类就添加
      $this.addClass('active').siblings().removeClass('active')
      
      //并且让所有子箭头往下
      $('.nav .fa').addClass('fa-angle-down').removeClass('fa-angle-up')
    }


    //重新渲染页面
    rander()
  })



})