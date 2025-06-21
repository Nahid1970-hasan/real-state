import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { 
    updatePayWallet
} from "./stack_payment_slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const UpdatePaymentWalletModal = ({ open, setOpen = () => { }, data }) => {
    
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const stpayment = useSelector((state) => state.stackPayment);
    const [disabled, set_disabled] = useState(false);

    function deleteSMSConfig(e) {
        e.preventDefault();
        var reqData ={
            "amount": data.amount,
            "user_id": data.user_id, 
            "payment_id": data.payment_id, 
        }
        dispatch(updatePayWallet(reqData)); 
        set_disabled(true);
    }
  
    useEffect(() => {
        if ( stpayment.addUpdateLoading == "succeeded") {  
            setTimeout(() => {setOpen(false);  set_disabled(false);}, 3000);
        } else if (stpayment.tempLoading != "pending" && stpayment.tempLoading != "idle") { 
            setTimeout(() => { set_disabled(false);}, 4000);
          }
    }, [stpayment.addUpdateLoading]);

    return <Modal   title={("Add to Wallet")} xs={4} open={open} onClose={() => {setOpen(false); }} outsideclick>
        <Flex row>
            <Flex md={12}>
            {("Are you sure, you want to add this amount into Wallet?")}
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
            <AlertButton disabled ={disabled} onClick={deleteSMSConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}