// Google Map
var map;

// markers for map
var markers = [];

// info window
var info = new google.maps.InfoWindow();

// execute when the DOM is fully loaded
$(function() {

    // styles for map
    // https://developers.google.com/maps/documentation/javascript/styling
    var styles = [

        // hide Google's labels
        {
            featureType: "all",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        },

        // hide roads
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                { visibility: "off" }
            ]
        }

    ];

    // options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var options = {
        center: { lat: 37.4236, lng: -122.1619 }, // Stanford, California
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 14,
        panControl: true,
        styles: styles,
        zoom: 13,
        zoomControl: true
    };

    // get DOM node in which map will be instantiated
    var canvas = $("#map-canvas").get(0);

    // instantiate map
    map = new google.maps.Map(canvas, options);

    // configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);

});

/**
 * Adds marker for place to map.
 */
function addMarker(place) {
    //var myLatlng = new google.maps.LatLng(place.latitude,place.longitude);
    var myLatLng = new google.maps.LatLng(place["latitude"], place["longitude"]);
    parameters = {
        geo: place["postal_code"]
    };

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: place["place_name"] + ", " + place["admin_name1"],
        label: place["place_name"] + ", " + place["admin_name1"],
    });

    $.getJSON(Flask.url_for("articles"), parameters)
        .done(function(data, textStatus, jqXHR) {
            if (data.length != 0) {
                var articlesContent = "<ul>";
                for (var i = 0; i < data.length; i++) {
                    //Each list item is stored into articlesString
                    articlesContent += "<li><a target='_NEW' href='" + data[i].link +
                        "'>" + data[i].title + "</a></li>";
                }

                // close the unordered list of articles

            } else {
                articlesContent += "<li>NO ARTICLES!</li>"
            }
            articlesContent += "</ul>";
            var infowindow = new google.maps.InfoWindow({
                content: articlesContent
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });


        })
        .fail(function(data, textStatus, jqXHR) {
            console.log("FAIL");
        });


    markers.push(marker);
    // To add the marker to the map, call setMap();
    marker.setMap(map);

}