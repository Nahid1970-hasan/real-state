import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteMessageConfig as deleteMessage 
} from "./message_Slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const MessageDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const message = useSelector((state) => state.message);
    const [disabled, set_disabled] = useState(false);
    function deleteMessageConfig(e) {
        e.preventDefault();
        dispatch(deleteMessage(data)); 
    }
 
    useEffect(() => {
        if (message.addUpdateLoading == "succeeded") { 
           setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
       } else if (message.addUpdateLoading != "idle" && message.addUpdateLoading != "pending") { 
           setTimeout(() => { set_disabled(false); }, 4000);
       }
   }, [message.addUpdateLoading]);

    return <Modal  title={("Delete Message Template")} xs={4} open={open} onClose={() => { setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}> {("Are you sue, you want to delete message template?")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {t("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteMessageConfig}>
            {t("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}