import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteRegReq as deleteReq,
} from "./reg_req_Slice";

export const RequestDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    function deleteRegReq(e) {
        e.preventDefault();
        dispatch(deleteReq(data));
        setOpen(false);
    }
    return <Modal  title={("Delete Registration Request")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         {("Are you sure you want to delete the registration info?")}
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {t("No")}
            </SecondaryButton>
            <AlertButton onClick={deleteRegReq}>
            {t("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}