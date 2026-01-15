// ملف JavaScript الرئيسي

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الموقع بنجاح');
    
    // تفعيل القائمة المنسدلة
    if (typeof $ !== 'undefined') {
        $('.dropdown-toggle').dropdown();
    }
    
    // تفعيل تأثيرات التمرير
    initScrollEffects();
    
    // تفعيل معرض الصور
    initGallery();
    
    // تفعيل الفعاليات
    initEvents();
});

// تأثيرات التمرير
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر ذات كلاس reveal
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

// معرض الصور
function initGallery() {
    // إذا كان هناك معرض صور في الصفحة
    const galleryItems = document.querySelectorAll('.gallery-card');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            openImageModal(imgSrc, imgAlt);
        });
    });
}

// نافذة عرض الصورة
function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%;">
            <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 90vh; border-radius: 10px;">
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
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
            ">×</button>
            <div style="position: absolute; bottom: 10px; right: 10px; color: white; background: rgba(0,0,0,0.5); padding: 5px 10px; border-radius: 5px;">
                ${alt}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // إظهار النافذة
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // إغلاق النافذة
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // إغلاق عند النقر خارج الصورة
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
    
    // إغلاق بالزر Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeOnEscape);
            }, 300);
        }
    });
}

// الفعاليات
function initEvents() {
    const eventButtons = document.querySelectorAll('.event-register-btn');
    
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventName = this.closest('.event-card').querySelector('h4').textContent;
            
            if (confirm(`هل تريد التسجيل في فعالية "${eventName}"؟`)) {
                // هنا يمكن إضافة كود التسجيل الحقيقي
                alert(`تم تسجيلك في فعالية "${eventName}" بنجاح!\nسيتم التواصل معك قريباً للتأكيد.`);
                
                // تغيير لون الزر
                this.innerHTML = '<i class="fas fa-check"></i> مسجل';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                this.disabled = true;
            }
        });
    });
}

// تحميل الصور بكسل سلس
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// تهيئة الصور المحلية للتحميل المسبق
const libyaImages = [
    'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_66e80a224da145eb8afda466f1383921~mv2.avif',
    'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_c3ca7ae27a64402b8252aa94d925bbfc~mv2.avif',
    'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_932914bc7b4845e3b300b424cad83ecb~mv2.avif',
    'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/7.jpg',
    'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/8.jpg',
    'https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_cad084455def4cb8a5670e848bc3ca4b~mv2.avif'
];

// تحميل الصور مسبقاً عند تحميل الصفحة
window.addEventListener('load', function() {
    preloadImages(libyaImages);
});