// ============================
// مكتبة المساعد السياحي
// ============================

class TourismAssistant {
    constructor() {
        this.statisticsData = {
            tourists: 1030,
            hotels: 377,
            revenue: 3.2,
            companies: 2432,
            rooms: 18366,
            chalets: 7236,
            villages: 132,
            guests: 696469
        };
        
        this.galleryImages = [
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
        
        this.aiResponses = {
            'مرحبا': 'مرحباً بك! كيف يمكنني مساعدتك اليوم؟',
            'السلام عليكم': 'وعليكم السلام ورحمة الله وبركاته. أهلاً بك في مركز المعلومات السياحي.',
            'احصائيات': this.getStatisticsResponse.bind(this),
            'فنادق': this.getHotelsResponse.bind(this),
            'صور': 'يمكنك زيارة معرض الصور لمشاهدة الصور السياحية من ليبيا. لدينا 44 صورة متنوعة.',
            'اثار': 'يوجد في ليبيا العديد من المواقع الأثرية مثل لبتيس ماجنا، صبراتة، وغيرها. يمكنك رؤية بعضها في معرض الصور.',
            'خدمات': 'الخدمات المتاحة:<br>1. الدراسات السياحية<br>2. الخدمات الإلكترونية<br>3. المكتبة الإلكترونية<br>4. التحليلات البيانية<br>5. معرض الصور',
            'مساعد': 'أنا المساعد الافتراضي لمركز المعلومات السياحي. يمكنني الإجابة على أسئلتك حول السياحة في ليبيا.'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.animateCounters();
        this.loadMiniGallery();
        this.initGalleryFilters();
        this.updateCurrentYear();
        this.initSmoothScroll();
        this.initNavbarScroll();
        this.setupImageErrorHandling();
        this.startStatisticsUpdate();
    }
    
    setupEventListeners() {
        // AI Chat
        $('#aiChatInput').keypress((e) => {
            if (e.which === 13) this.sendAIMessage();
        });
        
        // Close chat on outside click
        $(document).click((event) => {
            const aiChat = $('#aiChatWindow');
            const aiButton = $('.ai-assistant');
            if (!aiChat.is(event.target) && aiChat.has(event.target).length === 0 && 
                !aiButton.is(event.target) && aiButton.has(event.target).length === 0) {
                this.closeAIChat();
            }
        });
    }
    
    // ============================
    // دوال العدادات المتحركة
    // ============================
    
    animateCounters() {
        $('.stat-number').each((index, element) => {
            const $this = $(element);
            let value = 0;
            
            switch($this.attr('id')) {
                case 'statTourists': value = this.statisticsData.tourists; break;
                case 'statHotels': value = this.statisticsData.hotels; break;
                case 'statRevenue': value = this.statisticsData.revenue; break;
                case 'statCompanies': value = this.statisticsData.companies; break;
                case 'statRooms': value = this.statisticsData.rooms; break;
                case 'statChalets': value = this.statisticsData.chalets; break;
                case 'statVillages': value = this.statisticsData.villages; break;
                case 'statGuests': value = this.statisticsData.guests; break;
            }
            
            $this.prop('Counter', 0).animate({
                Counter: value
            }, {
                duration: 2000,
                easing: 'swing',
                step: (now) => {
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
    
    loadMiniGallery() {
        const galleryContainer = $('#galleryContainer');
        if (!galleryContainer.length) return;
        
        galleryContainer.empty();
        
        this.galleryImages.forEach((image) => {
            const col = `
                <div class="col-md-3 col-6 mb-4 gallery-item" data-category="${image.category}">
                    <a href="${image.url}" data-lightbox="gallery" 
                       data-title="${image.title} - ${image.description}">
                        <img src="${image.url}" alt="${image.title}" 
                             class="img-fluid" 
                             loading="lazy"
                             onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"300\" viewBox=\"0 0 400 300\"><rect width=\"400\" height=\"300\" fill=\"%231a4569\"/><text x=\"200\" y=\"150\" font-family=\"Arial\" font-size=\"20\" fill=\"white\" text-anchor=\"middle\">صورة غير متاحة</text></svg>'">
                        <div class="gallery-overlay">
                            <i class="fas fa-search-plus"></i>
                            <p class="text-white mb-0">${image.title}</p>
                        </div>
                    </a>
                </div>
            `;
            
            galleryContainer.append(col);
        });
        
        // Initialize Lightbox
        if (typeof lightbox !== 'undefined') {
            lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true,
                'albumLabel': 'صورة %1 من %2',
                'fadeDuration': 300,
                'imageFadeDuration': 300
            });
        }
    }
    
    initGalleryFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // إزالة النشط من جميع الأزرار
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // إضافة النشط للزر الحالي
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // تصفية العناصر
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ============================
    // المساعد الافتراضي
    // ============================
    
    toggleAIChat() {
        const chatWindow = $('#aiChatWindow');
        const isVisible = chatWindow.css('display') === 'block';
        
        if (isVisible) {
            this.closeAIChat();
        } else {
            chatWindow.css('display', 'block');
            chatWindow.attr('aria-hidden', 'false');
            $('#aiChatInput').focus();
        }
    }
    
    closeAIChat() {
        $('#aiChatWindow').css('display', 'none').attr('aria-hidden', 'true');
    }
    
    sendAIMessage() {
        const input = $('#aiChatInput');
        const message = input.val().trim();
        
        if (!message) return;
        
        // إضافة رسالة المستخدم
        this.addMessageToChat(message, 'user');
        
        // مسح حقل الإدخال
        input.val('');
        
        // محاكاة وقت المعالجة
        setTimeout(() => {
            const response = this.getAIResponse(message);
            this.addMessageToChat(response, 'ai');
        }, 1000);
    }
    
    addMessageToChat(message, type) {
        const chatBody = $('#aiChatBody');
        const messageClass = type === 'user' ? 'user-message' : 'ai-message';
        const sender = type === 'user' ? 'أنت' : 'المساعد';
        
        const messageElement = `
            <div class="message ${messageClass}">
                <strong>${sender}:</strong> ${message}
            </div>
        `;
        
        chatBody.append(messageElement);
        
        // التمرير لأسفل
        chatBody.scrollTop(chatBody[0].scrollHeight);
    }
    
    getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // البحث عن رد مناسب
        for (const [key, value] of Object.entries(this.aiResponses)) {
            if (lowerMessage.includes(key.toLowerCase())) {
                if (typeof value === 'function') {
                    return value();
                }
                return value;
            }
        }
        
        // رد افتراضي
        return 'شكراً لسؤالك. يمكنني مساعدتك في معلومات عن:<br>1. الإحصائيات السياحية<br>2. الفنادق والمنشآت<br>3. المواقع الأثرية<br>4. خدمات المركز<br>يرجى توضيح سؤالك أكثر.';
    }
    
    getStatisticsResponse() {
        return `أحدث الإحصائيات:<br>
                - السياح الوافدين: ${this.statisticsData.tourists} ألف<br>
                - الفنادق: ${this.statisticsData.hotels} فندق<br>
                - الإيرادات: ${this.statisticsData.revenue} مليار د.ل<br>
                - الشركات السياحية: ${this.statisticsData.companies}<br>
                للتفاصيل، زر <a href="dashboard.html" target="_blank">لوحة التحكم</a>.`;
    }
    
    getHotelsResponse() {
        return `معلومات الفنادق:<br>
                - عدد الفنادق: ${this.statisticsData.hotels}<br>
                - عدد الغرف: ${this.statisticsData.rooms.toLocaleString('en-US')}<br>
                - عدد القرى السياحية: ${this.statisticsData.villages}<br>
                - عدد الشاليهات: ${this.statisticsData.chalets.toLocaleString('en-US')}<br>
                - عدد نزلاء الفنادق: ${this.statisticsData.guests.toLocaleString('en-US')}`;
    }
    
    // ============================
    // دوال مساعدة
    // ============================
    
    updateCurrentYear() {
        $('#currentYear').text(new Date().getFullYear());
    }
    
    initSmoothScroll() {
        // Scroll to top button
        const scrollButton = $('<button>', {
            class: 'btn btn-primary scroll-to-top',
            html: '<i class="fas fa-chevron-up"></i>',
            css: {
                position: 'fixed',
                bottom: '90px',
                right: '30px',
                zIndex: '1000',
                display: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px'
            },
            click: () => {
                $('html, body').animate({ scrollTop: 0 }, 500);
            }
        }).appendTo('body');
        
        // Show/hide scroll button
        $(window).scroll(() => {
            if ($(window).scrollTop() > 300) {
                scrollButton.fadeIn();
            } else {
                scrollButton.fadeOut();
            }
        });
        
        // Smooth scroll for anchor links
        $('a[href^="#"]').click(function(e) {
            if ($(this).attr('href') === '#') return;
            
            const targetId = $(this).attr('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = $(targetId);
                if (targetElement.length) {
                    $('html, body').animate({
                        scrollTop: targetElement.offset().top - 80
                    }, 800);
                }
            }
        });
    }
    
    initNavbarScroll() {
        let lastScrollTop = 0;
        
        $(window).scroll(() => {
            const scrollTop = $(window).scrollTop();
            
            if (scrollTop > 100) {
                $('.navbar').addClass('scrolled');
                
                if (scrollTop > lastScrollTop) {
                    // Scrolling down - hide navbar
                    $('.navbar').css('transform', 'translateY(-100%)');
                } else {
                    // Scrolling up - show navbar
                    $('.navbar').css('transform', 'translateY(0)');
                }
            } else {
                $('.navbar').removeClass('scrolled');
                $('.navbar').css('transform', 'translateY(0)');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    setupImageErrorHandling() {
        $(document).on('error', 'img', function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%231a4569"/><text x="200" y="150" font-family="Arial" font-size="20" fill="white" text-anchor="middle">صورة غير متاحة</text></svg>';
        });
    }
    
    // ============================
    // تحديث الإحصائيات
    // ============================
    
    startStatisticsUpdate() {
        // تحديث كل 30 ثانية
        setInterval(() => {
            this.updateStatistics();
        }, 30000);
    }
    
    updateStatistics() {
        // محاكاة تحديث البيانات
        this.statisticsData.tourists += Math.floor(Math.random() * 5);
        this.statisticsData.guests += Math.floor(Math.random() * 50);
        
        // تحديث العدادات
        $('#statTourists').text(this.statisticsData.tourists);
        $('#statGuests').text(this.statisticsData.guests.toLocaleString('en-US'));
        
        // إضافة تأثير التحديث
        $('#statTourists, #statGuests').addClass('updated');
        setTimeout(() => {
            $('#statTourists, #statGuests').removeClass('updated');
        }, 1000);
    }
    
    // ============================
    // أدوات التطوير
    // ============================
    
    logPerformance() {
        if ('performance' in window) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`وقت تحميل الصفحة: ${pageLoadTime}ms`);
            
            // تحذير إذا كان وقت التحميل بطيئاً
            if (pageLoadTime > 3000) {
                console.warn('تحذير: وقت تحميل الصفحة بطيء. يرجى تحسين الأداء.');
            }
        }
    }
}

// ============================
// تهيئة التطبيق عند تحميل الصفحة
// ============================

$(document).ready(() => {
    console.log('جاري تهيئة تطبيق مركز المعلومات السياحي...');
    
    // إنشاء مثيل المساعد
    window.tourismAssistant = new TourismAssistant();
    
    // تسجيل أداء التحميل
    setTimeout(() => {
        tourismAssistant.logPerformance();
    }, 1000);
    
    // إضافة style للعدادات المحدثة
    $('<style>').text(`
        .stat-number.updated {
            animation: pulseUpdate 1s ease;
        }
        
        @keyframes pulseUpdate {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); color: #ffd700; }
            100% { transform: scale(1); }
        }
        
        .scroll-to-top {
            opacity: 0.9;
            transition: all 0.3s;
        }
        
        .scroll-to-top:hover {
            opacity: 1;
            transform: translateY(-3px);
        }
    `).appendTo('head');
    
    console.log('تم تحميل التطبيق بنجاح!');
});

// ============================
// دوال عامة للاستخدام في HTML
// ============================

function toggleAIChat() {
    if (window.tourismAssistant) {
        window.tourismAssistant.toggleAIChat();
    }
}

function closeAIChat() {
    if (window.tourismAssistant) {
        window.tourismAssistant.closeAIChat();
    }
}

function sendAIMessage() {
    if (window.tourismAssistant) {
        window.tourismAssistant.sendAIMessage();
    }
}
