import { Center } from "./style/Center_styled";

export const EmptyBox = ({ msg, height="100px" }) => {
    return <div style={{  justifyContent: 'center', alignItems:'center',color:"#4e4b4b", display:'inline-flex', width: '100%', height: height }}>
        {msg||"There is no data to show"} 
    </div>;
}
