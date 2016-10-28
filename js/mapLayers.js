// GLOBALS: 
var ZOOMLEVEL = 14;
var map;

// POSISJONER:
var BOE_LATLONG 			= [59.41085, 9.07256];
var RINGERRIKE_LATLONG 	= [60.14, 10.25];

// WMS TJENESTER: 
var ROAD_LAYER_URL 	  =  "http://openwms.statkart.no/skwms1/wms.vegnett?";
var ROAD_LAYER_URL2 	  =  "http://openwms.statkart.no/skwms1/wms.vegnett?VERSION=1.1.1&SERVICE=WMS&REQUEST=GetCapabilities";
var ADDRESS_LAYER_URL =  "http://wms.geonorge.no/skwms1/wms.matrikkel.v1?request=G";

function initializeMap( position ) 
{
 	// INITIALIZING THE MAIN MAP:
 	map = L.map('map').setView(position, ZOOMLEVEL);

    L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}', 
    {
        attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
    }).addTo(map);

    function onMapClick(e) {
    	var marker = L.marker(e.latlng).addTo(map);
    	marker.bindPopup("koordinater: "+e.latlng);
	}
	map.on('click', onMapClick);

	setRoadLayer();
}

function setRoadLayer() 
{	
	var wmsLayer = L.tileLayer.wms(ROAD_LAYER_URL, {
		layers: "all", 
		format: 'image/png',
		transparent: "true"
	}).addTo(map);
}