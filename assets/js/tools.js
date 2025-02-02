document.addEventListener("DOMContentLoaded", function () {
    // گرفتن توکن احراز هویت از localStorage یا sessionStorage
    const token = localStorage.getItem("auth_token");  // یا sessionStorage
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;  // گرفتن csrf token از صفحه HTML

    // فرم مقاله
    const articleForm = document.getElementById("article-form");
    if (articleForm) {
        articleForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // گرفتن داده‌ها از فرم
            const formData = new FormData(articleForm);
            const data = {
                username: "admin",  // نام کاربری باید از حالت لاگین شده دریافت شود
                tool_type: "article",  // نوع ابزار مقاله
                input_data: {
                    subject: formData.get("subject"),
                    keywords: JSON.parse(formData.get("keywords")), // کلمات کلیدی را از JSON پارس می‌کنیم
                    brand_name: formData.get("brand_name"),
                    context_text: formData.get("context_text"),
                    writing_tone: formData.get("writing_tone"),
                    language: formData.get("language")
                }
            };

            // ارسال درخواست به سرور
            fetch('/api/tools/content-generation/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,  // استفاده از توکن در هدر
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data)  // تبدیل داده‌ها به فرمت JSON
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                // پردازش پاسخ
                if (data.success) {
                    alert("محتوا با موفقیت تولید شد!");
                } else {
                    alert("خطا در تولید محتوا: " + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("خطا در ارسال درخواست.");
            });
        });
    }
});
