
  //区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false,
  })

  //把拼接数据的字符串转为对象
  function getSearch() {

    //获取当前URL地址
    var test = location.search
    // ?key=阿迪&name=zs&age=18
    //对地址中的中文进行解码
    test = decodeURI(test)
    // 去除？
    str = test.slice(1)
    //转为数组
    var arr = str.split('&')

    var obj = {}

    // /对数组遍历
    for (var i = 0; i < arr.length; i++) {
      //切割每一个键
      var key = arr[i].split('=')[0]
      //切割每一个值
      var value = arr[i].split('=')[1]

      //添加到对象中
      obj[key] = value

    }

    //返回这个对象
    return obj

  }

  // console.log(getSearch());

