import { useDispatch } from "react-redux";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteOrgUser
} from "./homeFeedback_slice";

export const FeedbackDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();

    function deleteUser(e) {
        e.preventDefault();
        // console.log(data)
        dispatch(deleteOrgUser(data));
        setOpen(false);
    }
    return <Modal xs={4} open={open} onClose={() => { }}>
        {t("del_msg")}
        <CardHeaderButton>
            <Button
                color="secondary"
                fontColor="barFont"
                onClick={() => {
                    setOpen(false);
                }}
            >
                {t("cancel")}
            </Button>
            <Button color="primary"  fontColor="barFont" onClick={deleteUser}>
                {t("ok")}
            </Button>
        </CardHeaderButton>


    </Modal>
}