// map-data.js
const libyaTouristSites = {
    "archaeological": [
        {
            name: "لبتيس ماجنا",
            lat: 32.6378,
            lng: 14.2906,
            description: "أهم مدينة رومانية في أفريقيا",
            details: "أسسها الفينيقيون في القرن السابع قبل الميلاد"
        },
        {
            name: "صبراتة",
            lat: 32.7939,
            lng: 12.4882,
            description: "مدينة فينيقية رومانية",
            details: "ميناء تجاري مهم في العصور القديمة"
        }
    ],
    "natural": [
        {
            name: "الجبل الأخضر",
            lat: 32.5,
            lng: 21.5,
            description: "منطقة خضراء في شرق ليبيا",
            details: "تشتهر بالزراعة والطبيعة الخلابة"
        }
    ],
    "heritage": [
        {
            name: "غدامس",
            lat: 30.1333,
            lng: 9.5000,
            description: "واحة صحراوية تاريخية",
            details: "مدينة تراثية مسجلة في اليونسكو"
        }
    ]
};

function initLibyaMap() {
    const map = L.map('libyaMap').setView([27.0, 17.0], 6);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    // إضافة المؤشرات
    Object.keys(libyaTouristSites).forEach(type => {
        libyaTouristSites[type].forEach(site => {
            L.marker([site.lat, site.lng])
                .addTo(map)
                .bindPopup(`
                    <h5>${site.name}</h5>
                    <p>${site.description}</p>
                    <small>${site.details}</small>
                `);
        });
    });
    
    return map;
}