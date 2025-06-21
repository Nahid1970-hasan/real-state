import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteSubProjectInfo, initLoader,
} from "./create_sub_project_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const CreateSubViewDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const createsubproject = useSelector((state) => state.createsubproject);
    const [disabled, set_disabled] = useState(false);

    function deletecreatesubproject(e) {
        e.preventDefault();
        dispatch(deleteSubProjectInfo(data)); 
        set_disabled(true);
    }  

    useEffect(() => {
        if (createsubproject.addUpdateLoading == "succeeded") {  
            setTimeout(() => { set_disabled(false); setOpen(false); }, 3000)
        } else if (createsubproject.addUpdateLoading != "pending" && createsubproject.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false) }, 4000);
        }
    }, [createsubproject.addUpdateLoading]);

    return <Modal  title={("Delete Sub-project")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sue, you want to delete this sub-projects?")}
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
            <AlertButton disabled={disabled} onClick={deletecreatesubproject}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}