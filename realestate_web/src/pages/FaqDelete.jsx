import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../components/Button";
import { Modal } from "../components/Modal";
import { CardHeaderButton } from "../components/style/Card_styled";
import {
    DeleteFaq as deleteFaq,
} from "../features/faq/faq_slice";
import { useEffect } from "react";
import { Flex } from "../components/style/Flex_styled";
import { useState } from "react";

export const FaqDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const faqData = useSelector((state) => state.faq);
    const { t, i18n } = useTranslation();
    const [disabled, set_disabled] = useState(false);

    function DeleteFaq(e) {
        e.preventDefault();
        dispatch(deleteFaq(data)); 
        set_disabled(true);
    }
  
     useEffect(() => {
        if (faqData.addUpdateLoading == "succeeded") { 
          setTimeout(() => { set_disabled(false); setOpen(false)}, 3000);
        }else if (faqData.addUpdateLoading != "idle" && faqData.addUpdateLoading != "pending"){ 
          setTimeout(() => { set_disabled(false);}, 4000);
        }
      }, [faqData.addUpdateLoading]);


    return <Modal title={("Delete FAQ")} xs={4} open={open} onClose={() => {setOpen(false); } } outsideclick>
        <Flex row>
            <Flex md={12}>
            {("Are you sure, you want to delete this FAQ? ")}
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
            <AlertButton disabled={disabled} onClick={DeleteFaq}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}