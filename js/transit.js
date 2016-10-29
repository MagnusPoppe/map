/**
 * Created by MagnusPoppe on 29/10/2016.
 */

// The selected variable holds a selected busstop/hotspot if
// one is selected. If no stop/hotspot is selected, the variable is undefined.
var selected_from;
var selected_to;

function selectFrom( bus_stop_id )
{
    selected_from = bus_stop_id;
}

function selectTo( bus_stop_id )
{
    selected_to = bus_stop_id;
}

function deselectFrom( bus_stop_id )
{
    selected_from = undefined;
}

function deselectTo( bus_stop_id )
{
    selected_to = undefined;
}

function deselectAll() {
    selected_from = undefined;
    selected_to   = undefined;
}

function getBusstops( latitude, longitude )
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
            "originCoordLat": latitude,
            "originCoordLong": longitude,
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
    return bussStops;
}

function getDepartureTimes( bus_stop_id )
{
    var url = "http://apidev.reiseinfo.no/bin/rest.exe/v1.1/vs_restapi/departureBoard";
    // ?format=json&authKey=api-test&time=16:50&id=762139955

    var departures = new Array();
    var time = new Date();

    $.ajax({
        url: url,
        method: "get",
        datatype: "json",
        async: false,
        data: {
            "id" 		: bus_stop_id,
            "format" 	: "json",
            "authKey" 	: "api-test",
            "time" 		: time.getHours() + ":" + time.getMinutes()
        },
        success : function (e)
        {
            departures = e.DepartureBoard.Departure;
        }
    });

    return departures;
}