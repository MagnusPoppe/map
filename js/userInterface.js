var BUSS_ICON = L.icon({
    iconUrl: 'Ikoner/bus_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

var AVAILABLE_HOTSPOT_ICON = L.icon({
    iconUrl: 'Ikoner/buss_stop.png',

    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

var ME_ICON = L.icon({
    iconUrl: 'Ikoner/me_pin_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

var SEARCH_ICON = L.icon({
    iconUrl: 'Ikoner/search_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

function placeIcon(icon, lat, lng){
    L.marker([lat, lng], {icon: icon}).addTo(map)
}

function removeIcon(icon){
    removeLayer(this);
}

function replaceIcon(icon){

}

$(document).ready(function () {
    $(".leaflet-marker-icon").on("click", function () {
        removeIcon();
    })
});


