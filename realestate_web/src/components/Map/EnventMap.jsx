import { CircleF, GoogleMap, InfoWindow, InfoWindowF, Marker, MarkerClustererF, PolygonF, useJsApiLoader } from "@react-google-maps/api";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { config } from "../../config/config";
import { addEventLoc } from "../../features/location/event_loc_slice";
import { Center } from "../style/Center_styled";
import { Loader } from "../style/Loader_styled";
import InfoMarker from "./InfoMarker";
import PolygonArea from "./PolygonArea";
const containerStyle = {
  width: '100%',
  height: '100%'
};


function EventMap({ center, eventArea, preview,pubview, polyColor, polygonArea, zoomratio,marker, mapOnlcik }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    mapIds:["7f2ade6b1310ae4f"],
    googleMapsApiKey: config.apiKey,//"AIzaSyDnSIX_v3UpYt3zRsYvHhB60JvQ0x6FdJo", https://maps.googleapis.com/maps/api/geocode/json?latlng=23.797724704739064,90.4015874593808&key=AIzaSyDnSIX_v3UpYt3zRsYvHhB60JvQ0x6FdJo
  });
 
  const [map, setMap] = useState(null);  
  const [zoom, setZoom] = useState(zoomratio ?? 10);
  const dispatch = useDispatch();
  const onLoad = useCallback((map) => { 
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);  
    setMap(map);  
    setTimeout(() => {map.setZoom(zoom);}, 1000);
  }, []);
 
  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);
 
  useEffect(() => {  
    if (map) { 
        const zoomA = map.getZoom();
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds); 
        map.setZoom(zoomA) 
    }
  }, [center])

  if (loadError) {
    return <Center>Map cannot be loaded right now, sorry.</Center>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6.8} 
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false, 
        disableDefaultUI: true,
        zoomControl: true,
        minZoom: 2,  
        fullscreenControl: true
      }}
      onClick = {mapOnlcik}
      // onClick={(e) => { 
      //   dispatch(addEventLoc({id:eventArea.length, lng: parseFloat(e.latLng.lng().toFixed(8)), lat: parseFloat(e.latLng.lat().toFixed(8))})); 
      // }}
    > 
    {
      <PolygonF
      paths={eventArea || []}
      options={
          {
              strokeColor: polyColor ?? "#FF0000" ,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: polyColor ?? "#FF0000",
              fillOpacity: 0.35,
          }
      }
      onClick={() =>{
          
      }}
      visible={eventArea.length!=0 && preview}
  > 
  </PolygonF>
    }
    {eventArea && eventArea?.map((d, i) => (<InfoMarker key={i} clickable={false} pubview={pubview??false} marker={marker ?? false} data={d}></InfoMarker>))}
    {polygonArea && polygonArea?.map((d, i) => ( <PolygonArea key={i} preview={preview} data={d}></PolygonArea>))}
    </GoogleMap>
  ) : (
    <Center>
      <Loader />
    </Center>
  );

 
}

export default memo(EventMap);;