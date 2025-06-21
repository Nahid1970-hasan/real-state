import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteAdminWallet as deletetype,
} from "./wallet_slice";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";
import { useEffect } from "react";

export const WalletDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const adminWallet = useSelector((state) => state.adminWallet);
    const [disabled, set_disabled] = useState(false);

    function deleteAdminWallet(e) {
        e.preventDefault();
        dispatch(deletetype(data)); 
        set_disabled(true);
    }

    useEffect(() => {
        if (adminWallet.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (adminWallet.addUpdateLoading != "idle") {
            setTimeout(() => {set_disabled(false);}, 3000);
        }
    }, [adminWallet.addUpdateLoading]);


    return <Modal  title={("Delete Add Money")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sure you want to delete the add money?")}
            </Flex>
        </Flex>
        <CardHeaderButton top="5px">
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteAdminWallet}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}