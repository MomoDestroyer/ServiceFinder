const services = [
    { name: 'Elektriker Meisterbetrieb', category: 'handwerk', location: 'Berlin', lat: 52.52, lng: 13.405 },
    { name: 'Webdesign Studio', category: 'it', location: 'Hamburg', lat: 53.551, lng: 9.993 },
    { name: 'Gebäudereinigung Klar', category: 'reinigung', location: 'München', lat: 48.137, lng: 11.575 },
    { name: 'Gartenbau Müller', category: 'garten', location: 'Köln', lat: 50.937, lng: 6.96 }
];

let map;
let markers = [];

function initMap() {
    map = L.map('map').setView([51.1657, 10.4515], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

function addMarker(service) {
    const marker = L.marker([service.lat, service.lng]).addTo(map);
    marker.bindPopup(`<b>${service.name}</b><br>${service.location}`);
    markers.push(marker);
}

function clearMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
}

function showResults(list) {
    const resultsEl = document.getElementById('results');
    resultsEl.innerHTML = '';
    list.forEach(service => {
        const li = document.createElement('li');
        li.textContent = `${service.name} (${service.location})`;
        resultsEl.appendChild(li);
        addMarker(service);
    });
}

function search() {
    const query = document.getElementById('query').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    clearMarkers();
    const filtered = services.filter(service => {
        const matchesQuery = service.name.toLowerCase().includes(query);
        const matchesCategory = category ? service.category === category : true;
        return matchesQuery && matchesCategory;
    });
    showResults(filtered);
}

function addService() {
    const name = document.getElementById('serviceName').value;
    const category = document.getElementById('serviceCategory').value;
    const location = document.getElementById('serviceLocation').value;
    if (!name || !location) return;
    const service = { name, category, location, lat: 51.0, lng: 10.0 };
    services.push(service);
    search();
}

window.onload = () => {
    initMap();
    document.getElementById('searchButton').addEventListener('click', search);
    document.getElementById('addButton').addEventListener('click', addService);
    document.getElementById('scrollDown').addEventListener('click', () => {
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    });
    search();
};
