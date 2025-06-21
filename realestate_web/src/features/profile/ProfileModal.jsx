import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, HeaderButton, PrimaryButton, SecondaryButton } from "../../components/Button"
import { Modal } from "../../components/Modal"
import { CardHeaderButton } from "../../components/style/Card_styled"
import { Input } from "../../components/style/Input_styled";
import { Select } from "../../components/style/Select_styled";
import { langs } from "../../utils/helper";
import { initLoader, loadProfile, updateProfile } from "./profile_slice";

export const ProfileModal = ({ open, setOpen }) => {
    const { t, i18n } = useTranslation();
    const [fullname, setFullname] = useState('');
    const [designation, setDesignation] = useState('');
    const [nickname, setNickname] = useState('');
    // const [default_lang, setDefault_lang] = useState('');
    const [update_user_id, setUpdate_user_id] = useState('');

    const self = useSelector(state => state.self);
    const dispatch = useDispatch();
    const data = self.user;
    useEffect(() => {
        setFullname(data.fullname||"");
        setDesignation(data.designation||"");
        setNickname(data.nickname||"");
        // setDefault_lang(data.default_lang||"en");
        setUpdate_user_id(data.user_id||'');
    }, [data]);

     
    useEffect(() => {
        if (self.updateLoading == "succeeded") {
            setOpen(false);
            dispatch(initLoader());
            dispatch(loadProfile({ "bmd_ind_user_id": self.user.user_id }));
           
        }
    }, [self.updateLoading]);
        
    // useEffect(() => { 
    //     i18n.changeLanguage(self.user.default_lang);
    // }, [self.user]);
    
    const editUserProfile = (e) => {
        e.preventDefault();
        let data = { update_user_id, fullname, designation, nickname}
        dispatch(updateProfile(data));
    }

    return <Modal open={open} onClose={() => setOpen(false)} md={4} sm={6} xs={10} title="Edit Profile">
        <CardHeaderButton>
            {/* <SecondaryButton
                
                onClick={() => {
                    setOpen(false);
                }}>Cancel</SecondaryButton> */}

            <PrimaryButton onClick={editUserProfile}>{self.updateLoading == "pending" ? "Loading..." : t("update")}</PrimaryButton>
        </CardHeaderButton>
        <form>
            <label htmlFor="full_name">{("Full Name")}</label>
            <Input
                app
                type="text"
                id="full_name"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />
            <label htmlFor="designation">{("Designation")}</label>
            <Input
                app
                type="text"
                id="designation"
                placeholder="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
            />
            <label htmlFor="nickname">{t("Nick Name")}</label>
            <Input
                app
                type="text"
                id="nickname"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
        
        </form>
    </Modal>
}