import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteInvWithdrawlConfig as deletetype,
} from "./inv_withdrawl_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const WithdrawlDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [disabled, set_disabled] = useState(false);
    const invwithdrawl = useSelector((state) => state.invwithdrawl);

    function deleteInvWithdrawlConfig(e) {
        e.preventDefault();
        dispatch(deletetype(data));
        set_disabled(true);
    }
  
    useEffect(() => {
        if (invwithdrawl.addUpdateLoading == "succeeded") {
            setTimeout(() => { set_disabled(false); setOpen(false); }, 2000);
        } else if (invwithdrawl.addUpdateLoading != "idle") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [invwithdrawl.addUpdateLoading]);


    return <Modal  title={("Delete Withdrawal")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
       
       <Flex row>
            <Flex md={12}>
                {("Are you sure, you want to delete this withdrawal?")}
            </Flex>
       </Flex>
        <CardHeaderButton >
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteInvWithdrawlConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}