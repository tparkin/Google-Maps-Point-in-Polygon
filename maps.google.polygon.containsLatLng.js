// Poygon getBounds extension - google-maps-extensions
// http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
if (!google.maps.Polygon.prototype.getBounds) {
  google.maps.Polygon.prototype.getBounds = function(latLng) {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;
    
    for (var p = 0; p < paths.getLength(); p++) {
      path = paths.getAt(p);
      for (var i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
    }

    return bounds;
  }
}

// Polygon containsLatLng - method to determine if a latLng is within a polygon
google.maps.Polygon.prototype.containsLatLng = function(latLng) {
  // Exclude points outside of bounds as there is no way they are in the poly
 
  var lat, lng;

  //arguments are a pair of lat, lng variables
  if(arguments.length == 2) {
    if(typeof arguments[0]=="number" && typeof arguments[1]=="number") {
      lat = arguments[0];
      lng = arguments[1];
    }
  } else if (arguments.length == 1) {
    var bounds = this.getBounds();

    if(bounds != null && !bounds.contains(latLng)) {
      return false;
    }
    lat = latLng.lat();
    lng = latLng.lng();
  } else {
    console.log("Wrong number of inputs in google.maps.Polygon.prototype.contains.LatLng");
  }

  // Raycast point in polygon method
  var inPoly = false;

  var numPaths = this.getPaths().getLength();
  for(var p = 0; p < numPaths; p++) {
    var path = this.getPaths().getAt(p);
    var numPoints = path.getLength();
    var j = numPoints-1;

    for(var i=0; i < numPoints; i++) { 
      var vertex1 = path.getAt(i);
      var vertex2 = path.getAt(j);

      if (vertex1.lng() < lng && vertex2.lng() >= lng || vertex2.lng() < lng && vertex1.lng() >= lng) {
        if (vertex1.lat() + (lng - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < lat) {
          inPoly = !inPoly;
        }
      }

      j = i;
    }
  }

  return inPoly;
}
