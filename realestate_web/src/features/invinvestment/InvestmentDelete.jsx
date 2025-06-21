import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    DeleteInvestmentConfig as deletetype,
} from "./inv_investment_Slice";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";
import { useEffect } from "react";

export const InvestmentDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const investment = useSelector((state) => state.investment);
    const [disabled, set_disabled] = useState(false);

    function DeleteInvestmentConfig(e) {
        e.preventDefault();
        dispatch(deletetype(data)); 
        set_disabled(true);
    }

    useEffect(() => {
        if (investment.addUpdateLoading == "succeeded") {
            setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
        } else if (investment.addUpdateLoading != "idle") {
            setTimeout(() => {set_disabled(false);}, 3000);
        }
    }, [investment.addUpdateLoading]);


    return <Modal  title={("Delete Investment")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sure you want to delete the investment?")}
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
            <AlertButton disabled={disabled} onClick={DeleteInvestmentConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}