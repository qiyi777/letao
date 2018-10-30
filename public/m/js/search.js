
$(function () {


  //历史记录使用的是localstorage
  var arr = []
  //封装渲染数据
  function rander() {

    //获取历史记录数据
    var history = localStorage.getItem('lt_search_history') 

    //判断  当获取的history为空数组 就无需再用json方法转为数组了 
    //因为localstorage里面没有数据这时直接返回就可以了
    // console.log(history);
    if (!history) {
      return
    }
    //把获取到的数据转为数组
    arr = JSON.parse(history) || []

    getArr()

  }

  function getArr() {
    // console.log(arr);

    //给盒子动态渲染数据
    $('.lt_history').html(template('tmp', { item: arr }))

    //返回这个数组数据
    return arr

  }


  //给span注册点击事件  点击span删除对应的数据  并保存回localstorage
  //使用事件委托
  $('.lt_history').on('click', '.btn_delete', function () {

    mui.toast('已清除此条数据')
    //获取当前父元素的下标
    var index = $(this).parent().data('idx')

    //通过下标删除对应数据
    arr.splice(index, 1)
    // console.log(arr)
    //把数组转为json数据 
    var history = JSON.stringify(arr)
    //存储回localstorage中
    localStorage.setItem('lt_search_history', history)

    //重新渲染页面
    rander()

  })

  //当打开页面时就需要渲染一次数据
  rander()


  //点击清空记录  让所有数据清空
  $('.lt_history').on('click', '.btn_empty', function () {

    mui.confirm('确定清除所有历史记录吗？','提示',['取消','确定'],function(e){
      // console.log(e);
      if(e.index === 1){

        //使用localstorage的remove方法 直接清空所有的lt_search_history数据
        localStorage.removeItem('lt_search_history')
    
        // 重新渲染页面
        rander()
      }
    })


  })

  //点击搜索按钮 获取里面的value值
  $('.search .btn').on('click', function () {
    // /获取value值
    var val = $('.search input').val().trim()

    //判断是不是空值 如果是 给提示
    if(!val){
      mui.toast('请输入关键字')
      return
    }

    //获取当前的URL地址
    var test = window.location.search
    // console.log(test);

    //把value值中的数据存放到当前数组中放在第一个
    //获取所有缓存的数据
    var arr = getArr()
    //判断当前数组中有没有val这个数据
    var idx = arr.indexOf(val)
    
    //说明里面有这个值
    if( idx !== -1 ){
      arr.splice(idx,1)
    }

    // console.log(arr);
    //最多放10个值
    if(arr.length >= 10){
      //当大于等于10  删除最后一条数据
      arr.pop()
    }

    //把历史记录添加在最前面
    arr.unshift(val)
    
    // 把修改后的数据存回本地存储中
    localStorage.setItem('lt_search_history',JSON.stringify(arr))

    //重新渲染数据
    rander()
    
    //拼接数据 并跳转
    location.href = 'searchList.html?key=' + val

  })

})