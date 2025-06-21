import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Card, CardBody, CardHeader } from "../components/style/Card_styled"
import { Flex } from "../components/style/Flex_styled"
import { loadPage } from "../features/page/page_slice";
import { Loading } from "../components/Loading";
import { Toast } from "../components/Toast";
import { CustProfileModal } from "../features/custProfile/CustProfileModal";
import { loadCustProfile, initLoader } from "../features/custProfile/cust_profile_slice";
import { CustProfileDetails } from "../features/custProfile/CustProfileDetails";
import { useLocation } from "react-router-dom";

export const CustProfilePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const profileLoading = useSelector(state => state.custprofile);
    const user = useSelector(state => state.user);

    useEffect(() => {
        dispatch(loadCustProfile());
        dispatch(loadPage({
            title: "Profile", button: true, buttonText: "Update Profile", onClick: () => {
                setEditModal(true);
            }
        }))
    }, []);



    useEffect(() => {
        profileLoading.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [profileLoading.loading]);


    useEffect(() => {
        if (profileLoading.updateLoading == "pending") {
            setIsLoading(true);
        } else if (profileLoading.updateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadCustProfile());
            setTimeout(() => { dispatch(initLoader()); }, 5000);
        } else if (profileLoading.updateLoading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false) }, 5000);
        }
    }, [profileLoading.updateLoading]);

    return <>
        {(profileLoading.updateLoading == "idle" || profileLoading.updateLoading == "pending") ? <></> : (
            profileLoading.updateLoading == "succeeded" ? (
                <Toast msg={profileLoading.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={profileLoading.msg} />
            )
        )}
        <Flex row>
            <Flex padding="0 !important" md={"12"}>
                <CardBody>
                    <CustProfileDetails />
                </CardBody>
            </Flex>
        </Flex>
        <CustProfileModal open={editModal} setOpen={setEditModal} />
        <Loading open={isLoading} />
    </>
}