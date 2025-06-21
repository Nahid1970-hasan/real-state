import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteSMSConfig as deleteSMS, initLoader,
} from "./smsConfig_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const SMSConfigDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const smsConfig = useSelector((state) => state.smsConfig);
    const [disabled, set_disabled] = useState(false); 
    function deleteSMSConfig(e) {
        e.preventDefault();
        dispatch(deleteSMS(data)); 
        set_disabled(true);
    } 
    useEffect(() => {
        if ( smsConfig.addUpdateLoading == "succeeded") {
          setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
        } else if (smsConfig.addUpdateLoading != "idle" && smsConfig.addUpdateLoading !=  "pending") {
          setTimeout(() => { set_disabled(false) }, 4000);
        }
      }, [smsConfig.addUpdateLoading]);
     

    return <Modal   title={("Delete SMS Configuration")} xs={4} open={open} onClose={() => {setOpen(false); }} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sure you want to delete the SMS configuration?")}
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
            <AlertButton disabled={disabled} onClick={deleteSMSConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}