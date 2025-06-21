import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteMilestoneSetup as deleteMilestone,
} from "./milestonesetup_slice";;
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";

export const MileStoneDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const milestonesetup = useSelector((state) => state.milestonesetup);
    const [disabled, set_disabled] = useState(false);

    function deleteMilestoneSetup(e) {
        e.preventDefault();
        dispatch(deleteMilestone(data)); 
        set_disabled(true);
    } 
    

      useEffect(() => {
        if ( milestonesetup.addUpdateLoading == "succeeded") {  
            setTimeout(() => {set_disabled(false); setOpen(false); }, 3000);
          }else if (milestonesetup.addUpdateLoading !=  "idle" && milestonesetup.addUpdateLoading != "pending"){ 
            setTimeout(() => { set_disabled(false)}, 4000);
          }
    }, [milestonesetup.addUpdateLoading]);

    return <Modal  title={("Delete Milestone")} xs={4} open={open} onClose={() => {setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sue, you want to delete this milestone?")}
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