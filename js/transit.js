/**
 * Created by MagnusPoppe on 29/10/2016.
 */

// The selected variable holds a selected busstop/hotspot if
// one is selected. If no stop/hotspot is selected, the variable is undefined.
    var selected_from;
    var selected_to;

/**
 * Selects the from-variable
 */
function selectFrom( bus_stop_id )
{
    selected_from = bus_stop_id;
}

/**
 * Selects the to-variable
 */
function selectTo( bus_stop_id )
{
    selected_to = bus_stop_id;
}

/**
 * Deselects the from-variable
 */
function deselectFrom( bus_stop_id )
{
    selected_from = undefined;
}

/**
 * Deselects the to-variable
 */
function deselectTo( bus_stop_id )
{
    selected_to = undefined;
}

/**
 * Deselects both selected-variables.
 */
function deselectAll()
{
    selected_from = undefined;
    selected_to   = undefined;
}

/**
 * Gets busstops based on a selected latlng posision. It uses a
 * radius of 1000m to search for busstops on. Uses NRIs APIS to
 * run the search.
 *
 * NOTE: NRI tells us that the function is buggy.
 * @param latitude
 * @param longitude
 * @returns {Array} of JSONobjects that contains the following info:
 *          id, name, latitude, lonitude.
 */
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

/**
 * Gets departuretimes for a spesific busstop. Uses the NRI travelAPI
 * for realtime transitinfo.
 * @param bus_stop_id
 * @returns {Array} of JSON objects with the following info:
 *          GeometryRef, JourneyDetailRef, date, direction,
 *          local, name, stop, stopid, time, type.
 */
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
    console.log(departures);
    return departures;
}