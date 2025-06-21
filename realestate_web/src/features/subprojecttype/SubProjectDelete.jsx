import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteSubProtype as deletetype 
} from "./sub_project_type_Slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const SubProjectDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const subprotype = useSelector((state) => state.subprotype);
    const [disabled, set_disabled] = useState(false); 
    function deleteSubProtype(e) {
        e.preventDefault();
        dispatch(deletetype(data)); 
    }
    
    useEffect(() => {
    if ( subprotype.addUpdateLoading == "succeeded") { 
        setTimeout(() => {set_disabled(false); setOpen(false) }, 3000);
    }else if (subprotype.addUpdateLoading !=  "idle" && subprotype.addUpdateLoading != "pending"){ 
        setTimeout(() => {set_disabled(false); }, 4000);
    }
    }, [subprotype.addUpdateLoading]);

    return <Modal  title={t("Delete Sub-project Type")} xs={4} open={open} onClose={() => { setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}> {t("Are you sure, want to delete this sub-project type?")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                 {t("No")}
            </SecondaryButton>
            <AlertButton onClick={deleteSubProtype}>
            {t("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}