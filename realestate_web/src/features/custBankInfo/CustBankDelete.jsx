
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteCustBankInfo as deleteBank
} from "./cust_bank_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const CustBankDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const custBankInfo = useSelector((state) => state.custBankInfo);
    const [disabled, set_disabled] = useState(false);
    function deleteCustBankInfo(e) {
        e.preventDefault();
        dispatch(deleteBank(data)); 
        set_disabled(true);
    }
 
    useEffect(() => {
        if (custBankInfo.addUpdateLoading == "succeeded") { 
           setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
       } else if (custBankInfo.addUpdateLoading != "idle"||custBankInfo.addUpdateLoading != "pending") { 
           setTimeout(() => { set_disabled(false); }, 4000);
       }
   }, [custBankInfo.addUpdateLoading]);

    return <Modal  title={("Delete Bank Information")} xs={4} open={open} onClose={() => { setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}> {("Are you sure, you want to delete Bank Information?")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteCustBankInfo}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}