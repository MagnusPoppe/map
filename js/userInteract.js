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

    map.on("click", function (e) {
        deselectAll();
        closePanel();
        var pos = [e.latlng.lat, e.latlng.lng];
        placeBusStops(pos);
    });
    
});

function closePanel()
{
    $("#meny").animate({bottom: "-500"}, 500);
    $(".lukk").removeClass("active");
}

function plannerInfoFill( id )
{
    var departure = getDepartureTimes(id);
    if (departure.length == undefined) {
        closePanel();
        return;
    }
    // Selecting the correct object.
    deselectAll();
    selected_from = id;

    // Placing data into the DOM:
    $("#menyinnhold h1").html(departure[0].name + " " + departure[0].direction);
    $("#menyinnhold .fra").html(departure[0].stop);
    $("#menyinnhold .fratid").html(departure[0].time);
}

function updatePlannerInfoToData( id )
{
    // var departure = getDepartureTimes(id);
    var departure = getDepartureTimes(id);
    if (departure.length == undefined) {
        closePanel();
        return;
    }
    $("#menyinnhold #stedTil").val(departure[0].stop);
    $("#menyinnhold .tiltid").html(departure[0].time);
}