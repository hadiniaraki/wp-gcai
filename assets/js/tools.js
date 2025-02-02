// تابع برای نمایش تب‌ها 
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(function(tab) {
        tab.style.display = 'none';
    });

    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.style.display = 'block';
}

// تابع برای به‌روزرسانی کلاس‌های لینک‌های تب
function updateActiveLink(activeLink) {
    // حذف کلاس active از تمام لینک‌ها
    document.querySelectorAll('.show-tab-link, .ajax-tab-link').forEach(function(link) {
        link.classList.remove('active');
    });
    // اضافه کردن کلاس active به لینک فعال
    activeLink.classList.add('active');
}

// پیام هشدار خالی بودن ورودی های فرم‌ها
function validateField(field) {
    if (field.validity.valueMissing) {
        field.setCustomValidity('پر کردن این قسمت الزامی است.');
    } else {
        field.setCustomValidity('');
    }
}

// بررسی خالی نبودن فرم تگ‌ها
function validateArticleForm() {
    const articleKeywordsInput = document.getElementById('article_keywords');
    const errorMessage = document.getElementById('article-keywords-error');
    if (!articleKeywordsInput.value || articleKeywordsInput.value === '[]') {
        errorMessage.textContent = 'لطفاً حداقل یک کلمه کلیدی وارد کنید.';
        return false; // جلوگیری از ارسال فرم
    } else {
        errorMessage.textContent = '';
        return true; // اجازه ارسال فرم
    }
}

// بررسی خالی نبودن فرم تگ‌ها در اینستاگرام
function validateInstagramForm() {
    const captionKeywordsInput = document.getElementById('caption_keywords');
    const captionHashtagsInput = document.getElementById('caption_hashtags');
    const keywordsError = document.getElementById('caption-keywords-error');
    const hashtagsError = document.getElementById('caption-hashtags-error');

    let isValid = true;

    // بررسی کلمات کلیدی
    if (!captionKeywordsInput.value || captionKeywordsInput.value === '[]') {
        keywordsError.textContent = 'لطفاً حداقل یک کلمه کلیدی وارد کنید.';
        isValid = false;
    } else {
        keywordsError.textContent = '';
    }

    // بررسی هشتگ‌ها
    if (!captionHashtagsInput.value || captionHashtagsInput.value === '[]') {
        hashtagsError.textContent = 'لطفاً حداقل یک هشتگ وارد کنید.';
        isValid = false;
    } else {
        hashtagsError.textContent = '';
    }

    return isValid; // اگر هر دو فیلد معتبر بودند، فرم ارسال می‌شود
}

// بررسی خالی نبودن فرم تگ‌ها در ویدیو
function validateVideoForm() {
    const videoHiddenInput = document.getElementById("keywords_and_hashtags");
    const videoKeywordsError = document.getElementById("video-keywords-error");
    if (!videoHiddenInput.value || videoHiddenInput.value === '[]') {
        videoKeywordsError.textContent = 'لطفاً حداقل یک کلمه کلیدی وارد کنید.';
        return false; // جلوگیری از ارسال فرم
    } else {
        videoKeywordsError.textContent = '';
        return true; // اجازه ارسال فرم
    }
}

document.addEventListener("DOMContentLoaded", function () {
    function setupTagsInput(tagsInputId, hiddenInputId, tagInputId, addTagButtonId) {
        const tagsInput = document.getElementById(tagsInputId);
        const hiddenInput = document.getElementById(hiddenInputId);
        const tagInput = document.getElementById(tagInputId);
        const addTagButton = document.getElementById(addTagButtonId);

        let tags = [];

        if (tagInput) {
            tagInput.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                }
            });
        }

        if (addTagButton) {
            addTagButton.addEventListener("click", function () {
                addTag();
            });
        }

        tagsInput.addEventListener("click", function () {
            tagInput.focus();
        });

        function addTag() {
            const tag = tagInput.value.trim();
            if (tag && !tags.includes(tag)) {
                tags.push(tag);
                renderTags();
                tagInput.value = "";
            }
        }

        function renderTags() {
            // پاک کردن محتوای قبلی
            tagsInput.innerHTML = "";
            // اضافه کردن فیلد ورودی و دکمه
            tagsInput.appendChild(tagInput);
            if (addTagButton) {
                tagsInput.appendChild(addTagButton);
            }
            // اضافه کردن تگ‌ها
            tags.forEach((tag) => {
                const tagElement = document.createElement("span");
                tagElement.classList.add("tag");

                const tagText = document.createElement("span");
                tagText.textContent = tag;

                const removeBtn = document.createElement("span");
                removeBtn.classList.add("remove-tag");
                removeBtn.textContent = "×";
                removeBtn.addEventListener("click", function () {
                    removeTag(tag);
                });

                tagElement.appendChild(tagText);
                tagElement.appendChild(removeBtn);
                tagsInput.insertBefore(tagElement, tagInput);
            });

            hiddenInput.value = JSON.stringify(tags);
            tagInput.focus();
        }

        function removeTag(tag) {
            tags = tags.filter((t) => t !== tag);
            renderTags();
        }
    }

    // فراخوانی تابع برای هر فرم
    setupTagsInput("article-tags-input", "article_keywords", "article-tag-input", "article-add-tag-button");
    setupTagsInput("caption-keywords-tags-input", "caption_keywords", "caption-keywords-tag-input", "caption-keywords-add-tag-button");
    setupTagsInput("caption-hashtags-tags-input", "caption_hashtags", "caption-hashtags-tag-input", "caption-hashtags-add-tag-button");
    setupTagsInput("video-tags-input", "keywords_and_hashtags", "video-tag-input", "video-add-tag-button"); 

    // منو
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('nav-active');
    });

    // مدیریت تب‌های معمولی
    const showTabLinks = document.querySelectorAll('.show-tab-link');

    showTabLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const tabName = this.getAttribute('data-tab');
            if (tabName) {
                showTab(tabName);
                // به‌روزرسانی کلاس‌های تب‌ها
                updateActiveLink(this);
                sidebarMenu.style.maxHeight = null;
                sidebarHeader.classList.toggle('active');
            }
        });
    });

    // مدیریت تب‌های AJAX
    const ajaxTabLinks = document.querySelectorAll('.ajax-tab-link');

    ajaxTabLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const tabName = this.getAttribute('data-tab');

            // نمایش تب
            showTab(tabName);

            // به‌روزرسانی کلاس‌های تب‌ها
            updateActiveLink(this);

            sidebarMenu.style.maxHeight = null;
            sidebarHeader.classList.toggle('active');

            // بررسی اینکه آیا محتوای تب قبلاً بارگذاری شده است یا نه
            const tabContent = document.getElementById(tabName);
            if (!tabContent.getAttribute('data-loaded')) {
                // ارسال درخواست AJAX برای دریافت محتوای تب
                fetch(`/dashboard/?tab=${tabName}`, {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    // قرار دادن محتوای دریافت شده در تب
                    tabContent.innerHTML = data.html;
                    tabContent.setAttribute('data-loaded', 'true');
                    setupSearchForm();
                    setupPagination();
                })
                .catch(error => {
                    console.error('Error fetching tab content:', error);
                });
            }
        });
    });

    // نمایش تب پیش‌فرض در بارگذاری صفحه
    const defaultTab = document.querySelector('.tab-content.active');
    if (defaultTab) {
        defaultTab.style.display = 'block';
    } else {
        showTab('article-tab');
    }

    const sidebarHeader = document.querySelector('.sidebar-header');
    const sidebarMenu = document.querySelector('.sidebar-menu');

    sidebarHeader.addEventListener('click', function () {
        if (sidebarMenu.style.maxHeight) {
            // منو باز است، بستن آن
            sidebarMenu.style.maxHeight = null;
        } else {
            // منو بسته است، باز کردن آن
            sidebarMenu.style.maxHeight = sidebarMenu.scrollHeight + "px";
        }

        // تغییر کلاس 'active' روی sidebarHeader
        sidebarHeader.classList.toggle('active');
    });

    setupSearchForm();
    setupPagination();
});

// تابع مدیریت فرم جستجو
function setupSearchForm() {
    const searchForm = document.getElementById("search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const searchQuery = document.getElementById("search-input").value;

            // ارسال درخواست AJAX برای دریافت نتایج جستجو
            fetch(`/dashboard/?tab=history-tab&search_query=${searchQuery}`, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (searchQuery!='') {
                        document.getElementById("article-history-cards").innerHTML = data.article_html;
                        document.getElementById("caption-history-cards").innerHTML = data.caption_html;
                        document.getElementById("video-script-history-cards").innerHTML = data.script_html;
                    }
                    else{
                        document.getElementById("article-history-cards").innerHTML = data.html;
                        document.getElementById("caption-history-cards").innerHTML = data.html;
                        document.getElementById("video-script-history-cards").innerHTML = data.html;
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        });
    }
}

// تابع مدیریت صفحه‌بندی
function setupPagination() {
    const paginationLinks = document.querySelectorAll(".pagination-link");

    paginationLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const page = this.getAttribute("data-page");

            // ارسال درخواست AJAX برای دریافت نتایج صفحه‌بندی
            fetch(`/dashboard/?tab=history-tab&page=${page}`, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (page) {
                    document.getElementById("article-history-cards").innerHTML = data.article_html;
                    document.getElementById("caption-history-cards").innerHTML = data.caption_html;
                    document.getElementById("video-script-history-cards").innerHTML = data.script_html;
                }
                else{
                    document.getElementById("article-history-cards").innerHTML = data.html;
                    document.getElementById("caption-history-cards").innerHTML = data.html;
                    document.getElementById("video-script-history-cards").innerHTML = data.html;
                }

                // راه‌اندازی دوباره pagination پس از بارگذاری نتایج جدید
                setupPagination();
            })
            .catch(error => {
                console.error('Error fetching pagination results:', error);
            });
        });
    });
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// کنترل تب‌های تاریخچه
function openTab(evt, tabName) {
    // تمامی تب‌ها را مخفی کن
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("history-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // تمامی لینک‌های تب را غیرفعال کن
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // تب فعال را نمایش بده و لینک آن را فعال کن
    document.getElementById(tabName).style.display = "grid";
    evt.currentTarget.classList.add("active");
}

