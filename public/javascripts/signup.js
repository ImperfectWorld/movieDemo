$(function() {
    $("input[type='submit']").click(function(ev) {
        if( $(".confirm-password").val() !== $("#password").val() ) {
            alert("你两次输入的密码不同")
            ev.preventDefault();
        }
        if($("#password").val()===""){
            alert("密码不能为空")
            ev.preventDefault();
        }
    })
})