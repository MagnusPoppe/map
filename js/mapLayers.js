// GLOBALS: 
var ZOOMLEVEL = 14;
var map;

// POSISJONER:
var BOE_LATLONG 		= [59.41085, 9.07256];
var RINGERRIKE_LATLONG 	= [60.14, 10.25];

// WMS TJENESTER: 
var ROAD_LAYER_URL 	  =  "http://openwms.statkart.no/skwms1/wms.vegnett?";
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

function hey() {
	console.log(getCheeseburgers( 59.41268, 9.06904 ));
}

function getBusstops( latitude, longitude )
{
	var url = "http://apidev.reiseinfo.no/openapi/proxy/location.nearbystops";
		//?accessId=hack4no2016&originCoordLong="+longitude+"&originCoordLat="+latitude+"&format=json";

	var bussStops = new Array();

	$.ajax({
		url: url,
		method: "get",
		datatype: "json",
		async: false,
		data: {
			"accessId": "hack4no2016",
			"format": "json",
			"originCoordLat": latitude,
			"originCoordLong": longitude
		},
		success : function (e)
		{
			for(var i = 0; i < e.stopLocationOrCoordLocation.length; i++)
			{
				bussStops[i] = {
					"id" 		: e.stopLocationOrCoordLocation[i].StopLocation.extId,
					"name" 		: e.stopLocationOrCoordLocation[i].StopLocation.name,
					"latitude"	: e.stopLocationOrCoordLocation[i].StopLocation.lat,
					"longitude" : e.stopLocationOrCoordLocation[i].StopLocation.lon
				};
			}
		}
	});
	return bussStops;
}