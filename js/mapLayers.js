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
 	map = L.map('map').setView(BOE_LATLONG, ZOOMLEVEL);

    L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}',
    {
        attribution: '<a href="http://www.kartverket.no/">Kartverket</a>'
    }).addTo(map);

    function onMapClick(e) {
    	var marker = L.marker(e.latlng).addTo(map);
    	marker.bindPopup("koordinater: "+e.latlng);
	}
	map.on('click', function (e) {
		console.log("[ "+e.latlng.lat + ", " + e.latlng.lng + " ]");
	});
}

function setRoadLayer() 
{	
	var wmsLayer = L.tileLayer.wms(ROAD_LAYER_URL, {
		layers: "all", 
		format: 'image/png',
		transparent: "true"
	}).addTo(map);
}

function placeBusStops( pos )
{

	var stops = getBusstops( pos[0], pos[1] );
	for(var i = 0; i < stops.length; i++)
	{
		var id = stops[i].id;
		if (id == undefined) continue;

		var icon = placeIcon(BUS_STOP_ICON,  stops[i].latitude, stops[i].longitude );
		icon.on("click", function(e)
		{
			if (selected_from != undefined)
			{
				selectTo( id );
				updatePlannerInfoToData( id) ;
				drawDummyLine();
			}
			else
			{
				plannerInfoFill( id );
			}

			$("#meny").animate({bottom: "0"}, 500);

		});
	}
}


function dummyplaceBusStops( pos )
{

	var url = "http://apidev.reiseinfo.no/openapi/proxy/location.nearbystops";
	var bussStops = new Array();

	$.ajax({
		url: url,
		method: "get",
		datatype: "json",
		async: false,
		data: {
			"accessId": "hack4no2016",
			"format": "json",
			"originCoordLat": pos[0],
			"originCoordLong": pos[1],
			"maxNo"	: 50
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

	var stops = bussStops;//getBusstops( pos[0], pos[1] );
	for(var i = 0; i < stops.length; i++)
	{
		var id = stops[i].id;
		if (id == undefined) continue;

		var icon = placeIcon(BUS_STOP_ICON,  stops[i].latitude, stops[i].longitude );
		icon.on("click", function(e)
		{
			if (selected_from != undefined)
			{
				selectTo( id );
				updatePlannerInfoToData( id) ;
				drawDummyLine();
			}
			else
			{
				plannerInfoFill( id );
			}

			$("#meny").animate({bottom: "0"}, 500);

		});
	}
}





// Setter ut bussholdeplasser der du befinner der



// Finner og legger ikon på hotspots
function placeHotspots( position ) 
{

	for(var i = 0; i < 500; i++)
		placeIcon(AVAILABLE_HOTSPOT_ICON,  59.41379, 9.08344 );
		placeIcon(AVAILABLE_HOTSPOT_ICON,  59.40251, 9.07118 );
		placeIcon(AVAILABLE_HOTSPOT_ICON,  59.45236, 9.06837 );
		placeIcon(AVAILABLE_HOTSPOT_ICON,  59.4445, 9.06331 );
		placeIcon(AVAILABLE_HOTSPOT_ICON,  59.43936, 9.08228 );
		placeIcon(AVAILABLE_HOTSPOT_ICON,  59.43681, 9.06845 );
		placeIcon(ACTIVE_HOTSPOT_ICON,  59.41982, 9.07735 );
		placeIcon(ACTIVE_HOTSPOT_ICON,  59.41513, 9.07677 );
		placeIcon(ACTIVE_HOTSPOT_ICON,  59.4264, 9.0815 );
		placeIcon(ACTIVE_HOTSPOT_ICON,  59.42344, 9.0626 );
		placeIcon(ACTIVE_HOTSPOT_ICON,  59.41864, 9.0555 );

}