

import { useDispatch, useSelector } from "react-redux"
import { CardBody } from "../components/style/Card_styled"
import { Flex } from "../components/style/Flex_styled"
import { loadPage } from "../features/page/page_slice";
import { ProfileDetail } from "../features/profile/ProfileDetail";
import { useEffect, useState } from "react";
import { loadProfile } from "../features/profile/profile_slice";
import { Loading } from "../components/Loading";
import { ProfileModal } from "../features/profile/ProfileModal";
import { useLocation } from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const location = useLocation();
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.self.user);
    const self = useSelector((state) => state.self);

    useEffect(() => { 
        
        dispatch(loadProfile())
        setIsLoading(true);  
        dispatch(loadPage({
            title: "profile", button: true, buttonText: "View Profile", onClick: () => {
                setEditModal(true);
            }
        }))
    }, []);

    useEffect(() => {
        user.loading != "pending" &&  setTimeout(() =>  setIsLoading(false), 2000);
      }, [user.loading]);
      
    return <>
       
        <Flex row>
            <Flex padding="0 !important" md={"12"}>
                    <CardBody>
                        <ProfileDetail />
                    </CardBody>
            </Flex>
        </Flex>
        <ProfileModal open={editModal} setOpen={setEditModal}/>
        <Loading open={isLoading}/>
    </>
}