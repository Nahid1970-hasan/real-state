import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertButton, Button, PrimaryButton } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { CardHeaderButton } from "../../components/style/Card_styled";
import { Input } from "../../components/style/Input_styled";
import { ErrLabel, Label } from "../../components/style/Label";
import { Select } from "../../components/style/Select_styled";
  
import { TextArea } from "../../components/style/TextArea";
import { Typography } from "../../components/style/Typography_styled";
import { Flex } from "../../components/style/Flex_styled";
 
import { updateInvAckInfo, initLoader, loadInvestmentInfo } from "./stack_investment_slice";

export const StackInvAckModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const stinvestment = useSelector((state) => state.stinvestment);
    const [share_id, set_share_id] = useState(0);
    const [project_id, set_project_id] = useState(0);
    const [buy_share, set_buy_share] = useState(0);
    const [user_id, set_user_id] = useState();
    const [amount, set_amount] = useState("");
    const dispatch = useDispatch();
    const [disabled, set_disabled] = useState(false);
    const [pay_data, set_pay_data] = useState({ 
        message: '',
        email_subject: '', 
        email_body: "" 
    }) 

    useEffect(() => { 
        var MSG  = "Dear "+data.investor_name+" Sir, Your investment request of amount tk "+data?.total_amount+" Date: "+data?.request_date+" to buy number of share "+(data?.buy_share)+" which unit price "+data?.unit_price+" tk of "+data.project_name;
        
        set_pay_data({
            message: MSG,
            email_subject: "Recognition for buying "+(data?.buy_share)+" share fo "+data.project_name, 
            email_body: MSG+" --Thanks"
        });
        set_share_id(data.share_id || 0);
        set_user_id(data.user_id || 0);
        set_project_id(data.project_id || 0);
        set_buy_share(data.buy_share || 0);
        set_amount(data.total_amount||0);
    }, [data]);

    const SubmitForm = (values) => { 
        values.share_id = share_id; 
        values.user_id = user_id; 
        values.buy_share = buy_share; 
        values.project_id = project_id; 
        values.amount = amount; 
        dispatch(updateInvAckInfo(values));
        set_disabled(true);
    }; 

    function set_temp_id_change(event) {
        let tempId = event.target.value;
        var data = stinvestment?.tempList?.find((d) => d.template_id == tempId);
        set_pay_data(data);
    }

    function clearForm(){
        set_pay_data({message: '',email_subject: '',email_body: ""}); 
    }

    const validate = (Values) => {
        let errors = {}; 
        if (!Values.message) {
            errors.message = ("SMS is required");
        } else if (Values.message.length > 160) {
            errors.message = ("Maximum 160 characters are allowed");
        }
        if (!Values.email_subject) {
            errors.email_subject = ("Email subject is required");
        } else if (Values.email_subject.length > 250) {
            errors.email_subject = ("Maximum 250 characters are allowed");
        }
        if (!Values.email_body) {
            errors.email_body = ("Email body is required");
        } else if (Values.email_body.length > 500) {
            errors.email_body = ("Maximum 500 characters are allowed");
        }
        return errors;
    };
  
    useEffect(() => {
        if ( stinvestment.addUpdateLoading == "succeeded") {  
            setTimeout(() => { clearForm(); set_disabled(false); setOpen(false);}, 3000);
        } else if (stinvestment.addUpdateLoading != "pending" || stinvestment.addUpdateLoading != "idle") { 
            setTimeout(() => { set_disabled(false);}, 4000);
        }
    }, [stinvestment.addUpdateLoading]);


    return (<>
        <Modal
            md={6}
            sm={8}
            xs={10}
            title={("Send Acknowledgement")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >

            <Formik
                initialValues={pay_data}
                validate={validate}
                enableReinitialize 
                onSubmit={SubmitForm}
            >
                {(formik) => {


                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty,
                        resetForm
                    } = formik;

                    return (
                        <form onSubmit={handleSubmit}>
                            <Flex row>

                                <Flex padding="0 0 10px 0!important" md={3}>
                                    <Label>{("Select Template")}</Label>
                                </Flex>
                                <Flex padding="0 0 10px 0!important" md={9}> 
                                    <Select
                                        app 
                                        name="temp_id" 
                                        onChange={(e) => {
                                            set_temp_id_change(e)
                                            formik.handleChange(e);
                                        }}
                                        value={values.template_id||""}
                                        onBlur={handleBlur}
                                        color={errors.temp_id && touched.temp_id ? "error" : null}
                                    >
                                        <option disabled value={""}>
                                            {("Select template")}
                                        </option>
                                        {
                                            stinvestment?.tempList?.map((d, i) => (
                                                <option key={i} value={d.template_id}>{d.template_name}</option>
                                            ))
                                        }
                                    </Select>
                                    {
                                        errors.temp_type && touched.temp_type ? <ErrLabel>{errors.temp_type}</ErrLabel> : null
                                    }
                                </Flex>


                                <Flex md={12}>
                                    <Typography fontWeight="bold" fontSize="bodySubTitleFontSize"  textAlign="left">
                                        SMS
                                    </Typography>
                                </Flex>

                                <Flex row>
                                    <Flex padding="0!important" md={3}>
                                        <Label>Message</Label>
                                    </Flex>
                                    <Flex padding="0!important" md={9}>
                                        <TextArea
                                            app
                                            type="text"
                                            name="message"
                                            placeholder={("type message")}
                                            value={values.message || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {
                                            errors.message && touched.message ? <ErrLabel>{errors.message}</ErrLabel> : null
                                        }
                                    </Flex>
                                </Flex>
                                <Flex  md={12}>
                                    <Typography fontWeight="bold" fontSize="bodySubTitleFontSize" textAlign="left">
                                        Email
                                    </Typography>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={3}>
                                        <Label>Subject</Label>
                                    </Flex>
                                    <Flex padding="0!important" md={9}>
                                        <Input
                                            app
                                            type="text"
                                            name="email_subject"
                                            placeholder={("type email subject")}
                                            value={values.email_subject || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        /> 
                                        {
                                            errors.email_subject && touched.email_subject ? <ErrLabel>{errors.email_subject}</ErrLabel> : null
                                        }
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <Flex padding="0!important" md={3}>
                                        <Label>Email Body</Label>
                                    </Flex>
                                    <Flex padding="0!important" md={9}>
                                        <TextArea
                                            app
                                            type="text"
                                            name="email_body"
                                            placeholder={("type email body")}
                                            value={values.email_body || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {
                                            errors.email_body && touched.email_body ? <ErrLabel>{errors.email_body}</ErrLabel> : null
                                        }
                                    </Flex>
                                </Flex>

                                <CardHeaderButton>
                                    <AlertButton
                                        type="reset"
                                        onClick={()=>clearForm()}
                                    >
                                        {("Reset")}
                                    </AlertButton>
                                    <PrimaryButton
                                        type="submit"
                                        className={!(dirty && isValid) ? "disabled-btn" : ""}
                                        disabled={!(dirty && isValid) || disabled}
                                    >
                                        {("Submit")}
                                    </PrimaryButton>
                                </CardHeaderButton>

                            </Flex>

                        </form>
                    );
                }}
            </Formik>


        </Modal>
    </>
    );
};
