Google-Maps-Point-in-Polygon
------------------------

A Javascript Google Maps v3 extension for the Polygon class to detect whether or not a point resides within it.

Usage:
------------------------
- Check if a LatLng object resides within the polygon.
```
var coordinate = new google.maps.LatLng(40, -90);                                                                                                                                                                                                       
var polygon = new google.maps.Polygon([], "#000000", 1, 1, "#336699", 0.3);
var isWithinPolygon = polygon.containsLatLng(coordinate);
```

- Or, check if a pair of lat,lng resides within the polygon without creating a Marker object

```
var polygon = new google.maps.Polygon([], "#000000", 1, 1, "#336699", 0.3);
var isWithinPolygon = polygon.containsLatLng(40, -90);
```

