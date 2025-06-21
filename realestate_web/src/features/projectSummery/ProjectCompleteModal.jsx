import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
 
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";
import { updateSummeryConfig } from "./project_summery_Slice";

export const ProjectCompleteModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const prosummary = useSelector(state => state.prosummary);
    const [disabled, set_disabled] = useState(false);

    function deleteMilestoneSetup(e) {
        e.preventDefault();
        dispatch(updateSummeryConfig(data)); 
        set_disabled(true);
        console.log(data);
    } 
    

      useEffect(() => {
        if ( prosummary.addUpdateLoading == "succeeded") {  
            setTimeout(() => {set_disabled(false); setOpen(false); }, 3000);
          }else if (prosummary.addUpdateLoading !=  "idle" && prosummary.addUpdateLoading != "pending"){ 
            setTimeout(() => { set_disabled(false)}, 4000);
          }
    }, [prosummary.addUpdateLoading]);

    return <Modal  title={("Complete Project")} xs={4} open={open} onClose={() => {setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sue, you want to complete this project? ")}
            </Flex> 
        </Flex>
      
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteMilestoneSetup}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}