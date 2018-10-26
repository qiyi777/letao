
$(function(){
    
    //请求ajax数据刷新
    $(document).ajaxStart(function(){
        
        NProgress.start()
    })

    $(document).ajaxStop(function(){
        NProgress.done()
    })


    //开启和关闭分类管理
    $('.list').on('click',function(){
        $('.child').slideToggle()
    })


    //点击头部左侧按钮让左侧导航缩进
    $('.justify').on('click',function(){
        //添加和移除now类
        $('body').toggleClass('now')
        $('.lt_left').toggleClass('now')
    })



    //模态框
    $('#myModal').on('click',function(){
        $('#logoutModal').modal('show')
    })


    //调用ajax退出登录
    $('.btn_logout').on('click',function(){

        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success:function(info){
                // console.log(info)
                if(info.success){
                    location.href = 'login.html'
                }
            }
        })
    })
    


})


