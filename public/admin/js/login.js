$(function () {


    //初始化
    $("form").bootstrapValidator({

        //配置校验规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        },
        //指定校验字段
        fields: {
            //账号校验
            username: {
                validators: {
                    //用户名为空时提示
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //表单的长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名必须在2到6之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }

                }
            },
            password: {
                validators: {
                    //密码为空时提示
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //表单的长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码必须在6到12位之间'
                    },
                    callback: {
                        message: '密码错误'
                    }

                }
            }
        }
    })

    //注册表单校验成功的事件
    $("form").on('success.form.bv', function (e) {

        //阻止默认事件
        e.preventDefault();

        //使用ajax提交逻辑
        $.ajax({
            url : '/employee/employeeLogin',
            type: 'post',
            data: $('form').serialize(),
            success: function(info){

                if(info.success){
                    location.href = "index.html"
                }

                // console.log(info);
                if(info.error === 1000){
                    // 让用户名不合法
                    $('form')
                    .data('bootstrapValidator')
                    .updateStatus('username', 'INVALID', 'callback')
                }

                if(info.error === 1001){
                    // 让password不合法
                    $('form')
                    .data('bootstrapValidator')
                    .updateStatus('password', 'INVALID', 'callback')
                }
            }
        })

    });


    //重置表单功能
    $('[type=reset]').on('click',function(){
        $('form')
        .data('bootstrapValidator')
        .resetForm(true);
    })


})