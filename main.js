// ============================
// تهيئة عامة
// ============================

// تهيئة Lightbox
if (typeof lightbox !== 'undefined') {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'صورة %1 من %2',
        'fadeDuration': 300
    });
}

// ============================
// بيانات الإحصائيات
// ============================

const statisticsData = {
    tourists: 1030,
    hotels: 377,
    revenue: 3.2,
    companies: 2432,
    rooms: 18366,
    chalets: 7236,
    villages: 132,
    guests: 696469
};

// ============================
// بيانات معرض الصور (جميع الصور)
// ============================

const galleryImages = [
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/1.tif',
        title: 'صورة معبرة',
        category: 'general',
        description: 'صورة من معرض المركز'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/3.jpg',
        title: 'منظر طبيعي',
        category: 'nature',
        description: 'جمال الطبيعة الليبية'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/4.jpg',
        title: 'منظر صحراوي',
        category: 'nature',
        description: 'جمال الصحراء الليبية'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/7.jpg',
        title: 'معلم تاريخي',
        category: 'heritage',
        description: 'معلم يعكس التاريخ الليبي'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/8.jpg',
        title: 'عمارة تقليدية',
        category: 'heritage',
        description: 'عمارة تعبر عن التراث'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/13.jpg',
        title: 'مدينة قديمة',
        category: 'cities',
        description: 'جزء من مدينة ليبية قديمة'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/15.jpg',
        title: 'سوق تقليدي',
        category: 'heritage',
        description: 'سوق يعكس الحياة التقليدية'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/16.jpg',
        title: 'منطقة أثرية',
        category: 'archaeology',
        description: 'منطقة تحتوي على آثار مهمة'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/19.jpg',
        title: 'متحف',
        category: 'heritage',
        description: 'متحف يعرض التراث الليبي'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/20.jpg',
        title: 'ميناء',
        category: 'cities',
        description: 'ميناء على البحر المتوسط'
    },
    { 
        url: 'https://raw.githubusercontent.com/tidclibya/tidc.com.ly/images/22.jpg',
        title: 'واحة',
        category: 'nature',
        description: 'واحة في الصحراء الليبية'
    }
];

// ============================
// دوال العدادات المتحركة
// ============================

function animateCounters() {
    $('.stat-number').each(function() {
        const $this = $(this);
        let value = 0;
        
        switch($this.attr('id')) {
            case 'statTourists': value = statisticsData.tourists; break;
            case 'statHotels': value = statisticsData.hotels; break;
            case 'statRevenue': value = statisticsData.revenue; break;
            case 'statCompanies': value = statisticsData.companies; break;
            case 'statRooms': value = statisticsData.rooms; break;
            case 'statChalets': value = statisticsData.chalets; break;
            case 'statVillages': value = statisticsData.villages; break;
            case 'statGuests': value = statisticsData.guests; break;
        }
        
        $this.prop('Counter', 0).animate({
            Counter: value
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                if ($this.attr('id') === 'statRevenue') {
                    $this.text(now.toFixed(1));
                } else if ($this.attr('id') === 'statGuests') {
                    $this.text(Math.ceil(now).toLocaleString('en-US'));
                } else {
                    $this.text(Math.ceil(now));
                }
            }
        });
    });
}

// ============================
// دوال معرض الصور
// ============================

function loadMiniGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-6 mb-4 gallery-item';
        col.setAttribute('data-category', image.category);
        
        col.innerHTML = `
            <a href="${image.url}" data-lightbox="gallery" 
               data-title="${image.title} - ${image.description}">
                <img src="${image.url}" alt="${image.title}" 
                     class="img-fluid" 
                     style="height: 180px; object-fit: cover;"
                     loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </a>
        `;
        
        galleryContainer.appendChild(col);
    });
}

function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // إضافة النشط للزر الحالي
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // تصفية العناصر
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================
// المساعد الافتراضي
// ============================

function toggleAIChat() {
    const chatWindow = document.getElementById('aiChatWindow');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'block';
    } else {
        chatWindow.style.display = 'none';
    }
}

function closeAIChat() {
    document.getElementById('aiChatWindow').style.display = 'none';
}

function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // إضافة رسالة المستخدم
    const chatBody = document.getElementById('aiChatBody');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<strong>أنت:</strong> ${message}`;
    chatBody.appendChild(userMessage);
    
    // مسح حقل الإدخال
    input.value = '';
    
    // إعداد ردود الذكاء الاصطناعي
    const responses = {
        'مرحبا': 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟',
        'السلام عليكم': 'وعليكم السلام ورحمة الله وبركاته. أهلاً بك في مركز المعلومات السياحي.',
        'احصائيات': `أحدث الإحصائيات:<br>
                     - السياح الوافدين: ${statisticsData.tourists} ألف<br>
                     - الفنادق: ${statisticsData.hotels} فندق<br>
                     - الإيرادات: ${statisticsData.revenue} مليار د.ل<br>
                     للتفاصيل، زر <a href="dashboard.html" target="_blank">لوحة التحكم</a>.`,
        'فنادق': `معلومات الفنادق:<br>
                 - عدد الفنادق: ${statisticsData.hotels}<br>
                 - عدد الغرف: ${statisticsData.rooms}<br>
                 - عدد القرى السياحية: ${statisticsData.villages}<br>
                 - عدد الشاليهات: ${statisticsData.chalets}`,
        'صور': 'يمكنك زيارة معرض الصور لمشاهدة الصور السياحية من ليبيا. لدينا 44 صورة متنوعة.',
        'اثار': 'يوجد في ليبيا العديد من المواقع الأثرية مثل لبتيس ماجنا، صبراتة، وغيرها. يمكنك رؤية بعضها في معرض الصور.',
        'خدمات': 'الخدمات المتاحة:<br>1. الدراسات السياحية<br>2. الخدمات الإلكترونية<br>3. المكتبة الإلكترونية<br>4. التحليلات البيانية<br>5. معرض الصور',
        'مساعد': 'أنا المساعد الافتراضي لمركز المعلومات السياحي. يمكنني الإجابة على أسئلتك حول السياحة في ليبيا.'
    };
    
    // البحث عن رد مناسب
    let response = 'شكراً لسؤالك. يمكنني مساعدتك في معلومات عن:<br>1. الإحصائيات السياحية<br>2. الفنادق والمنشآت<br>3. المواقع الأثرية<br>4. خدمات المركز<br>يرجى توضيح سؤالك أكثر.';
    
    for (const [key, value] of Object.entries(responses)) {
        if (message.toLowerCase().includes(key.toLowerCase())) {
            response = value;
            break;
        }
    }
    
    // محاكاة وقت المعالجة
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `<strong>المساعد:</strong> ${response}`;
        chatBody.appendChild(aiMessage);
        
        // التمرير لأسفل
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// ============================
// دوال مساعدة
// ============================

function updateCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initNavbarScroll() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-lg');
        } else {
            $('.navbar').removeClass('shadow-lg');
        }
    });
}

// ============================
// التهيئة عند تحميل الصفحة
// ============================

$(document).ready(function() {
    console.log('جاري تهيئة صفحة المركز السياحي...');
    
    // 1. تحديث السنة
    updateCurrentYear();
    
    // 2. بدء العدادات المتحركة
    setTimeout(animateCounters, 500);
    
    // 3. تحميل معرض الصور
    setTimeout(loadMiniGallery, 1000);
    
    // 4. تهيئة فلاتر المعرض
    setTimeout(initGalleryFilters, 1500);
    
    // 5. تهيئة التمرير السلس
    initSmoothScroll();
    
    // 6. تهيئة شريط التنقل
    initNavbarScroll();
    
    // 7. تمكين إرسال الرسالة بالضغط على Enter
    $('#aiChatInput').keypress(function(e) {
        if (e.which === 13) {
            sendAIMessage();
        }
    });
    
    // 8. إغلاق نافذة الدردشة عند النقر خارجها
    $(document).click(function(event) {
        const aiChat = $('#aiChatWindow');
        const aiButton = $('.ai-assistant');
        if (!aiChat.is(event.target) && aiChat.has(event.target).length === 0 && 
            !aiButton.is(event.target) && aiButton.has(event.target).length === 0) {
            aiChat.hide();
        }
    });
    
    console.log('تم تحميل الصفحة الرئيسية بنجاح!');
});

// ============================
// تحديث الإحصائيات بشكل دوري
// ============================

function updateStatistics() {
    // محاكاة تحديث البيانات
    statisticsData.tourists += Math.floor(Math.random() * 5);
    statisticsData.guests += Math.floor(Math.random() * 50);
    
    // تحديث العناصر
    document.getElementById('statTourists').textContent = statisticsData.tourists;
    document.getElementById('statGuests').textContent = statisticsData.guests.toLocaleString('en-US');
    
    console.log('تم تحديث الإحصائيات');
}

// تحديث الإحصائيات كل 30 ثانية
setInterval(updateStatistics, 30000);

// ============================
// معالجة أخطاء الصور
// ============================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%231a4569"/><text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle">صورة غير متاحة</text></svg>';
        };
    });
});
