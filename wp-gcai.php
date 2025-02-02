<?php
/**
 * Plugin Name: wp-gcai
 * Plugin URI: https://wp.gcai.ir
  * Description: gcai is a WordPress plugin that leverages artificial intelligence to help users generate text content. By integrating OpenAI APIs, this plugin simplifies and streamlines the content creation process. With gcai, users can quickly generate articles and product descriptions by filling out simple forms on the website.
 * Version: 1.0.0
 * Author: Hadi Jafari Niaraki
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: gcai
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */

if (!defined('ABSPATH')) {
    exit; // جلوگیری از دسترسی مستقیم
}

// تعریف مسیر افزونه
define('GCAI_PLUGIN_DIR', plugin_dir_path(__FILE__));

// فایل‌های اصلی را بارگذاری کنید
require_once GCAI_PLUGIN_DIR . 'includes/api.php';
require_once GCAI_PLUGIN_DIR . 'includes/settings.php';

// فعال‌سازی و غیرفعال‌سازی افزونه
function gcai_activate() {
    // عملیات لازم هنگام فعال‌سازی
}
register_activation_hook(__FILE__, 'gcai_activate');

function gcai_deactivate() {
    // عملیات لازم هنگام غیرفعال‌سازی
}
register_deactivation_hook(__FILE__, 'gcai_deactivate');

