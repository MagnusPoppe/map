/**
 * Created by Jørgen on 28.10.2016.
 */
$(document).ready(function () {

    $("#swipeRight").on('change', function (e) {
        $("#p").html(finnAdresse(lat));

        $.ajax({
        });
    });

    $("#menyClose").on('click', function() {

    });
    
    $('.lukk').on('click', function(){
        $("#meny").animate({bottom: "-500"}, 500);
        $(".lukk").removeClass("active");
    });

    map.on("click", a );

    function a (e) {
        deselectAll();
        closePanel();
        var pos = [e.latlng.lat, e.latlng.lng];
        placeBusStops(pos);
    }
});

function closePanel()
{
    $("#meny").animate({bottom: "-500"}, 500);
    $(".lukk").removeClass("active");
}

function plannerInfoFill( id )
{
    var bus_stop_id = id;
    var url = "http://apidev.reiseinfo.no/bin/rest.exe/v1.1/vs_restapi/departureBoard";
    // ?format=json&authKey=api-test&time=16:50&id=762139955

    var departure = new Array();
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
            departure = e.DepartureBoard.Departure;

            // Selecting the correct object.
            deselectAll();
            selected_from = id;

            // Placing data into the DOM:
            $("#menyinnhold h1").html(departure[0].name + " " + departure[0].direction);
            $("#menyinnhold .fra").html(departure[0].stop);
            $("#menyinnhold .fratid").html(departure[0].time);
        }
    });


}

function updatePlannerInfoToData( id )
{
    var bus_stop_id = id;

    var url = "http://apidev.reiseinfo.no/bin/rest.exe/v1.1/vs_restapi/departureBoard";
    // ?format=json&authKey=api-test&time=16:50&id=762139955

    var departure = new Array();
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
            departure = e.DepartureBoard.Departure;
            $("#menyinnhold #stedTil").val(departure[0].stop);
            $("#menyinnhold .tiltid").html(departure[0].time);
        }
    });
}