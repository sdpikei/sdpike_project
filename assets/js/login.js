(function () {
    // 登录注册切换模块
    $('.btn').on('click', function () {
        // console.log(!$(this).parent().parent().hasClass('.action'));
        if (!$(this).parent().parent().hasClass('.action')) {
            $(this).parent().parent().hide().siblings().show()

        }

    })
    // 密码显示隐藏模块
    $('.psw').on('click', function () {

        // console.log($(this).removeClass('layui-icon-rate').addClass('layui-icon-rate-solid'));
        if ($(this).siblings('input').attr('type') == 'password') {
            $(this).removeClass('layui-icon-rate').addClass('layui-icon-rate-solid').siblings('input').attr('type', 'text')

        }
        else if ($(this).siblings('input').attr('type') == 'text') {
            $(this).removeClass('layui-icon-rate-solid').addClass('layui-icon-rate').siblings('input').attr('type', 'password')
        }
    })
    // 正则验证模块
    layui.use('form', function () {
        var form = layui.form;

        //各种基于事件的操作，下面会有进一步介绍
        form.verify({
            username: function (value, item) { //value：表单的值、item：表单的DOM对象
                if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '用户名不能有特殊字符';
                }
                if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '用户名首尾不能出现下划线\'_\'';
                }
                if (/^\d+\d+\d$/.test(value)) {
                    return '用户名不能全为数字';
                }

                //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
                if (value === 'xxx') {
                    alert('用户名不能为敏感词');
                    return true;
                }
            },
            repass: function (value) {
                if (value != $('.creat [name=password]').val()) {
                    return '两次输入密码不同！'
                }
            }


            // repwd: function (value) {
            //     // 通过形参拿到的是确认密码框中的内容
            //     // 还需要拿到密码框中的内容
            //     // 然后进行一次等于的判断
            //     // 如果判断失败,则return一个提示消息即可
            //     var pwd = $('.reg-box [name=password]').val()
            //     if (pwd !== value) {
            //         return '两次密码不一致！'
            //     }
            // }

            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            , pass: [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ]
        });
    });
    // 正则提示
    $('.creat [name=username]').on('blur', function () {
        let value = $(this).val()
        let span = $(this).siblings('span')
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return span.text('用户名不能有特殊字符!');
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return span.text('用户名首尾不能出现下划线\'_\'');
        }
        if (/^\d+\d+\d$/.test(value)) {
            return span.text('用户名不能全为数字');
        }
        span.text("")
    })
    $('.creat [name=password]').on('blur', function () {
        let value = $(this).val()
        let span = $(this).siblings('span')
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return span.text('密码不能有特殊字符!');
        }

        if (value != $('.creat [name=repassword]').val()) {
            return span.text('两次输入密码不同！')
        }
        if (value = $('.creat [name=repassword]').val()) {
            $('.creat [name=repassword]').siblings('span').text('')
        }
        span.text("")
    })
    $('.creat [name=repassword]').on('blur', function () {
        let value = $(this).val()
        let span = $(this).siblings('span')
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return span.text('密码不能有特殊字符!');
        }

        if (value != $('.creat [name=password]').val()) {
            return span.text('两次输入密码不同！')
        }
        if (value = $('.creat [name=password]').val()) {
            $('.creat [name=password]').siblings('span').text('')
        }

        span.text("")
    })


})();

(function () {
    // 注册提交至服务器
    $('.creat [name=creatAccont]').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 打包数据
        let data = {
            username: $('.creat [name=username]').val(),
            password: $('.creat [name=password]').val()
        }
        // ajaxpost传送至服务器
        $.post('/api/reguser', data, function (res) {
            console.log(res);
            let layer = layui.layer
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 成功后进行弹框

            layer.msg(res.message)

            // 触发登录点击事件
            $('.btn').click()

        })
    })

    // 登录信息提交至服务器
    $('.login [name=loginAccont]').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 打包数据
        let data = {
            username: $('.login [name=username]').val(),
            password: $('.login [name=password]').val()
        }
        // post发送

        $.post('http://www.liulongbin.top:3008/api/login', data, function (res) {
            if (res.code !== 0) {
                console.log(res);
                return layer.msg(res.message)
            }
            layer.msg(res.message)

            console.log(res);
            // 将token访问权限的数据储存至localstorage 本地储存
            localStorage.setItem('token', res.token)

            // 跳转至index
            window.location.href = "http://127.0.0.1:5500/%E5%A4%A7%E4%BA%8B%E4%BB%B6%E9%A1%B9%E7%9B%AE/index.html"
        })
    })
})();