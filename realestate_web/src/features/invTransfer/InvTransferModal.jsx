import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    initLoader,
    updateInvtransferConfig as updatetype,
} from "./inv_transfer_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";

export const InvTransferModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const invtransfer = useSelector((state) => state.invtransfer);

    function updateTransfer(e) {
        e.preventDefault();
        dispatch(updatetype(data));
    }
    useEffect(() => {
        if (invtransfer.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false), dispatch(initLoader()); }, 2000);
        }
    }, [invtransfer.addUpdateLoading]);

    return <Modal title={("Confirm Transfer")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sure you want to transfer (this/all) project ?")}
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
            <AlertButton onClick={updateTransfer}>
                {("Yes")}
            </AlertButton>
        </CardHeaderButton>


    </Modal>
}