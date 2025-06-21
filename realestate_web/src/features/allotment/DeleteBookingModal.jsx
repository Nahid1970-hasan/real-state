import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, SecondaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import {
    deleteBooking as deleteBook, initLoader,
} from "./allotment_slice";
import { Flex } from "../../components/style/Flex_styled";
import { useEffect } from "react";
import { useState } from "react";

export const DeleteBookingModal = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const allotment = useSelector((state) => state.allotment);
    const [disabled, set_disabled] = useState(false);

    function deleteBooking(e) {
        e.preventDefault();
        dispatch(deleteBook(data)); 
        set_disabled(true);
    } 
    

      useEffect(() => {
        if ( allotment.addUpdateLoading == "succeeded") { 
            setTimeout(() => { set_disabled(false); setOpen(false)}, 5000);
          }else if (allotment.addUpdateLoading !=  "idle" && allotment.addUpdateLoading != "pending"){ 
            setTimeout(() => { set_disabled(false);}, 5000);
          }
    }, [allotment.addUpdateLoading]);

    return <Modal  title={("Delete Booking")} xs={4} open={open} onClose={() => {setOpen(false);}} outsideclick>
        <Flex row>
            <Flex md={12}>
                {("Are you sue, you want to delete this booking?")}
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
            <AlertButton disabled={disabled} onClick={deleteBooking}>
            {("Yes")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}