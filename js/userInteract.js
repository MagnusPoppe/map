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
        var pos = [e.latlng.lat, e.latlng.lng];
        console.log(pos);
        setBusStops(pos);
    });
    
});

function plannerInfoFill( id )
{
    var departure = getDepartureTimes(id);
    $("#menyinnhold h1").html(departure[0].name + " " + departure[0].direction);
    $("#menyinnhold h3").html(departure[0].stop);
    $("#menyinnhold .fratid").html(departure[0].time);
}