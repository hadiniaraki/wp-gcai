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
    <?php
}
