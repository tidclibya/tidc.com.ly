/**
 * الملف الرئيسي للجافاسكريبت - مركز المعلومات والتوثيق السياحي
 */

// كائن البيانات الرئيسي
const AppData = {
    currentYear: new Date().getFullYear(),
    stats: {},
    initialized: false
};

// تهيئة التطبيق
function initApp() {
    console.log('جاري تهيئة تطبيق مركز المعلومات والتوثيق السياحي...');
    
    // تحميل البيانات
    loadStatistics();
    
    // تهيئة الأحداث
    initEvents();
    
    // تحديث التاريخ
    updateCurrentYear();
    
    AppData.initialized = true;
    console.log('تم تهيئة التطبيق بنجاح!');
}

// تحميل الإحصائيات
function loadStatistics() {
    // بيانات افتراضية
    AppData.stats = {
        tourists: 1030,
        hotels: 377,
        revenue: 3.2,
        companies: 2432,
        rooms: 18366,
        beds: 33644,
        chalets: 7236,
        villages: 132,
        guests: 696469,
        artisans: 723,
        guides: 311,
        flightsInternational: 19804,
        flightsDomestic: 15732,
        revenuesExpected: 3.2,
        totalPassengers: 4463047,
        investmentSites: 134,
        parkArea: 3600,
        educationalInstitutions: 16,
        databaseSites: 7525
    };
    
    console.log('تم تحميل البيانات الإحصائية');
}

// تهيئة الأحداث
function initEvents() {
    // تنبيهات التحديث
    document.getElementById('refreshBtn')?.addEventListener('click', function() {
        refreshData();
    });
    
    // الأحداث العامة
    setupGeneralEvents();
}

// تحديث البيانات
function refreshData() {
    console.log('جاري تحديث البيانات...');
    
    // محاكاة تحديث البيانات
    AppData.stats.tourists += Math.floor(Math.random() * 5);
    AppData.stats.guests += Math.floor(Math.random() * 50);
    
    // تحديث واجهة المستخدم
    updateStatisticsUI();
    
    // إشعار المستخدم
    showNotification('تم تحديث البيانات بنجاح', 'success');
}

// تحديث واجهة الإحصائيات
function updateStatisticsUI() {
    // تحديث عناصر DOM
    updateElementValue('statTourists', AppData.stats.tourists);
    updateElementValue('statHotels', AppData.stats.hotels);
    updateElementValue('statRevenue', AppData.stats.revenue, true);
    updateElementValue('statCompanies', AppData.stats.companies);
    
    console.log('تم تحديث واجهة الإحصائيات');
}

// تحديث قيمة عنصر
function updateElementValue(elementId, value, isFloat = false) {
    const element = document.getElementById(elementId);
    if (element) {
        if (isFloat) {
            element.textContent = value.toFixed(1);
        } else {
            element.textContent = value.toLocaleString('en-US');
        }
    }
}

// إظهار الإشعارات
function showNotification(message, type = 'info') {
    const types = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    };
    
    const alertClass = types[type] || types['info'];
    
    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = `alert ${alertClass} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 5 ثواني
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// تحديث السنة الحالية
function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = AppData.currentYear;
    });
}

// تهيئة الأحداث العامة
function setupGeneralEvents() {
    // التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // التحكم في شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // فتح لوحة التحكم في نافذة جديدة
    document.querySelectorAll('a[href*="dashboard.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('target') === '_blank') {
                e.preventDefault();
                window.open(this.href, '_blank', 'width=1200,height=800');
            }
        });
    });
}

// تصدير البيانات
function exportData(format = 'excel') {
    const formats = {
        'excel': 'تصدير كملف Excel',
        'pdf': 'تصدير كملف PDF',
        'csv': 'تصدير كملف CSV'
    };
    
    showNotification(`جاري ${formats[format]}...`, 'info');
    
    // محاكاة عملية التصدير
    setTimeout(() => {
        showNotification(`تم ${formats[format]} بنجاح`, 'success');
    }, 1500);
}

// تحميل التطبيق عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    
    // إضافة تأثيرات دخول للعناصر
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in-up');
            }, index * 100);
        });
    }, 500);
});

// تصدير الوظائف للاستخدام العام
window.TIDCApp = {
    refreshData,
    exportData,
    showNotification,
    getStats: () => AppData.stats
};
