import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteviewpayment as deletetype,
} from "./cust_payment_slice";

export const ViewPaymentDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    function deleteviewpayment(e) {
        e.preventDefault();
        dispatch(deletetype(data));
        setOpen(false);
    }
    return <Modal  title={("Delete Payment")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         {("Are you sure you want to delete the payment?")}
        <CardHeaderButton top="5px">
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {t("No")}
            </SecondaryButton>
            <AlertButton onClick={deleteviewpayment}>
            {t("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}