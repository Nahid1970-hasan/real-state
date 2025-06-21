import { memo, useContext, useEffect, useRef, useState } from "react";
import { Input } from "../style/Input_styled";
import { ErrLabel } from "../style/Label";
import { GridContext } from ".";
import { checkNumber } from "../../utils/helper";

export const CustInputGrid =memo(({rowdata, inputType, placeholder, field, fieldval}) => {
    const [is_err, set_err] = useState("");
    const rowRef = useRef(null);
    const { rows, setRows } = useContext(GridContext);
   
    function getRow(callback, e) { 
        let id = rowRef.current.innerText;
        callback(id, rows, e);
      }

    function updateCustInputRow(e , type){
        var filedName = e.target.name;  
        setRows(rows => rows.map(d => d == rowdata ? { ...d, [filedName]: e.target.value } : d)); 
      }
      function onkeydown(event){};
      function onNumberOnly(event){
        if(!checkNumber(event.key)){
          event.preventDefault();
        }
      }
    return (<>
           <Input  type="text" marginTop={'0'} onKeyDown={inputType=="number"?onNumberOnly : onkeydown} placeholder={placeholder||""} fontSize={"girdBodyFontSize"} minWidth={'60px'} maxWidth={'400px'} defaultValue={fieldval} name={field} onChange={(e)=>updateCustInputRow(e,inputType)} />
           <ErrLabel margin="0" fontSize="smFontBn">{is_err}</ErrLabel>
    </> 
    );})