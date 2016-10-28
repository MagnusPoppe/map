/**
 * Created by Jørgen on 28.10.2016.
 */
$(document).ready(function () {

    $("#swipeRight").on('change', function (e) {
        $("#p").html(finnAdresse(lat));

        $.ajax({
        });
    });

    map.on('click', function (e) {
        var pos = [e.latlng.lat, e.latlng.lng];

        finnAdresse(pos, "stedFra");
        $("#meny").animate({bottom: "0"}, 500);
    });

    $("#menyClose").on('click', function() {

    });
});