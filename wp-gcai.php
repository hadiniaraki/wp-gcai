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

// اضافه کردن شورت‌کد برای فرم تولید مقاله
function gcai_article_form() {
    ob_start();  // برای گرفتن خروجی HTML
    ?>
    <div class="form-container">
      <p><span class="required">*</span> فیلدهای ضروری</p><br>
      <form method="post" action="#" onsubmit="return validateArticleForm()">
        <?php wp_nonce_field( 'gcai_article_form', 'gcai_article_nonce' ); ?>
        <div class="input-container">
          <label for="subject"><span class="required">*</span>موضوع مقاله:</label>
          <input type="text" name="subject" id="subject" required />
        </div>
        <div class="input-container">
          <label for="article-tag-input"><span class="required">*</span>کلمات کلیدی:</label>
          <div class="tags-input" id="article-tags-input">
            <input type="text" id="article-tag-input" placeholder="کلمات کلیدی را وارد کنید" />
            <button type="button" id="article-add-tag-button">+</button>
          </div>
          <input type="hidden" name="article_keywords" id="article_keywords"/>
        </div>
        <div class="input-container">
          <label for="brand_name"><span class="required">*</span>نام برند:</label>
          <input type="text" name="brand_name" id="brand_name" required />
        </div>
        <div class="input-container">
          <label for="context"><span class="required">*</span>زمینه مقاله:</label>
          <input type="text" name="context" id="context" required />
        </div>
        <div class="input-container">
          <label for="writing_tone">لحن نوشتار:</label>
          <select name="writing_tone" id="writing_tone">
            <option value="رسمی">رسمی</option>
            <option value="محاوره">محاوره</option>
            <option value="دوستانه و خودمانی">دوستانه و خودمانی</option>
            <option value="طنز">طنز</option>
          </select>
        </div>
        <div class="input-container">
          <label for="language">زبان مقاله:</label>
          <select name="language" id="language">
            <option value="Persian">فارسی</option>
            <option value="English">انگلیسی</option>
            <option value="Arabic">عربی</option>
          </select>
        </div>
        <button type="submit" name="generate_article">تولید مقاله</button>
      </form>
    </div>
    <?php
    return ob_get_clean();  // بازگرداندن خروجی HTML
}

// اضافه کردن CSS به افزونه
function gcai_enqueue_styles() {
    wp_enqueue_style( 'gcai-style', plugin_dir_url( __FILE__ ) . 'css/styles.css' );
}
add_action( 'wp_enqueue_scripts', 'gcai_enqueue_styles' );

// اضافه کردن JS به افزونه
function gcai_enqueue_scripts() {
    wp_enqueue_script( 'gcai-scripts', plugin_dir_url( __FILE__ ) . 'js/scripts.js', array('jquery'), null, true );
}
add_action( 'wp_enqueue_scripts', 'gcai_enqueue_scripts' );


add_shortcode( 'gcai_article_form', 'gcai_article_form' );
