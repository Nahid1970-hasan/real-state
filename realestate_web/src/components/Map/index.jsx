import { CircleF, GoogleMap, Marker, MarkerClustererF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { config } from "../../config/config";
import { Center } from "../style/Center_styled";
import { Loader } from "../style/Loader_styled";
const containerStyle = {
  width: '100%',
  height: '100%'
};


function Map({ marker, isMarker, setMarket, radius, locationRows, zoomratio }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    mapIds:["7f2ade6b1310ae4f"],
    googleMapsApiKey: config.apiKey,// https://maps.googleapis.com/maps/api/geocode/json?latlng=23.797724704739064,90.4015874593808&key=A6FdJo
  });

  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(zoomratio ?? 10);

  const onLoad = useCallback((map) => {
    //console.log(map);
   // var featureLayer = map.getFeatureLayer("LOCALITY");
   // console.log(featureLayer);
  // Define a style with purple fill and border.
  //@ts-ignore
    // const featureStyleOptions = {
    //   strokeColor: "#810FCB",
    //   strokeOpacity: 1.0,
    //   strokeWeight: 3.0,
    //   fillColor: "#810FCB",
    //   fillOpacity: 0.5,
    // };

    // Apply the style to a single boundary.
    //@ts-ignore
    // featureLayer.style = (options) => {
    //   if (options.feature.placeId == "ChIJ0zQtYiWsVHkRk8lRoB1RNPo") {
    //     // Hana, HI
    //     return featureStyleOptions;
    //   }
    // };
    const bounds = new window.google.maps.LatLngBounds(marker);
    map.fitBounds(bounds);
    const triangleCoords = [
      { lat: 23.897267, lng: 90.200609 },
      
      { lat: 23.907044, lng: 90.386291 },
      {lat:23.869789, lng:90.461027},
      { lat: 23.724050, lng: 90.338504 }, 
     
    ];
    // Construct the polygon.
    const bermudaTriangle = new window.google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    });
  
    //bermudaTriangle.setMap(map);
    setMap(map); 
    setTimeout(() => map.setZoom(zoom), 1000)
  }, []);
 
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius,
    zIndex: 1
  }

  const selectedOptions = {
    strokeColor: '#0000ff',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#0000ff',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1
  }

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);
 
  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds(marker);
      map.fitBounds(bounds);
      // console.log(map);
      map.setZoom(zoom);

      //@ts-ignore
  
    
    }
  }, [marker])

  if (loadError) {
    return <Center>Map cannot be loaded right now, sorry.</Center>;
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker}
      zoom={6.8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false, disableDefaultUI: true,
        zoomControl: true,
        minZoom: 2, 
       // mapId: "7f2ade6b1310ae4f",
        fullscreenControl: true
      }}
      onClick={(e) => { 
        setZoom(map.zoom);
        setMarket({ lng: e.latLng.lng(), lat: e.latLng.lat()  });
        // Geocode.fromLatLng(e.latLng.lat(),e.latLng.lng()).then(
        //   (response) => {
        //     const address1 = response.results[0].address_components[1].long_name;
        //     const address2 = response.results[0].address_components[2].long_name;
        //     console.log(address1);
        //     console.log(address2);
        //   },
        //   (error) => {
        //     console.error(error);
        //   }
        // );
        //console.log({ lng: e.latLng.lng(), lat: e.latLng.lat() });
      }}
    >
      {isMarker && <MarkerF
        onLoad={(mar) => {
          console.log('marker: ',marker )
        }}
        title={marker.lat.toFixed(8)+"-"+marker.lng.toFixed(8)}
        position={marker} />}

      {
        locationRows.map((d, i) => (<React.Fragment key={i + 1}>
          <MarkerF key={i} options={{}} animation="DROP" title={d.name ?? marker.lat.toFixed(8)+"-"+marker.lng.toFixed(8)} position={d} />
          <CircleF
            key={i + "circle"}
            // requiredPP
            center={d}
            // required
            options={{ ...selectedOptions, radius: d.radius * 1000 }}
          />
        </React.Fragment>))
      }

      {isMarker && <CircleF
        // requiredPP
        center={marker}
        // required
        options={options}
      />}
    </GoogleMap>
  ) : (
    <Center>
      <Loader />
    </Center>
  );

 
}

export default memo(Map);

         
 //         {"place_id" : "ChIJRf0h8AO5VTcR62cTS3TcQ4o",
  //        "types" : [ "administrative_area_level_1", "political" ],

  //        "place_id" : "ChIJp4vhgO2qrTARa_zhxOAoLQ8",
  //        "types" : [ "country", "political" ],

  //        "place_id" : "ChIJgWsCh7C4VTcRwgRZ3btjpY8",
  //        "types" : [ "locality", "political" ],

  //        "place_id" : "ChIJ24EIPYXHVTcR_IFU_muFPyQ",
  //        "types" : [ "postal_code" ],

  //        "place_id" : "EiIxMjUgUmQgTnVtYmVyIDQsIERoYWthLCBCYW5nbGFkZXNoIhoSGAoUChIJh_y0ERDHVTcR8pZNpMCeJA4QfQ",
  //        "types" : [ "street_address" ],
  
  //        "place_id" : "ChIJk1axaRDHVTcRCDDixEojeZQ",
  //        "types" : [ "route" ]}