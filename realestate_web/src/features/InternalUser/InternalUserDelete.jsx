import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteInternalUserConfig as deleteConfig,
} from "./internal_user_Slice";
import { useEffect } from "react";
import { Flex } from "../../components/style/Flex_styled";
import { useState } from "react";

export const InternalUserDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState(false);
    const userConfig = useSelector((state) => state.internal);

    function deleteInternalUserConfig(e) {
        e.preventDefault();
        set_disabled(true);
        dispatch(deleteConfig(data)); 
    }
    
    useEffect(() => {
        if (userConfig.addUpdateLoading == "succeeded") { 
          setTimeout(() => { set_disabled(false); setOpen(false) }, 3000);
        } else if (userConfig.addUpdateLoading != "idle" && userConfig.addUpdateLoading != "pending") { 
          setTimeout(() => {set_disabled(false); }, 4000);
        }
      }, [userConfig.addUpdateLoading]);

    return <Modal  title={("Delete User Profile")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
        <Flex row>
            <Flex md = {12}>
            {("Are you sure you want to delete the User Profile?")}
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
            <AlertButton disabled={disabled} onClick={deleteInternalUserConfig}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}