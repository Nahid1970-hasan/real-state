import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    submitCustAcknowledge as updatetype,
} from "./cust_payment_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";

export const CustpaymentAcknowledge = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const custPayment = useSelector((state) => state.custPayemntData);
    function updateAcknowledge(e) {
        e.preventDefault();
        dispatch(updatetype(data));
    }
    useEffect(() => {
        if (custPayment.addUpdateLoading == "succeeded") setOpen(false) 
    }, [custPayment.addUpdateLoading]);
    return <Modal  title={("Submit Customer Payment Request")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         {("Are you sure,you want to submit this Payment request?")}<br/>
         <Flex row>
         <CardHeaderButton top="5px">
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <PrimaryButton onClick={updateAcknowledge}>
            {("Yes")}
            </PrimaryButton>
        </CardHeaderButton>
         </Flex>
        
    </Modal>
}