import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteInvPayment as deletetype,
} from "./inv_payment_Slice";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";
import { useEffect } from "react";

export const InvPaymentDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const invpayment = useSelector((state) => state.invpayment);
    const [disabled, set_disabled] = useState(false);

    function deleteInvPayment(e) {
        e.preventDefault();
        dispatch(deletetype(data));
        set_disabled(true);
    }

    useEffect(() => {
        if (invpayment.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (invpayment.addUpdateLoading != "idle" && invpayment.addUpdateLoading != "pending") {
            setTimeout(() => {set_disabled(false);}, 4000);
        }
    }, [invpayment.addUpdateLoading]);



    return <Modal  title={("Delete Payment")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex row>
            <Flex  md={12}>
                {("Are you sure, you want to delete the payment?")}
            </Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {t("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteInvPayment}>
            {t("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}