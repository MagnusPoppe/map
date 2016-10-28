// GLOBALS: 
var ZOOMLEVEL = 14;
var map;

// POSISJONER:
var BOE_LATLONG 		= [59.41170376354018, 9.0730682015419];
var RINGERRIKE_LATLONG 	= [60.14, 10.25];

// Finner din posisjon
function goToLocation()
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		alert("Geolocation is not supported by this browser.");
	}
}

// Henter ut posisjonen. 
function showPosition( position ) 
{
	var latitude = parseFloat(
		JSON.stringify(
			position.coords.latitude
		)
	);
	var longitude = parseFloat(
		JSON.stringify(
			position.coords.longitude
		)
	);
	var pos = [latitude, longitude];
	map.panTo(pos);
	setBusStops(pos);
	return pos;

}


function placeHotspots( position ) 
{
	// Plasser ut de forskjellige hotspots med
	/* 
	[59.41379, 9.08344] /n
	[59.40251, 9.07118] /n
	[59.45236, 9.06837] /n
	[59.4445, 9.06331] /n
	[59.43936, 9.08228] /n
	[59.43681, 9.06845] /n
	[59.41982, 9.07735] /n
	[59.41513, 9.07677] /n
	[59.4264, 9.0815] /n
	[59.42344, 9.0626] /n
	[59.41864, 9.0555] /n
	[59.44499, 9.0642] /n
	
	*/
	// denne funskjonen. @elisekrist
}

$(document).ready(function () {
	$("#search").on('submit', function (e) {
		e.preventDefault();

		var sok = $('#searchfield').val();
		var url = 'http://ws.geonorge.no/AdresseWS/adresse/sok?sokestreng='+sok;

		if (sok != "") {
			$.ajax({
				url: url,
				dataType: "json",
				success: function (data)
				{
					var latitude = parseFloat(
							data.adresser[0].nord
					);
					var longitude = parseFloat(
							data.adresser[0].aust
					);
					map.panTo( [latitude, longitude] );
					L.marker([latitude, longitude]).bindTooltip(sok, {permanent: true}).openTooltip().addTo(map);

					$("#searchfield").val('');
				}
			});
		}
	});
});


// Plaserer en markør ved gitt koordinat
function finnAdresse( koordinat )
{
	var nord = koordinat[0];
	var aust = koordinat[1];
	var url = 'http://ws.geonorge.no/AdresseWS/adresse/radius?nord=' + nord + '&aust=' + aust + '&radius=1';

	$.ajax({
		url: url,
		dataType: "json",
		success: function (data)
		{
			var adressenavn = (data.adresser[0].adressenavn);
			var husNr = parseFloat(data.adresser[0].husnr);
			var poststed = (data.adresser[0].poststed);

			L.marker([nord, aust]).bindTooltip(adressenavn + " " + husNr + " " + poststed
				, {permanent: true}).openTooltip().addTo(map);
		}
	});
}

// Plaserer en markør ved gitt adresse
function finnKoordinat( adresse ) {
	var url = 'http://ws.geonorge.no/AdresseWS/adresse/sok?sokestreng='+adresse;

	$.ajax({
		url: url,
		dataType: "json",
		success: function (data)
		{
			var latitude = parseFloat(data.adresser[0].nord);
			var longitude = parseFloat(data.adresser[0].aust);

			var adressenavn = (data.adresser[0].adressenavn);
			var husNr = parseFloat(data.adresser[0].husnr);
			var poststed = (data.adresser[0].poststed);

			var adresse = adressenavn + " " + husNr + " " + poststed;

			L.marker([latitude, longitude]).bindTooltip(adresse, {permanent: true}).openTooltip().addTo(map);
		}
	});
}


/** KOMMENTARER OG NOTATER PÅ BRUK AV KART.
	For å endre typen kart hentet: 
		-> 	Endre "layers" nøkkelen sin verdi til en av følgende:
			Grunnkart: 				norges_grunnkart
			Grunnkart, gråtone: 	norges_grunnkart_graatone
			Enkelt kart: 			egk
			Eiendomskart: 			matrikkel_bakgrunn
			Terreng: 				terreng_norgeskart
			Topografisk kart: 		topo2

	Legge til sirkler, polygoner, markører osv:
		->	var marker = L.marker([51.5, -0.09]).addTo(mymap);
		->	var circle = L.circle([51.508, -0.11], {
			    color: 'red',
			    fillColor: '#f03',
			    fillOpacity: 0.5,
			    radius: 500
			}).addTo(mymap);
		-> 	var polygon = L.polygon([
			    [51.509, -0.08],
			    [51.503, -0.06],
			    [51.51, -0.047]
			]).addTo(mymap);
		NOTAT: Man kan legge til en meldingspopup ved å bruke setningen:
			->	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
			->	circle.bindPopup("I am a circle.");

	For å styre hva som skjer når brukeren trykker på ditt kart: 
		->	function onMapClick(e) {
    			alert("You clicked the map at " + e.latlng);
			}
			mymap.on('click', onMapClick);

	Eksempler på alt dette ligger under:	
		->	http://leafletjs.com/examples/quick-start/
		-> 	http://leafletjs.com/reference.html
*/