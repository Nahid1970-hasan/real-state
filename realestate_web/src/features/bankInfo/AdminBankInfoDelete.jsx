import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteBankConfig as deleteBank, initLoader,
} from "./admin_bank_info_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const AdminBankInfoDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState(false);
    const bankInfo = useSelector((state) => state.bankInfo);
    function deleteBankConfig(e) {
        e.preventDefault();
        dispatch(deleteBank(data)); 
    }
 
    
    useEffect(() => {
        if (bankInfo.addUpdateLoading == "succeeded") { 
           setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
       } else if (bankInfo.addUpdateLoading != "idle") { 
           setTimeout(() => { set_disabled(false); }, 4000);
       }
   }, [bankInfo.addUpdateLoading]);

    return <Modal   title={("Delete Bank Information")} xs={4} open={open} onClose={() => {setOpen(false); }} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sure you want to delete the Bank Information?")}
            </Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {("No")}
            </SecondaryButton>
            <AlertButton onClick={deleteBankConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}