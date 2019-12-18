//读取表单信息
(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name]) && this.value != "") {
                    serializeObj[this.name].push(this.value);
                } else {
                    if (this.value != "") {
                        serializeObj[this.name] = [serializeObj[this.name], this.value];
                    }
                }
            } else {
                if (this.value != "") {
                    serializeObj[this.name] = this.value;
                }
            }
        });
        return serializeObj;
    };
})(jQuery);
//登录的数据传输
function login(){
    console.log("123");
    var login_data=($('#login-form').serializeJson());
    if(login_data.username==""||login_data.username=="请输入账号"){
        alert("账号不得为空!");
        return;
    }else if(login_data.password==""||login_data.password=="请输入密码"){
        alert("密码不得为空！");
        return;
    }
    $.ajax({
        type:"post",
        url: "http://127.0.0.1:5000/login/"+login_data.username+"/"+login_data.password,
        dataType:"json",
       
        contentType: "application/json;charset-UTF-8",
        success:function(result){
            alert("登录成功");
            // window.location.href="./index.html";
            console.log(result);//打印服务端返回的数据
            },
        error:function(res){
            console.log(login_data.username);
            console.log(login_data.password);
            alert("账号/密码错误，请重新登录！");
        }
    });
};
function register(){
    console.log("123");
    var login_data=($('#register-form').serializeJson());
    if(login_data.username==""||login_data.username=="请输入账号"){
        alert("账号不得为空!");
        return;
    }else if(login_data.password==""||login_data.password=="请输入密码"){
        alert("密码不得为空！");
        return;
    }
    $.ajax({
        type:"post",
        url: "http://127.0.0.1:5000/zhuce/"+login_data.username+"/"+login_data.password+"/"+login_data.email,
        dataType:"json",
       
        contentType: "application/json;charset-UTF-8",
        success:function(result){
            alert("注册成功");
            window.location.href="./login.html";
            console.log(result);//打印服务端返回的数据
            },
        error:function(res){
            console.log(login_data.username);
            console.log(login_data.password);
            alert("账号/密码错误，请重新登录！");
        }
    });
}