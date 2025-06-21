import { memo, useEffect, useState } from "react";
import { useContext, useRef } from "react";
import { GridContext } from ".";
import { Checkbox } from "../Checkbox";
import { Chip, ColorChip } from "../Chip";
import { IconButton } from "../IconButton";
import { CellItem } from "../style/Datagrid_styled";
import { Tooltip } from "../Tooltip";
import { Input } from "../style/Input_styled";
import { checkNumber, formatGridDate, formatGridDatetime, formatGridTimeStamp, numberWithCommas } from "../../utils/helper";
import { ErrLabel } from "../style/Label";
import { CustInputGrid } from "./CustInputGird";

export const GridRow = memo(({ row, index }) => {
 
  const rowRef = useRef(null);
  const [is_err, set_err] = useState("");

  const { rows, setRows, colums, selectable } = useContext(GridContext);
 
  function getRow(callback, e) { 
    let id = rowRef.current.innerText;
    callback(id, rows, e);
  }

  function updateCheckedRow(e) {
    setRows(rows => rows.map(d => d == row ? { ...d, checkbox: e.target.checked } : d));
  }

  function updateInputRow(e) { 
    var filedName = e.target.name; 
    setRows(rows => rows.map(d => d == row ? { ...d, [filedName]: e.target.value } : d));
    
  }
 
  return (
    colums.map((k, j) =>
    k.hide && !k.key?
    "":
    k.type == 'checkbox' ? (
        <CellItem key={j} width={'30px'} >
          <Checkbox size="sm" selectColor="inputFont" hoverColor={'girdHeader'} checked={row.checkbox} onClick={updateCheckedRow} />
        </CellItem>
      ): k.type == 'input' ? (
        <CellItem key={j} width={k.width }>
           <Input  type="text" marginTop={'0'} min={0} fontSize={"girdBodyFontSize"} minWidth={'60px'} maxWidth={'200px'} max={100} defaultValue={row[k.field]} maxLength={10}  name={k.field} onChange={updateInputRow} />
        </CellItem>
      ) :k.type == 'custinput' ? (
        <CellItem key={j} width={k.width }>
           <CustInputGrid rowdata={row}  inputType={k.inputType} placeholder={k.placeholder} field={k.field} fieldval={row[k.field]}/>
        </CellItem>
      ) :
        k.type == "custom" ? (
          <CellItem key={j} type={k.type} hide={k.hide} width={k.width } alignment={k.alignment}>
            <div>
              {
                typeof row[k.field] == 'function' ?
                  <IconButton type="button" color={k.color} onClick={row[k.field]}>
                    <span className="material-icons md-15">{k.icon}</span>
                  </IconButton> : <></>
              }
            </div>
          </CellItem>
        ) : k.type == "action" ? (
          <CellItem key={j} type={k.type} hide={k.hide} action = {row['action']??""} width={k.icons.length? (40*k.icons.length)+"px":"auto"} alignment={"center"}>
            <div>
              {k.icons.map((f, i) => {
               
                return !!k.descriptions ?
                  <Tooltip background={index%2!=0?'gridRowOdd':'gridBody'} position={'left'} color={"gridBodyFont"}  key={i} title={k.descriptions[i]}>
                    <IconButton
                      color={k.colors[i]}
                      onClick={(e) => row['action']?console.log("BLOCKED"):getRow(k.callBacks[i],e)}
                    >
                      <span className="material-icons md-18">{f}</span>
                    </IconButton>


                  </Tooltip>
                  :
                  <IconButton
                    key={i}
                    color={k.colors[i]}
                    onClick={() => row['action']?console.log("BLOCKED"):getRow(k.callBacks[i])}
                  >
                    <span className="material-icons md-18">{f}</span>
                  </IconButton>
              })}
            </div>
          </CellItem>
        ) : k.type == "custaction" ? (
          <CellItem key={j} type={k.type} hide={k.hide} action = {""} width={k.icons.length?(40*row['actiontype']?.reduce((a, b) => a + b, 0)||0)+"px":"auto"} alignment={"center"}>
            <div>
              {k.icons.map((f, i) => {
               
                return <Tooltip background={index%2!=0?'gridRowOdd':'gridBody'} position={'left'} color={"gridBodyFont"}  key={i} title={f?.hoverDesc||""}>
                    <IconButton
                      color={f?.color||"info"}
                      display={row['actiontype'][i]?"inline-flex":"none"}
                      onClick={() => row['actiontype'][i]?getRow(k.callBacks[i]):console.log("BLOCKED")}
                    >
                      <span className="material-icons md-18">{f?.icon||"info"}</span>
                    </IconButton> 
                  </Tooltip> 
              })}
            </div>
          </CellItem>
        ) : k.type == "state" ? (
          <CellItem key={j} type={k.type} hide={k.hide} width={k.width }>
            <div ref={k.key && rowRef}>
              <Chip label={row[k.field].label} color={row[k.field].color} />
            </div>
          </CellItem>):
           k.type == "color" ? (
            <CellItem key={j} type={k.type} hide={k.hide} width={k.width }>
              <div ref={k.key && rowRef}>
                  <ColorChip color={row[k.field]} />
              </div>
            </CellItem>)  : k.type == "number" ? (<CellItem key={j} type={k.type} width={k.width } fontSize={"girdBodyFontSize"} hide={k.hide} >
            <div ref={k.key && rowRef}>
              {!!k.decimals ?
                row[k.field].toFixed(k.decimals)
                : row[k.field]}
            </div>
          </CellItem>): k.type == "currency" ? (<CellItem key={j} type={k.type} alignment={k.alignment} width={k.width } fontSize={"girdBodyFontSize"} hide={k.hide} >
            <div ref={k.key && rowRef}>
              {numberWithCommas(!!k.decimals ?
                row[k.field].toFixed(k.decimals)
                : row[k.field])}
            </div>
          </CellItem>):k.type == "password" ? (<CellItem key={j} type={k.type} width={k.width } hide={k.hide} >
            <div ref={k.key && rowRef}>
              ********
            </div>
          </CellItem>)  : k.type == "board" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide} width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment} >
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---":row[k.field].length < 40 ? row[k.field]
                  : isNaN(row[k.field]) ? row[k.field].substr(0, 40) + "..." : row[k.field]
              }
              </div>
            </CellItem>
          ): k.type == "email" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide} width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment} >
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---":row[k.field].length < 23 ? row[k.field]
                  : isNaN(row[k.field]) ? row[k.field].substr(0, 20) + "..." : row[k.field]
              }
              </div>
            </CellItem>
          ): k.type == "date" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide}  width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined || !row[k.field] ?"---":row[k.field].length < 15 ? formatGridDate(row[k.field]): row[k.field]
              }
              </div>
            </CellItem>
          ): k.type == "datetime" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide}  width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined || !row[k.field] ?"---":row[k.field].length < 18 ? formatGridDatetime(row[k.field]): row[k.field]
              }
              </div>
            </CellItem>
          ):k.type == "timestamp" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide}  width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined || !row[k.field] ?"---":row[k.field].length == 19 ? formatGridTimeStamp(row[k.field]):row[k.field]
              }
              </div>
            </CellItem>
          ):
         
          (
            <CellItem key={j} type={k.type} hide={k.hide} width={k.width } overflow={"hidden"} fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---": row[k.field].length<1?"---":row[k.field]
                //:row[k.field].length < 160   ? row[k.field]
                //  : isNaN(row[k.field]) ? row[k.field].substr(0, 160) + "..." : row[k.field]
              }
              </div>
            </CellItem>
          )
    )
  );
});
