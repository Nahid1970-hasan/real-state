import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    submitInvAcknowledge as updatetype,
} from "./inv_payment_Slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const InvPaymentAckModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const invpayment = useSelector((state) => state.invpayment);
    const [disabled, set_disabled] = useState(false);

    function updateAcknowledge(e) {
        e.preventDefault();
        dispatch(updatetype(data));
        set_disabled(true);
    }
    
    useEffect(() => {
        if (invpayment.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (invpayment.addUpdateLoading != "idle" && invpayment.addUpdateLoading != "pending") {
            setTimeout(() => {set_disabled(false);}, 4000);
        }
    }, [invpayment.addUpdateLoading]);

    return <Modal  title={("Submit Payment Request")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         <Flex row>
            <Flex padding={"0 0 10px 0 !important"} md={12}>
            {"Are you sure, you want to submit this Payment request?"}
            </Flex>
        </Flex>
       
         
         <CardHeaderButton >
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <PrimaryButton disabled={disabled} onClick={updateAcknowledge}>
            {("Yes")}
            </PrimaryButton>
        </CardHeaderButton>
        
        
    </Modal>
}