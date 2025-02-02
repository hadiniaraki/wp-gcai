<?php
// جلوگیری از دسترسی مستقیم به فایل
if (!defined('ABSPATH')) {
    exit;
}

// افزودن آیتم منو در پیشخوان وردپرس
function gcai_add_admin_menu() {
    add_menu_page(
        __('GCAI Settings', 'gcai'), // عنوان صفحه
        __('GCAI', 'gcai'), // عنوان منو
        'manage_options', // سطح دسترسی
        'gcai_settings', // slug صفحه
        'gcai_settings_page', // تابع نمایش صفحه
        'dashicons-admin-generic', // آیکون منو
        90 // اولویت نمایش در منو
    );
}
add_action('admin_menu', 'gcai_add_admin_menu');

// تابع نمایش صفحه تنظیمات
function gcai_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php _e('GCAI Plugin Settings', 'gcai'); ?></h1>
        <p><?php _e('Here you can configure API settings.', 'gcai'); ?></p>
    </div>

    <div class="wrap">
        <h1>تنظیمات افزونه</h1>

        <!-- فرم ثبت‌نام -->
        <h2>فرم ثبت‌نام</h2>
        <form id="signup-form">
            <label for="signup-username">نام کاربری:</label>
            <input type="text" id="signup-username" name="username" required />
            <br />
            <label for="signup-password">رمز عبور:</label>
            <input type="password" id="signup-password" name="password" required />
            <br />
            <button type="submit">ثبت‌نام</button>
        </form>

        <!-- فرم ورود -->
        <h2>فرم ورود</h2>
        <form id="login-form">
            <label for="login-username">نام کاربری:</label>
            <input type="text" id="login-username" name="username" required />
            <br />
            <label for="login-password">رمز عبور:</label>
            <input type="password" id="login-password" name="password" required />
            <br />
            <button type="submit">ورود</button>
        </form>
        
    </div>

    <script>
        document.getElementById("signup-form").addEventListener("submit", function(event) {
            event.preventDefault();
            const username = document.getElementById("signup-username").value;
            const password = document.getElementById("signup-password").value;
            fetch('https://wp.gcai.ir/api/users/auth/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": username, "password": password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    alert("ثبت‌نام موفقیت‌آمیز بود!");
                    localStorage.setItem("auth_token", data.token);
                    window.location.href = '/dashboard';
                } else {
                    alert("ثبت‌نام ناموفق. لطفاً دوباره تلاش کنید.");
                }
            })
            .catch(error => {
                console.error("Error during signup:", error);
                alert("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
            });
        });
    </script>
    <?php
}
