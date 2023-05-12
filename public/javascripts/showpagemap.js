
mapboxgl.accessToken= mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/light-v10', // style URL
center: cd.geometry.coordinates, // starting position [lng, lat]
zoom: 8, // starting zoom
projection: 'globe' // display the map as a 3D globe
});
map.on('style.load', () => {
map.setFog({}); // Set the default atmosphere style
});

new mapboxgl.Marker({
    color: "#BBBBBB"
})
.setLngLat(cd.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset:25})
    .setHTML(`<h3>${cd.title}</h3><p>${cd.location}</p>`)
    )
.addTo(map)

