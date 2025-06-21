import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Flex } from "../../components/style/Flex_styled";
import { Typography } from "../../components/style/Typography_styled";
import { Select } from "../../components/style/Select_styled";
import { TextArea } from "../../components/style/TextArea";
import { updateFeedbackData } from "./feedback_slice";
import { ErrLabel } from "../../components/style/Label";

export const ReplyFeedbackModal = ({ add, open, setOpen = () => { }, data }) => {
    const feedback = useSelector((state) => state.feedback);
    const dispatch = useDispatch();
    const [approved, set_approved] = useState("");
    const [detailsData, setdetailsData] = useState("");
    const [feedback_id, set_feedback_id] = useState(0);
    const [disabled, set_disabled] = useState(false);
    const [response, setResponse] = useState(null);
    const [responseErr, setResponseErr] = useState("");
    const [statusErr, setStatusErr] = useState("");

    useEffect(() => {
        setdetailsData(data||{});
        setResponse(data.response||"")
        set_approved(data.approved||"");
        set_feedback_id(data.feedback_id)
    }, [data]);

    useEffect(() => {
        if (feedback.replyloading == "succeeded") {
            setTimeout(() => { setOpen(false); set_disabled(false) }, 3000);
        } else if (feedback.replyloading != "idle") {
            setTimeout(() => { set_disabled(false) }, 4000);
        }
    }, [feedback.replyloading]);

    const handleOnChange = (event) => {
        if(event.target.value){
         setResponse(event.target.value);
         setResponseErr("") 
        }else {
         setResponse("");
         setResponseErr("Reply message is required!") 
        }
     };
     function submitReply(e) {
       e.preventDefault();
       const datas = {
         feedback_id,
         response,
         approved
       }
       if (response && approved) {
         setResponseErr("");
         setStatusErr("");
         dispatch(updateFeedbackData(datas));
         set_disabled(true);
       } else {
         !response && setResponseErr("Reply message is required!");
         !approved && setStatusErr("Status is required.")
       }
     };
     const set_status_change = (event) => {
       
       if(event.target.value){
         set_approved(event.target.value);
         setStatusErr("") 
        }else {
         set_approved("");
         setStatusErr("Status is required!") 
        }
     };

    return (
        <>
            <Modal
                title={("Reply Feedback")}
                open={open}
                md={6}
                sm={8}
                xs={10}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <Flex row>
                    <CardHeaderButton>
                        <AlertButton
                            type="reset"
                            onClick={() => { setResponse(null); }}
                        >
                            Reset
                        </AlertButton>
                        <PrimaryButton disabled={disabled} onClick={submitReply} >{("Submit")}</PrimaryButton>
                    </CardHeaderButton>

                    <Flex xs={12}>
                        <Flex row>
                            <Flex padding={"0 !important"} md={4} sm={6} xs={12}>
                                <Typography fontSize="bodyContentFontSize" textAlign="left" >
                                    {("Requester Name")}
                                </Typography>
                            </Flex>
                            <Flex padding={"0 !important"} md={8} sm={6} xs={12}>
                                <Typography textAlign="left"  >
                                    <span style={{ paddingRight: '5px' }}>:</span> {detailsData.fullname}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding={"0 !important"} md={4} sm={6} xs={12}>
                                <Typography fontSize="bodyContentFontSize" textAlign="left" >
                                    {("Contact Number")}
                                </Typography>
                            </Flex>
                            <Flex padding={"0 !important"} md={8} sm={6} xs={12}>
                                <Typography textAlign="left"  >
                                    <span style={{ paddingRight: '5px' }}>:</span> {detailsData.mobile_no}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding={"0 !important"} md={4} sm={6} xs={12}>
                                <Typography fontSize="bodyContentFontSize" textAlign="left" >
                                    {("Request Details")}
                                </Typography>
                            </Flex>
                            <Flex padding={"0 !important"} md={8} sm={6} xs={12}>
                                <Typography textAlign="left"  >
                                    <span style={{ paddingRight: '5px' }}>:</span> {detailsData.request_detail}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row>
                            <Flex padding={"0 !important"} md={4} sm={6} xs={12}>
                                <Typography fontSize="bodyContentFontSize" textAlign="left" >
                                    {("Approved")}
                                </Typography>
                            </Flex>
                            <Flex padding={"0 !important"} md={8} sm={6} xs={12}>
                                <div style={{ display: "inline-flex", }}>
                                    <span style={{ paddingRight: '10px' }}>:</span>
                                    <Select
                                        app
                                        name="approved"
                                        onChange={set_status_change}
                                        value={approved || ""}
                                    >
                                        <option disabled value="">
                                            {("Select status")}
                                        </option>
                                        <option value="Yes">{("Yes")} </option>
                                        <option value="No">{("No")} </option>
                                    </Select>
                                </div>
                                {statusErr ? (<ErrLabel>{statusErr}</ErrLabel>) : null}
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex padding={"0 !important"} md={12}>
                        <TextArea app rows="2" onChange={handleOnChange} value={response ?? ""} placeholder={("type feedback..")} />
                        {responseErr ? (<ErrLabel>{responseErr}</ErrLabel>) : null}
                    </Flex>
                </Flex>
            </Modal>
        </>
    );
};
