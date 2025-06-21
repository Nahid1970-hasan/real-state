import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    initLoader,
    submitReleaseAcknowledge as updatetype,
} from "./inv_cash_release_Slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";

export const InvReleaseAckModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const invrelesae = useSelector((state) => state.invrelesae);

    function updateAcknowledge(e) {
        e.preventDefault();
        dispatch(updatetype(data));
    }
    useEffect(() => {
        if (invrelesae.addUpdateLoading == "succeeded")  {
            setTimeout(() => {setOpen(false), dispatch(initLoader()); }, 2000);}
    }, [invrelesae.addUpdateLoading]);

    return <Modal  title={("Submit Cash Release Request")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex md={12}>
        {("Are you sure, you want to submit this cash release request?")}
        </Flex>
        
         <Flex row>
         <CardHeaderButton >
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <PrimaryButton onClick={updateAcknowledge}>
            {("Yes")}
            </PrimaryButton>
        </CardHeaderButton>
         </Flex>
        
    </Modal>
}