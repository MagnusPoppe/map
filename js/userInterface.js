var BUS_ICON = L.icon({
    iconUrl: 'Ikoner/bus_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

var BUS_STOP_ICON = L.icon({
    iconUrl: 'Ikoner/bus_stop_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

var ACTIVE_HOTSPOT_ICON = L.icon({
    iconUrl: 'Ikoner/active_hotspot_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

var INACTIVE_HOTSPOT_ICON = L.icon({
    iconUrl: 'Ikoner/inactive_hotspot_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

var ME_ICON = L.icon({
    iconUrl: 'Ikoner/me_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

var SEARCH_ICON = L.icon({
    iconUrl: 'Ikoner/search_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

var SETTINGS_ICON = L.icon({
    iconUrl: 'Ikoner/settings_icon.png',

    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

function placeIcon(icon, lat, lng){
    var v = L.marker([lat, lng], {icon: icon}).addTo(map);
    /*
    v.on('click', function(e){
        alert("asd");
    })
    */
    return v;
}

function replaceIcon(icon){
    marker.setIcon(SEARCH_ICON);
}

$(document).ready(function () {
    placeIcon(INACTIVE_HOTSPOT_ICON, 60.15722621783532, 10.253033638000488);


    $(".leaflet-marker-icon").on('click', function () {
        var test = $('.leaflet-marker-icon').prop('src');
        var path = test.replace("file:///C:/xampp/htdocs/map/", "");
        console.log(path);
       // var image = $('.leaflet-marker-icon').attr(src);
        if(path == 'Ikoner/inactive_hotspot_icon.png'){
            $(this).attr("src", 'Ikoner/active_hotspot_icon.png');
        }

        if (path == 'Ikoner/active_hotspot_icon.png'){
            alert("this");
        }




    })
});