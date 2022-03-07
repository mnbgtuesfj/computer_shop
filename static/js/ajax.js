function member_login() {
    $.ajax({
        url: "/login",
        /*資料提交到login處*/
        type: "PATCH",
        /*用POST方法*/
        dataType: "json",
        data: {
            "登入帳號": $("#loginAcc").val(),
            "登入密碼": $("#loginPwd").val(),
        },
        /*提交的資料（json格式），從輸入框中獲取*/
        /*result為後端函式回傳的json*/
        success: function(result) {
            if (result.message == "登入成功") {
                alert(result.message);
                window.location.href = '/';
            } else {
                alert(result.message)
            }
        }
    });
}

function member_register() {
    //判斷空值
    if ($("#register_email").val() == "") alert("Email 不可以空白");
    if ($("#register_password").val() == "") alert("密碼 不可以空白");
    if ($("#register_password_again").val() == "") alert("再次輸入密碼 不可以空白");
    if ($("#register_name").val() == "") alert("姓名 不可以空白");
    if ($("#register_phone").val() == "") alert("手機號碼 不可以空白");
    if ($("#register_address").val() == "") alert("地址 不可以空白");

    $.ajax({
        url: "login",
        /*資料提交到login處*/
        type: "POST",
        /*採用POST方法提交*/
        dataType: "json",
        data: {
            "Email": $("#register_email").val(),
            "密碼": $("#register_password").val(),
            "姓名": $("#register_name").val(),
            "手機號碼": $("#register_phone").val(),
            "地址": $("#register_address").val()
        },
        /*提交的資料（json格式），從輸入框中獲取*/
        success: function(jsObj) {
            if (jsObj.message == "註冊成功") {
                alert(jsObj.message);
                window.location.href = '/login';
            } else {
                alert("註冊失敗");
            }
        }
    });

}