// main.js - الملف الرئيسي للجافاسكربت

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('TIDC Libya Tourism Portal Initialized');
    
    // تهيئة المكونات
    initComponents();
    initEvents();
    initGallery();
    
    // تحميل الصور مسبقاً
    preloadImages();
});

// تهيئة المكونات
function initComponents() {
    // تفعيل القوائم المنسدلة
    if (typeof $ !== 'undefined') {
        $('.dropdown-toggle').dropdown();
    }
    
    // تأثيرات التمرير
    initScrollEffects();
    
    // تأثيرات التحميل
    initLoadingEffects();
}

// تأثيرات التمرير
function initScrollEffects() {
    // تأثير شريط التنقل
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // تأثيرات الظهور عند التمرير
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    });
    
    // التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // تحديث الرابط النشط في القائمة
                updateActiveNavLink(targetId);
            }
        });
    });
}

// تحديث الرابط النشط في القائمة
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === targetId) {
            link.classList.add('active');
        }
    });
}

// تأثيرات التحميل
function initLoadingEffects() {
    // تأثير تحميل الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // إضافة class للمؤشرات
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// إدارة الفعاليات
function initEvents() {
    // تفعيل أزرار التسجيل في الفعاليات
    document.querySelectorAll('.event-register-btn').forEach(button => {
        button.addEventListener('click', function() {
            registerEvent(this);
        });
    });
}

// تسجيل في فعالية
function registerEvent(button) {
    const eventCard = button.closest('.event-card');
    const eventName = eventCard.querySelector('h4').textContent;
    
    // عرض تأكيد
    if (confirm(`هل تريد التسجيل في فعالية "${eventName}"؟`)) {
        // محاكاة إرسال البيانات
        const formData = {
            event: eventName,
            name: 'مستخدم',
            email: 'user@example.com',
            date: new Date().toISOString()
        };
        
        // تغيير حالة الزر
        button.innerHTML = '<i class="fas fa-check"></i> مسجل';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        button.disabled = true;
        
        // رسالة نجاح
        showNotification('تم التسجيل بنجاح!', 'success');
        
        // تسجيل في وحدة التحكم
        console.log('Event registered:', formData);
    }
}

// إدارة المعرض
function initGallery() {
    // تفعيل أزرار الفلترة
    document.querySelectorAll('.gallery-filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            filterGallery(this);
        });
    });
    
    // تفعيل النقر على الصور
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            openImageModal(this);
        });
    });
}

// فلترة المعرض
function filterGallery(button) {
    const filter = button.getAttribute('data-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // تحديث الأزرار النشطة
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // تطبيق الفلتر
    galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// فتح نافذة الصورة
function openImageModal(galleryItem) {
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('.gallery-overlay h5').textContent;
    const description = galleryItem.querySelector('.gallery-overlay p').textContent;
    
    // إنشاء النافذة
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%;">
            <img src="${img.src}" alt="${img.alt}" style="max-width: 100%; max-height: 90vh; border-radius: 10px;">
            <button class="close-modal" style="
                position: absolute;
                top: 10px;
                left: 10px;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                color: white;
                font-size: 24px;
                cursor: pointer;
                backdrop-filter: blur(10px);
            ">×</button>
            <div style="position: absolute; bottom: 10px; right: 10px; color: white; background: rgba(0,0,0,0.5); padding: 10px 15px; border-radius: 5px;">
                <h4 style="margin: 0 0 5px 0;">${title}</h4>
                <p style="margin: 0; font-size: 0.9rem;">${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // إظهار النافذة
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // إغلاق النافذة
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        closeImageModal(modal);
    });
    
    // إغلاق عند النقر خارج الصورة
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal(modal);
        }
    });
    
    // إغلاق بالزر Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeImageModal(modal);
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// إغلاق نافذة الصورة
function closeImageModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }, 300);
}

// تحميل الصور مسبقاً
function preloadImages() {
    const imageUrls = [
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_66e80a224da145eb8afda466f1383921~mv2.avif',
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_c3ca7ae27a64402b8252aa94d925bbfc~mv2.avif',
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_932914bc7b4845e3b300b424cad83ecb~mv2.avif',
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/7.jpg',
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/8.jpg',
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_cad084455def4cb8a5670e848bc3ca4b~mv2.avif',
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_22417b9d75b54667a468d36ebe8cc12b~mv2.webp',
        'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_44822d76c8a9494f851382e222935551~mv2.webp'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" 
               style="margin-left: 10px;"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // إخفاء الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// تحميل البيانات الديناميكية
async function loadData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
        showNotification('حدث خطأ في تحميل البيانات', 'error');
        return null;
    }
}

// حفظ التفضيلات
function savePreference(key, value) {
    localStorage.setItem(`tidc_${key}`, JSON.stringify(value));
}

function getPreference(key, defaultValue = null) {
    const value = localStorage.getItem(`tidc_${key}`);
    return value ? JSON.parse(value) : defaultValue;
}

// إدارة حالة التحميل
const LoadingManager = {
    show: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('loading');
        }
    },
    
    hide: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('loading');
        }
    }
};

// تصدير الوظائف (اختياري)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initComponents,
        showNotification,
        loadData
    };
}