// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

/**
 * This function creates and displays the Google map
 */
function initMap() {
    const pom_and_honey = {lat: 30.6123, lng: -96.3413};
    
    map = new google.maps.Map(document.getElementById("map"), {
        center: pom_and_honey,
        zoom: 17,
    });
    infoWindow = new google.maps.InfoWindow();

    const marker = new google.maps.Marker({
        position: pom_and_honey,
        map: map,
    });

    const getDirectionsButton = document.getElementById("proceed");
    getDirectionsButton.addEventListener("click", ()=>{
        // Try HTML5 geolocation
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
            // Use the user's current location as the origin of the route
            const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            };
            // Open a new tab or window in the user's browser and navigate to the Google Maps URL with the appropriate query parameters
            window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${pom_and_honey.lat},${pom_and_honey.lng}&travelmode=driving`,
            "_blank"
            );
        });
        } else {
        // If the user's browser doesn't support geolocation, show an error message
        window.alert("Geolocation is not supported by this browser.");
        }
    });
}

window.initMap = initMap;