import { useRef, useState } from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, DownloadButton, PrimaryButton } from "../../components/Button"
import { Flex } from "../../components/style/Flex_styled"
import { Select } from "../../components/style/Select_styled"

import UnAuthorized from "../../pages/UnAuthorized"
import { Label } from "../../components/style/Label"
import { loadProgress, submitcusprojectConfig } from "./progress_Slice"
import { ViewProgressGrid } from "./ViewProgressGrid"
import { Loading } from "../../components/Loading"

export const ProgressDropdown = () => {
    const dprogress = useSelector(state => state.dprogress);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [pro_type_id, set_pro_type_id] = useState(1);
    const dropDownRef = useRef(null);
    const [get_value, set_value] = useState(0);
    const [viewOpen, setViewOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [remove, setRemove] = useState(false);
    const [user_id, set_user_id] = useState(0);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [sub_project_id, set_sub_project_id] = useState(1);
    useEffect(() => {
        //setIsLoading(true);
        //dispatch(loadProgress());
    }, []);
    
    function submitExternal(e) {
        setIsLoading(true);
        e.preventDefault();
        setOpen(true);
        let data = {
            sub_project_id: get_value,
        };
       // dispatch(submitcusprojectConfig(data));
    }
    useEffect(() => {
        dprogress.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
      }, [dprogress.loading]);
    

      useEffect(() => {
        dprogress.updateloading == "succeeded" && dispatch(loadProgress());
      }, [dprogress.updateloading]);

    return dprogress.loading === "unauthorized" ? (
        <UnAuthorized />
    ) :

        (
            <>
                <Flex row>
                    <Flex padding="0 !important" md={1} sm={4} xs={8}>
                        <Label color="font">Select project</Label>
                    </Flex>
                    <Flex padding="0 0 0 10px !important" md={3} sm={4} xs={8}>

                        <Select app onChange={(d)=>set_sub_project_id(d.target.value)}>
                            <option disabled> {("select dprogress")}</option>
                            {
                                dprogress.list.map((d, i) => (<option key={i} value={d.project_id}> {d.project_name}</option>))
                            }
                        </Select>
                    </Flex>
                    <Flex padding="0 10px 0 0" md={7} sm={8} xs={4}>
                        <DownloadButton margin="4px" onClick={submitExternal}>{("Submit")}</DownloadButton>
                    </Flex>
                    <Flex padding="10px 0 0 0 !impotant" md={12}>
                        <ViewProgressGrid setRemove={setRemove} set_user_id={set_user_id} setViewOpen={setViewOpen} setOpen={setOpen} setUserData={setUserData} pro_type_id={pro_type_id} />
                    </Flex>
                </Flex>


                <Loading open={isLoading}/>
            </>
        )

}
