
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    updateWalletInfo as updateWallet,
} from "./wallet_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const AddWalletModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const adminWallet = useSelector((state) => state.adminWallet);
    const [disabled, set_disabled] = useState(false);

    function updateWalletInfo(e) {
        e.preventDefault();
        dispatch(updateWallet(data));
        set_disabled(true);
    }

    useEffect(() => {
        if (adminWallet.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (adminWallet.addUpdateLoading != "idle") {
            setTimeout(() => {set_disabled(false);}, 3000);
        }
    }, [adminWallet.addUpdateLoading]);

    return <Modal title={("Submit Add Money in wallet")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
       
        <Flex row>
            <Flex md={12}>
                {("Are you sure, you want to add money in wallet?")}
            </Flex>
            <CardHeaderButton>
                <SecondaryButton
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    {("No")}
                </SecondaryButton>
                <AlertButton disabled={disabled} onClick={updateWalletInfo}>
                    {("Yes")}
                </AlertButton>
            </CardHeaderButton>
        </Flex>

    </Modal>
}