import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteEmailConfig as deleteEmail, initLoader,
} from "./emailConfig_slice";;
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";

export const EmailConfigDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const emailConfig = useSelector((state) => state.emailConfig);
    const [disabled, set_disabled] = useState(false);

    function deleteEmailConfig(e) {
        e.preventDefault();
        dispatch(deleteEmail(data)); 
        set_disabled(true);
    } 
     
    useEffect(() => {
        if ( emailConfig.addUpdateLoading == "succeeded") { 
          setTimeout(() => { set_disabled(false); setOpen(false);}, 3000);
        }else if (emailConfig.addUpdateLoading !=  "idle" && emailConfig.addUpdateLoading !=  "pending"){ 
          setTimeout(() => { set_disabled(false);}, 4000);
        }
      }, [emailConfig.addUpdateLoading]);

    return <Modal  title={("Delete Email  Configuration")} xs={4} open={open} onClose={() => {setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sure you want to delete the Email configuration?")}
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
            <AlertButton disabled={disabled} onClick={deleteEmailConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}