import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux"
import { PrimaryButton } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Modal } from "../../components/Modal"
import { CardHeader, CardHeaderButton, InfoCard } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { selectModule, selectAllModule, updateUserRole } from "./userRole_slice";
import { useState } from "react";
import { Select } from "../../components/style/Select_styled";
import { Label } from "../../components/style/Label";

export const UserRolemodal = ({ open, setOpen, data }) => {

    const UserRole = useSelector(state => state.userrole);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [selectAll, setSelectAll] = useState(false);
    const [disabled, set_disabled] = useState(false);
    const [admin_type, set_admin_type] = useState("");

    useEffect(() => {
        if (UserRole.updateLoading != "pending" && UserRole.updateLoading != "idle") {
            setTimeout(() => { set_disabled(false); }, 3000);
        }
    }, [UserRole.updateLoading]);

    function handleChange(e) {
        var id = e.target.value;
        set_admin_type(id);
    }

    function updateRoleModule(e){
        e.preventDefault();
        var moduleList = UserRole?.list?.map((d) =>d.module_id==180?Object.assign({ ...d, sub_module: d.sub_module.reduce((a, b) => {  return  a.concat({ ...b, selected: admin_type==3?b.selected:0}); }, []),}):d);
        var rdata = {
            ...data,
            user_modules: moduleList,
            read_only: admin_type,
        }  
        dispatch(updateUserRole(rdata)); 
        set_disabled(true);
    }
    useEffect(() => { 
        set_admin_type(UserRole.read_only||"");
    }, [UserRole.read_only]);
 
    useEffect(() => {
        setSelectAll(UserRole?.list?.every((d) => d.sub_module?.every((b) => b.selected)))
    }, [UserRole.list]);

    return <>
        <Modal outsideclick md={6} sm={6} xs={10} open={open} setOpen={setOpen} onClose={() => { setOpen(false); }} title={"User Role Setup"}>
            <Flex row>
                <Flex padding="0 0 10px 0 !important" md={12}>
                    <CardHeaderButton>
                        <div style={{ display: "inline-flex", width:"280px" }}>
                            <Label margin="5px 0" style={{ width: "160px" }} >{"User Type"}</Label>
                            <Select
                                app
                                name="status"
                                onChange={handleChange}
                                value={admin_type || ""}
                            >
                                <option disabled value="">
                                    {("--Select Type")}
                                </option>
                                {UserRole.roleList.map((d,i)=><option key={i} value={d.role_value}>{d.role_name}</option>)} 
                            </Select> 
                        </div>
                        <div style={{ display: "inline-flex", margin:"0 8px" }}>
                            <Label margin="5px 0">{"Select All"}</Label>
                            <Checkbox id="readonly" size="md" hoverColor={'gridRowOdd'} checked={selectAll} onClick={(e) => (dispatch(selectAllModule(+e.target.checked)), setSelectAll(!selectAll))} />
                        </div> 
                        <PrimaryButton
                            disabled={disabled||admin_type==""}
                            type="button"
                            onClick={updateRoleModule}
                        >
                            {("Submit")}
                        </PrimaryButton> 
                    </CardHeaderButton>
                </Flex> 
            </Flex>
            <form>
                <Flex row>
                    {
                        UserRole.list.map((module, i) => (<Flex key={i} padding={"5px !important"} md={4} xs={12}>
                            <InfoCard >
                                <CardHeader bottom="10px">{module.module_name}</CardHeader>

                                {module.sub_module.map((sub, i) => (
                                    <div key={i} style={{ display: "flex" }}>
                                        {(module.module_id==180 && admin_type!=3)?<></>:<Checkbox size="sm" hoverColor={'primarySecendaryBorder'} onClick={(e) => dispatch(selectModule(e.target.id))} id={"select_" + module.module_id + "_" + sub.sub_module_id} checked={sub.selected} />}
                                        <label htmlFor={"select_" + module.module_id + "_" + sub.sub_module_id}>{sub.sub_module_name}</label>
                                    </div>
                                ))}


                            </InfoCard>
                        </Flex>))
                    }
                </Flex>

            </form>

        </Modal >
    </>
}
///(module.module_id==180 && admin_type!=0)?<></>: