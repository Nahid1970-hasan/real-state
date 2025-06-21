import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteRegistration as deleteReg,
} from "./stack_registration_slice";
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";
import { useState } from "react";

export const StackRegistrationDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState();
    const stackRegData = useSelector((state) => state.stackRegistration);
    function deleteRegistration(e) {
        e.preventDefault();
        dispatch(deleteReg(data)); 
        set_disabled(true);
    }
    useEffect(() => {
        if (stackRegData.addUpdateLoading == "succeeded") { 
            setTimeout(() => {setOpen(false); set_disabled(false); }, 2000);
        }else if (stackRegData.addUpdateLoading != "pending" && stackRegData.addUpdateLoading != "idle"){
            setTimeout(() => { set_disabled(false); }, 5000);
        } 
    }, [stackRegData.addUpdateLoading]);

    return <Modal   title={("Delete Registration Information")} xs={4} open={open} onClose={() => {setOpen(false); }} outsideclick>
       <Flex row>
            <Flex md={12}>
                {("Are you sure you want to delete the registration info?")}
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
            <AlertButton  disabled={disabled} onClick={deleteRegistration}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}