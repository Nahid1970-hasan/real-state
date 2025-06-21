import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    DeleteInvRelesaeConfig as deletetype,
} from "./inv_cash_release_Slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const InvCashReleaseDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState(false);
    const invrelesae = useSelector((state) => state.invrelesae);

    function DeleteInvRelesaeConfig(e) {
        e.preventDefault();
        dispatch(deletetype(data));
        set_disabled(true);
    }


    useEffect(() => {
        if (invrelesae.addUpdateLoading == "succeeded") { 
           setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
       } else if (invrelesae.addUpdateLoading != "idle") { 
           setTimeout(() => { set_disabled(false); }, 4000);
       }
   }, [invrelesae.addUpdateLoading]);

    return <Modal  title={("Delete Cash Release")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex row>
            <Flex md={12}> {("Are you sure, you want to delete this release?")}</Flex>
        </Flex>
        
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={DeleteInvRelesaeConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}