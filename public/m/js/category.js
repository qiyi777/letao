
; (function () {

  //发送ajax请求渲染一级分类
  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    success: function (info) {
      console.log(info);
      // /渲染模板
      $('.content_nav ul').html(template('tmp01', info))

    }
  })

  var id = 0

  //发送ajax请求 渲染二级分类
  $('.content_nav ul').on('click', 'li', function () {

    //获取当前元素的ID值
    id = $(this).data('id')

    //点击时让类跟着
    $(this).addClass('active').siblings().removeClass('active')
    console.log(id);

    rander(id)


  })


  //封装函数
  function rander(currentId) {

    $.ajax({
      url: '/category/querySecondCategory',
      type: 'get',
      data: {
        id: currentId
      },
      success: function (info) {
        // console.log(info);
        //渲染
        $('.content ul').html(template('tmp02', info))

        //判断  当rows为空的时候  说明这个页面目前无数据
        //这时需要给一个提示
        if(info.rows.length === 0){

          $('.content ul').html('<div class="category_tips">该分类下没有更多的品牌信息</div>')

        }
      }
    })
  }
  //刚进来调用一次
  rander(id)

}())