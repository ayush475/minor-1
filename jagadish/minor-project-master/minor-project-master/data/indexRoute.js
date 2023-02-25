// center of the map
var center = [-33.8650, 151.2094];

let map = L.map("map").setView([27.7293,85.3343], 8);
  
// Set up the OSM layer
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);



// add a marker in the given location
let marker=L.marker([27.694814, 85.320202]).addTo(map);
map.flyTo(marker.getLatLng(), 18);


// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

// define custom marker
var MyCustomMarker = L.Icon.extend({
  options: {
    shadowUrl: null,
    iconAnchor: new L.Point(12, 12),
    iconSize: new L.Point(24, 24),
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Information_icon4_orange.svg'
  }
});

var drawPluginOptions = {
  position: 'topright',
  draw: {
    polyline: {
      shapeOptions: {
        color: '#f357a1',
        weight: 10
      }
    },
    // polygon: {
    //   allowIntersection: false, // Restricts shapes to simple polygons
    //   drawError: {
    //     color: '#e1e100', // Color the shape will turn when intersects
    //     message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)' // Message that will show when intersect
    //   },
    //   shapeOptions: {
    //     color: '#bada55'
    //   }
    // },
    // circle: false, // Turns off this drawing tool
    // rectangle: {
    //   shapeOptions: {
    //     clickable: false
    //   }
    // },
    marker: {
      icon: new MyCustomMarker()
    }
  },
  edit: {
    featureGroup: editableLayers, //REQUIRED!!
    remove: false
  }
};





// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);


var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);




map.on('draw:created', function(e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === 'marker') {
    layer.bindPopup('A popup!');
  }
  console.log(layer.getLatLngs(),"dddd")

  editableLayers.addLayer(layer);
});


document.getElementById('submit-route').addEventListener('click',()=>{
    console.log("done lolololo");
    document.getElementById('sucess-notification').style.display="block";
    // window.location='/route/sucess'
  })
