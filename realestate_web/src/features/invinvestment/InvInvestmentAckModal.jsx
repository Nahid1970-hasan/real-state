import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    initLoader,
    submitInvestmentAcknowledge as updatetype,
} from "./inv_investment_Slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const InvInvestmentAckModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const investment = useSelector((state) => state.investment);
    const [disabled, set_disabled] = useState(false);

    function updateAcknowledge(e) {
        e.preventDefault();
        dispatch(updatetype(data));
        set_disabled(true);
    }

    useEffect(() => {
        if (investment.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (investment.addUpdateLoading != "idle") {
            setTimeout(() => {set_disabled(false);}, 3000);
        }
    }, [investment.addUpdateLoading]);

    return <Modal title={("Submit Investment Request")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
       
        <Flex row>
            <Flex md={12}>
                {("Are you sure, you want to submit this investment request?")}
            </Flex>
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