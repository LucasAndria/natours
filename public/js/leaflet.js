export const displayMap = (locations) => {
  // option for the position of the map
  const options = {
    zoomControl: true,
    scrollWheelZoom: false
  };

  // Create leaflet interface and controller
  const map = L.map('map', options);

  // Add tile layer to the map (using openstreetmap)
  const tileLayer = L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
    {
      foo: 'bar',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  ).addTo(map);

  // // Add tile layer (using maptiler)
  // const tileLayer = L.tileLayer(
  //   `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${process.env.TILE_LAYER_KEY}`,
  //   {
  //     attribution:
  //       '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
  //   }
  // ).addTo(map);

  const bounds = L.latLngBounds(
    locations.map((el) => {
      // console.log(el.coordinates.reverse());
      return el.coordinates.reverse();
    })
  );

  locations.forEach((loc) => {
    // Add marker
    let marker = L.marker(loc.coordinates, {
      color: '#55c57a'
    }).addTo(map);

    marker.bindPopup(`<h2>Day ${loc.day}: ${loc.description}</h2>`).addTo(map);
  });

  map.fitBounds(bounds, {
    padding: [100, 100]
  });
};
