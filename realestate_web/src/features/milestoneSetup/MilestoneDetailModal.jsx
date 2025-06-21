import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Input } from "../../components/style/Input_styled";
import { saveMilestoneDetail, subMilestoneInit } from "./milestonesetup_slice";
import DataGrid from "../../components/DataGrid";
import { DateTime } from "luxon";

export const MilestoneDetailModal = ({ add, open, setOpen = () => { }, data }) => {
    const milestonesetup = useSelector((state) => state.milestonesetup);
    const dispatch = useDispatch();
    const [dataRow, setDataRow] = useState([]);
    const [rows, setRows] = useState([]);
    const [disabled, set_disabled] = useState(false);
    const [pcn_erro, set_pcn_err] = useState("");
    const [total_sum, set_total_sum] = useState(0);

    function getAllRows(allrows) { 
        setDataRow(allrows);  
        var total= allrows.map((d) => parseInt(d?.work_percent||0)).reduce((a, b) => a + b, 0)||0; 
        var allow = allrows.map((d)=> +(parseInt(d.work_percent||0)==0)).find((b)=>b>0); 
        set_total_sum(total);
        set_disabled(allrows.length<1 || allow>0);
        set_pcn_err(allrows.length<1?null:allow>0?"Please fill up works(%) field with positive value":total==100?null:"Sum of Sub works(%) must be 100");  
    }

    useEffect(() => {
        var rowsDt= milestonesetup?.infolist?.map((d) => ({
            ...d, 
            actiontype: [d.sub_id==milestonesetup?.infolist.length]
          })) || [];
        setRows(rowsDt || [])
    }, [milestonesetup?.infolist]);
  
    const submitForm = () => { 
        var total= dataRow.map((d) => parseInt(d?.work_percent)).reduce((a, b) => a + b, 0)||0;
        var allow = dataRow.map((d)=>+(parseInt(d.work_percent||0)==0)).find((b)=>b>0);
        if(allow){
            set_pcn_err("Please fill up works(%) field with positive value")
        }else{
            set_pcn_err(null);
            if(total==100 ){ 
                var detail_json = {
                    detail_json: dataRow.map((d,i)=>Object.assign({...d,sub_id:i+1})),
                    project_id: data.project_id,
                    milestone_id: data.milestone_id
                }
                dispatch(saveMilestoneDetail(detail_json));
                set_disabled(true);
            }else{
                set_pcn_err("Sum of Sub works(%) must be 100")
            } 
        }
    };

    
    let newRow = {
        "sub_id": rows.length + 1,
        "works_detail": "",
        "work_percent": 100, 
        "complete_date": "",
        "actiontype":[true]
    }
 
    const fnAddNewOption = () =>{ 
       if(dataRow.length<11){
        set_pcn_err(null);
        var dataR = dataRow.map((d)=>({...d, actiontype: [false]})); 
        setRows(dataR.concat(newRow));
       }else{
        set_pcn_err("Maximum 10 sub-works are allowed.")
       }
    }

    const colums = [
        {
            headerName: "SL#",
            field: "sub_id",
            key: true,
            type: "number",
            sortable: false,
            width: "40px"
        },
        {
            headerName: "Work Details",
            field: "works_detail",
            description: "Work Details",
            type: "custinput",
            placeholder:"type work details..",
            inputwidth: "300px",
            width: "300px"
        },
        {
            headerName: "Works (%)",
            field: "work_percent",
            description: "Work Percentage",
            type: "custinput",
            inputType:"number",
            inputwidth: "80px",
            width: "90px"
        },
        {
            headerName: "Completed Date",
            field: "complete_date",
            description: "Completed Date",
            type: "custinput", 
            placeholder:"yyyy-MM-dd",
            inputwidth: "100px",
            width: "120px"
        },
        {
            headerName: ("action"),
            field: "", 
            type: "custaction",
            icons: [
              {
                icon: "delete",
                color: "error",
                hoverDesc: "Delete"
              }, 
            ],
            callBacks: [
                (sub_id) => {
                    var dataR = dataRow.filter((d) => d.sub_id != sub_id);
                    var fnData = dataR.map((d)=>({...d, actiontype: [d.sub_id==dataR.length]}));
                    setRows(fnData);
                },
            ],
          } 
    ];

    const columsView = [
        {
            headerName: "SL#",
            field: "sub_id",
            key: true,
            hide: true,
            type: "number",
            sortable: false,
            width: "40px"
        },
        {
            headerName: "Work Details",
            field: "works_detail",
            description: "Work Details",
            sortable: false,
            type: "String",  
        },
        {
            headerName: "Works (%)",
            field: "work_percent",
            description: "Work Percentage",
            sortable: false,
            type: "number", 
            width: "110px"
        },
        {
            headerName: "Completed Date",
            field: "complete_date",
            description: "Completed Date",
            type: "string",  
            width: "160px"
        }, 
    ];

    useEffect(() => {
        if (milestonesetup.addUpdateLoading == "succeeded") { 
            setTimeout(() => {  dispatch(subMilestoneInit()); setOpen(false); set_disabled(false);}, 3000);
        } else if (milestonesetup.addUpdateLoading != "pending" && milestonesetup.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false) }, 4000);
        }
    }, [milestonesetup.addUpdateLoading]);

    return (
        <>
            <Modal
                md={8}
                sm={10}
                xs={12}
                title={("Milestone Detail")}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                outsideclick
            >
                <Flex md={12} padding="0 !important">
                    <Flex row>
                        <Flex padding="0 !important" md={2}>
                            <Label color="font">Project Name</Label>
                        </Flex>
                        <Flex padding="0 !important" md={10}>
                            <Input
                                app
                                type="text"
                                name="project_name"
                                placeholder={("")}
                                value={data?.project_name || "----"}
                                disabled
                            />

                        </Flex>

                    </Flex>
                    <Flex row>
                        <Flex padding="0 !important" md={2}>
                            <Label color="font">Major Works</Label>
                        </Flex>
                        <Flex padding="0 !important" md={10}>
                            <Input
                                app
                                type="text"
                                name="major_works"
                                placeholder={(" ")}
                                value={data?.major_works || "----"}
                                disabled
                            />
                        </Flex>

                    </Flex>
                    <Flex row>
                       
                            {data?.status!="Completed"? <Flex padding={"0 !important"} md={12}><CardHeaderButton style={{ marginTop: "20px" }}> 
                                <PrimaryButton
                                    type="button" 
                                    disabled={rows.length==10}
                                    onClick={fnAddNewOption}>
                                    {("Add New Sub-works")}
                                </PrimaryButton>
                            </CardHeaderButton> </Flex>:<></>}
                       
                        <Flex padding={"10px 10px !important"} md={12}>
                            <CardBody>
                                <DataGrid colums={data?.status=="Completed"?columsView:colums} rows={rows} getAllRows={getAllRows} />
                                {pcn_erro? <ErrLabel>{pcn_erro}</ErrLabel> :<></>}
                               
                            </CardBody>
                        </Flex>
                    </Flex>

                    <CardHeaderButton style={{ marginTop: "10px" }}>
                        {
                            data?.status!="Completed"? 
                        <PrimaryButton
                            type="button"
                            className={disabled ? "disabled-btn" : ""}
                            onClick={submitForm} disabled={disabled || pcn_erro=="length" || total_sum!=100} >
                            {("Submit")}
                        </PrimaryButton>:<></> }
                    </CardHeaderButton>
                </Flex>
            </Modal>
        </>
    );
};
