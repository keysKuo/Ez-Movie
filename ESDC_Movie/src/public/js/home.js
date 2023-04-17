$('#btn-register').click(function() {
    let fullname = $('#fullname').val();
    let phone = $('#phone').val();
    let gender = $(':radio:checked').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let password2 = $('#password2').val();

    if(!fullname || !email || !phone || !gender || !password || !password2) {
        alert('Vui lòng nhập đầy đủ thông tin')
        return;
    }

    if(password != password2) {
        alert('Mật khẩu không trùng khớp');
        return
    }

    $.ajax({
        url: '/register',
        method: 'POST',
        data: { fullname, phone, email, password, password2, gender },
        success: function(result) {
            if(result.success) {
                alert('Tạo tài khoản thành công');
            }
            
        },
        error: function(err) {
            if(err.status == 500) {
                alert('Tài khoản đã tồn tại')
            }
        }
    })
})