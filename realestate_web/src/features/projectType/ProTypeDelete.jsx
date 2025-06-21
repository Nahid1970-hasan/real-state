
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteprotype as deletetype
} from "./pro_Type_slice";
import { useEffect, useState } from "react";
import { Flex } from "../../components/style/Flex_styled";

export const ProTypeDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const protype = useSelector((state) => state.protype);
    const [disabled, set_disabled] = useState(false); 
    function deleteprotype(e) {
        e.preventDefault();
        dispatch(deletetype(data));
    }
  
    useEffect(() => {
        if ( protype.addUpdateLoading == "succeeded") { 
          setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
        }else if (protype.addUpdateLoading !=  "idle" && protype.addUpdateLoading != "pending"){ 
          setTimeout(() => {set_disabled(false);}, 4000);
        }
      }, [protype.addUpdateLoading]);

    return <Modal title={("Delete Project Type")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
        <Flex row>
            <Flex md={12}> {t("Are you sure, want to delete this project type?")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                {t("No")}
            </SecondaryButton>
            <AlertButton disabled={disabled} onClick={deleteprotype}>
                {t("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}