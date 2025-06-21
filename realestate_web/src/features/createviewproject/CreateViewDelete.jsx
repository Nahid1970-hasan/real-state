import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteProjectInfo, initLoader
} from "./create_project_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const CreateprojectDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const createproject = useSelector((state) => state.createproject);
    const [disabled, set_disabled] = useState(false);

    function deleteCreateProject(e) {
        e.preventDefault();
        dispatch(deleteProjectInfo(data)); 
    }
 

    useEffect(() => {
        if (createproject.addUpdateLoading == "succeeded") { 
            setTimeout(() => {set_disabled(false); setOpen(false) },3000);
        } else if (createproject.addUpdateLoading != "idle" && createproject.addUpdateLoading != "pending") { 
            setTimeout(() => {set_disabled(false); }, 4000);
        }
    }, [createproject.addUpdateLoading]);

    return <Modal  title={("Delete Project")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex row>
            <Flex md={12}> {("Are you sure, want to delete this project?")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteCreateProject}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}