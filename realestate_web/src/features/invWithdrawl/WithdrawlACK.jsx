import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    initLoader,
    acknowledgeWithdawlInfo as updatetype,
} from "./inv_withdrawl_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const WithdrawlACK = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const invwithdrawl = useSelector((state) => state.invwithdrawl);
    const [disabled, set_disabled] = useState(false);
    function updateAcknowledge(e) {
        e.preventDefault();
        dispatch(updatetype(data));
    }

    useEffect(() => {
        if (invwithdrawl.addUpdateLoading == "succeeded") {
            setTimeout(() => { set_disabled(false); setOpen(false); }, 2000);
        } else if (invwithdrawl.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [invwithdrawl.addUpdateLoading]);

    return <Modal title={("Submit Withdrawal Request")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sure, you want to submit this withdrawal request?")}
            </Flex>
        </Flex>
        <Flex row>
            <CardHeaderButton>
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
        </Flex>

    </Modal>
}