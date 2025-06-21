
import { useDispatch } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deletefaqConfig as deleteEmail,
} from "./faqConfig_slice";

export const FaqConfigDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
     
    function deletefaqConfig(e) {
        e.preventDefault();
        dispatch(deleteEmail(data));
        setOpen(false);
    }
    return <Modal xs={4} title={ "Delete FAQ"}
    open={open}
    onClose={() => {
      setOpen(false);
    }} outsideclick>
         Data will be deleted, Are you sure?
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                   No
            </SecondaryButton>
            <AlertButton  onClick={deletefaqConfig}>
             Yes
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}