// events.js
const eventsData = [
    {
        id: 1,
        title: "مهرجان الواحات الدولي",
        date: "2024-03-15",
        location: "غدامس",
        category: "ثقافي",
        description: "مهرجان سنوي يعرض التراث الصحراوي والثقافة البدوية",
        image: "https://raw.githubusercontent.com/tidclibya/tidc.ly/main/66bd8a_c3ca7ae27a64402b8252aa94d925bbfc~mv2.avif"
    },
    {
        id: 2,
        title: "معرض السياحة الليبي",
        date: "2024-04-20",
        location: "طرابلس",
        category: "استثماري",
        description: "أكبر معرض للسياحة والاستثمار في ليبيا",
        image: "https://raw.githubusercontent.com/tidclibya/tidc.ly/main/7.jpg"
    },
    {
        id: 3,
        title: "سباق الهجن التقليدي",
        date: "2024-05-05",
        location: "سبها",
        category: "تراثي",
        description: "سباق سنوي للهجن في الصحراء الليبية",
        image: "https://raw.githubusercontent.com/tidclibya/tidc.ly/main/8.jpg"
    }
];

function displayEvents() {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';
    
    eventsData.forEach(event => {
        const eventCard = `
            <div class="col-md-4">
                <div class="card event-card h-100">
                    <img src="${event.image}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <span class="badge bg-primary">${event.category}</span>
                        <h5 class="card-title mt-2">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-calendar me-1"></i> ${event.date}
                            </small>
                            <small class="text-muted">
                                <i class="fas fa-map-marker-alt me-1"></i> ${event.location}
                            </small>
                        </div>
                        <button class="btn btn-primary mt-3 w-100" onclick="registerEvent(${event.id})">
                            <i class="fas fa-calendar-plus me-2"></i> التسجيل
                        </button>
                    </div>
                </div>
            </div>
        `;
        eventsContainer.innerHTML += eventCard;
    });
}

function registerEvent(eventId) {
    alert(`تم تسجيلك في الفعالية رقم ${eventId}`);
}

// تهيئة الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayEvents);