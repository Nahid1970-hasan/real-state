import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    initLoader,
    submitAckAdminWallet as updatetAck,
} from "./wallet_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const WalletACkModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const adminWallet = useSelector((state) => state.adminWallet);
    const [disabled, set_disabled] = useState(false);

    function submitAckAdminWallet(e) {
        e.preventDefault();
        dispatch(updatetAck(data));
        set_disabled(true);
    }

    useEffect(() => {
        if (adminWallet.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (adminWallet.addUpdateLoading != "idle") {
            setTimeout(() => {set_disabled(false);}, 3000);
        }
    }, [adminWallet.addUpdateLoading]);

    return <Modal title={("Submit Add Money Request")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
       
        <Flex row>
            <Flex md={12}>
                {("Are you sure, you want to submit this add money request?")}
            </Flex>
            <CardHeaderButton>
                <SecondaryButton
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    {("No")}
                </SecondaryButton>
                <AlertButton disabled={disabled} onClick={submitAckAdminWallet}>
                    {("Yes")}
                </AlertButton>
            </CardHeaderButton>
        </Flex>

    </Modal>
}