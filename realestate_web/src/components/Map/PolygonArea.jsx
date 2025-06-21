import { InfoWindow, InfoWindowF, MarkerF, OverlayViewF, PolygonF } from "@react-google-maps/api";
import React, { useState } from "react";
import InfoMarker from "./InfoMarker";
import { useEffect } from "react";

export default function PolygonArea({preview, data }) {

    return (<React.Fragment> 
        <PolygonF
            paths={data.location_json || []}
            options={
                {
                    strokeColor: data.color_code||'#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: data.color_code||'#FF0000',
                    fillOpacity: 0.35,
                }
            }
            onClick={() =>{
                
            }}
            visible={preview}
        > 
        </PolygonF>
      
        {data.location_json?.map((d, i) => (<InfoMarker key={i} clickable={false} data={d}></InfoMarker>))}
    </React.Fragment>);
}