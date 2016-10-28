function addHotSpotIcon(lat, lng){

    var hotSpotIcon = L.icon({
        iconUrl: 'Ikoner/available_hotspot1_icon.png',

        iconSize: [55, 75],
        iconAnchor: [lng, lat ],
        //popupAnchor: [100, 95]

});

    L.marker([lat, lng], {icon: hotSpotIcon}).addTo(map)
}

function addBusIcon(lat, lng){

    var hotSpotIcon = L.icon({
        iconUrl: 'Ikoner/bus_icon.png',

        iconSize: [55, 75],
        iconAnchor: [lng, lat ],
        //popupAnchor: [0, 95]

    });

    L.marker([lat, lng], {icon: hotSpotIcon}).addTo(map)
}

function addMeIcon(lat, lng){

    var hotSpotIcon = L.icon({
        iconUrl: 'Ikoner/me_icon.png',

        iconSize: [55, 75],
        iconAnchor: [lng, lat ],
        //popupAnchor: [0, 95]

    });

    L.marker([lat, lng], {icon: hotSpotIcon}).addTo(map)
}

function addSearchIcon(lat, lng){

    var hotSpotIcon = L.icon({
        iconUrl: 'Ikoner/search_icon.png',

        iconSize: [55, 75],
        iconAnchor: [lng, lat ],
        //popupAnchor: [0, 95]

    });

    L.marker([lat, lng], {icon: hotSpotIcon}).addTo(map)
}
