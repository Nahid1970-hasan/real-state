import { InfoWindow, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useState } from "react";

export default function  InfoMarker({pubview,data,marker}) {
    const symbolOne = {
      path: "M -2,0 0,-2 2,0 0,2 z",
      strokeColor: "#F00",
      fillColor: "#F00",
      fillOpacity: 1,
    }
    const [infoOpen, setInfoOpen] = useState(false);
    return (<React.Fragment> 

        <MarkerF onClick={() => setInfoOpen(!infoOpen)} icon={marker?"":symbolOne} options={{}} animation={google.maps.Animation.DROP} title={data.lat+"-"+data.lng} position={data}>
            { marker && infoOpen && <InfoWindowF >
                {
                  pubview? <div style={{border:"2px solid",borderRadius:"5px", padding:"10px", color:"#000000", background:"#eefff6"}}>
                  <span>{"Name: "+data.station_name}</span> <br/>
                  <span>{"Sunrise: "+data.sunrise}</span> <br/>
                  <span>{"Sunset: "+data.sunset}</span> <br/>
                  <span>{"LatLng: "+data.lat+","+data.lng}</span></div>:<div style={{border:"2px solid",borderRadius:"5px", padding:"10px", color:"#000000", background:"#eefff6"}}>
                  <span>{"Name: "+data.district_name_en +"( "+data.district_name_bn+" )"}</span> <br/>
                <span>{"LatLng: "+data.lat+","+data.lng}</span></div>
                }
              </InfoWindowF>}  
          </MarkerF> 
        </React.Fragment>)
}