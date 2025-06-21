
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteInvBankInfo as deleteBank
} from "./inv_bank_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const InvBankInfoDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const invBank = useSelector((state) => state.invBank);
    const [disabled, set_disabled] = useState(false);
    function deleteInvBankInfo(e) {
        e.preventDefault();
        dispatch(deleteBank(data)); 
    }
 
    useEffect(() => {
        if (invBank.addUpdateLoading == "succeeded") { 
           setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
       } else if (invBank.addUpdateLoading != "idle") { 
           setTimeout(() => { set_disabled(false); }, 4000);
       }
   }, [invBank.addUpdateLoading]);

    return <Modal  title={("Delete Bank Information")} xs={4} open={open} onClose={() => { setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}> {("Are you sue, you want to delete Bank Information?")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteInvBankInfo}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}