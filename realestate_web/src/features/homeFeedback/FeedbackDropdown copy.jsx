import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/Button"
import { CardBody } from "../../components/style/Card_styled"
import { Flex } from "../../components/style/Flex_styled"
import { Input } from "../../components/style/Input_styled"
import { Select } from "../../components/style/Select_styled"
import { loadDistrict } from "../../features/district/district_slice";


import { FeedbackGrid } from "./FeedbackGrid"
import { loadFeedback } from "./homeFeedback_slice"

import { Formik } from "formik"
import { Label } from "../../components/style/Label"
import { FeedbackEditModal } from "./FeedbackEditModal"

export const FeedbackDropdown = () => {

    const homeFeedback = useSelector(state => state.homeFeedback);
    const district = useSelector((state) => state.district);


    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [search_col, set_search_col] = useState("");
    const [search_str, set_search_str] = useState("");
    const dropDownRef = useRef(null);
    const dropDownStrRef = useRef(null);

    const [viewOpen, setViewOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({});


    const initialValues = {
        search_col: '',
        search_str: ''
    };



    const searchType = [
        { key: "", value: "" },
        { key: "request_name", value: "Requester Name" },
        { key: "district_id", value: "District" },
        { key: "address", value: "Address" },
        { key: "contact_number", value: "Contact Number" },
        { key: "request_type_en", value: "Request Type" },
        { key: "all", value: "All" },
    ]

    // console.log(i18n.resolvedLanguage);


    // useEffect(() => {

    //     (homeFeedback.loading == "idle") &&
    //         dispatch(loadFeedback(initialValues));

    // }, [homeFeedback.updateLoading]);

    useEffect(() => {

        let initialData = {
            search_col: 'request_name',
            search_str: 'All'
        };

        dispatch(loadFeedback(initialData));
        dispatch(loadDistrict());

        console.log(homeFeedback);
    }, []);






    const validate = (values) => {

        let errors = {};


        if (!values.search_col) {
            errors.search_col = "Search by is required.";
        }

        if (!values.search_str) {
            errors.search_str = "Search value is required.";
        }





        return errors;
    };

    const submitForm = (values) => {
        console.log(values);
        dispatch(loadFeedback(values));

    };


    const submitNewFeed = (values) => {
        setOpen(true);
        console.log(values);

    };





    //console.log(feedbackType);

    // feedbackType.loading === "unauthorized" ? (
    //     <UnAuthorized />
    // ) :

    return (
        <>

            {/* <Card> */}
            <CardBody>

                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={submitForm}
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
                        // console.log(handleChange);

                        return (
                            <div>

                                <form onSubmit={handleSubmit}>

                                    <Flex row>
                                        <Flex md={2} sm={4} xs={8}>
                                            <label htmlFor="search_col">Search By</label>
                                            <Select ref={dropDownRef}
                                                name="search_col"
                                                value={values.search_col}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                color={errors.search_col && touched.search_col ? "error" : null}
                                            >
                                                <option disabled>Select The Value</option>
                                                {
                                                    searchType?.map((d, i) => (<option key={i} value={d.key}>{i18n.resolvedLanguage == "bn" ? d.value : d.value}</option>))
                                                }
                                            </Select>

                                            {
                                                errors.search_col && touched.search_col ? <Label>{errors.search_col}</Label> : null
                                            }
                                        </Flex>
                                        <Flex md={4} sm={8} xs={4}>
                                            <label htmlFor="search_str"> Search Value</label>
                                            <Input
                                                type="text"
                                                name="search_str"
                                                placeholder="Search Value"
                                                value={values.search_str}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                color={errors.search_str && touched.search_str ? "error" : null}
                                            />
                                            {
                                                errors.search_str && touched.search_str ? <Label>{errors.search_str}</Label> : null
                                            }

                                        </Flex>
                                        <Flex md={4} sm={8} xs={4}>
                                            {/* <Button onClick={() => { set_search_col(dropDownRef.current.value), set_search_str(dropDownStrRef.current.value) }}>{i18n.resolvedLanguage == 'bn' ? "দেখুন" : "Show"}</Button> */}

                                            <Button
                                                color="primary"
                                                fontColor="barFont"
                
                                                type="submit"
                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                disabled={!(dirty && isValid)}
                                            >
                                                {t("submit")}
                                            </Button>
                                        </Flex>
                                        <Flex md={2} sm={8} xs={4}>

                                            <Button onClick={submitNewFeed}>{i18n.resolvedLanguage == 'bn' ? "দেখুন" : "New Feed"}</Button>
                                        </Flex>

                                    </Flex>


                                </form>

                            </div>
                        );
                    }}
                </Formik>

                <section></section>


                <Flex row>
                    <Flex>
                        <FeedbackGrid userData={homeFeedback?.list} />
                    </Flex>


                </Flex>
            </CardBody>
            {/* </Card> */}
            <FeedbackEditModal open={open} data={userData} setOpen={setOpen} />
            {/* <OrgViewModal open={viewOpen} data={{ select_user_id: userData.user_id || 0 }} setOpen={setViewOpen} />
                <OrgEditModal open={open} data={userData} setOpen={setOpen} /> */}
        </>
    )

}
