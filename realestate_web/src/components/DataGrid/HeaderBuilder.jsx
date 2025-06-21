import { GridContext } from ".";

import { CellItem } from "../style/Datagrid_styled";
import { useContext, useState } from "react";
import { IconButton } from "../IconButton";
import { Tooltip } from "../Tooltip";
import { Checkbox } from "../Checkbox";
import { useEffect } from "react";
import { memo } from "react"; 
import { useTranslation } from "react-i18next";

export const HeaderBuilder = memo(() => { 
  const { mainSelect, setMainSelect, setRows, rows, colums, sortGrid, asc } = useContext(GridContext);
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (mainSelect == 1) {
      //setSelectIds(rows.map(d => d[colums.find(d => d.key).field]))
      setRows(rows => rows.map(d => ({ ...d, checkbox: true })));
    }
    else if (mainSelect == 0) {
      //setSelectIds([])
      setRows(rows => rows.map(d => ({ ...d, checkbox: false })));
    }
  }, [mainSelect ])

  useEffect(() => {
    var largeVal = rows?.map((d)=>!d?.actiontype?0:d?.actiontype.reduce((a,b) => a + b, 0)).sort((a,b)=>a-b)[rows.length - 1]||0; 
    setCount(largeVal);
  }, [rows ])

  return colums.map((header, i) => (
    header.hide && !header.key?
    "":
    <CellItem style={{ width: header.type == "checkbox" ? "30px" : header.type == "action" ? header.icons.length<2?"80px":header.icons.length? (40*header.icons.length)+"px":"auto": header.width ? header.width : header.type == "custaction" ? count<2?"80px":header.icons.length? (40*count)+"px":"auto" : "auto"}} key={i} alignment={header.type == "action" || header.type == "custaction" ?'center':header.alignment} type={header.type} hide={header.hide} fontSize={"girdHeaderFontSize"} onClick={(e) => (header.type != "custom" && header.type != "action" && header.type != "custaction" && header.sortable != false) && sortGrid(i)}>
    
      {header.type == "checkbox" ?
        <Checkbox size="sm" selectColor="primaryFont" hoverColor={'gridRowOdd'} checked={mainSelect} onClick={(e) => { setMainSelect(+e.target.checked) }} />
        :
        <div>
          {header.description ?
            <Tooltip position={i==(colums.length-(colums[colums.length-1].type=='action'?2:1))?'left':'bottom'} background={'girdHeader'} color={"girdHeaderFont"} headerTitle={'girdHeaderFontSize'} title={t(header.description)}>{t(header.headerName)}</Tooltip>
            :t(header.headerName)
          }
          {/* {header.type != "action"?<>&nbsp;</>:<></>}  */}
          {
            (header.type != "custom" && header.type != "action" && header.type != "custaction" && header.sortable != false) &&

            (<div style={{ display: "flex", marginBottom:"-4px" }}>
              <div className={asc[i] == null ? "" : "show"}>
                <IconButton key={i} onClick={(e) => {}}>
                  {(asc[i] == true || asc[i] == null) ?
                    (<span className="material-icons md-15">arrow_upward</span>) :
                    (<span className="material-icons md-15">arrow_downward</span>)
                  }
                </IconButton>
              </div>
              {/* <div>
              <IconButton>
                <span className="material-icons md-15">more_vert</span>
              </IconButton>
            </div> */}
            </div>)
          }
        </div>}
    </CellItem>)
  );
});
