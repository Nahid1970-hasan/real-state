import { Suspense, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../../components/style/Flex_styled";
import { Loader } from "react-feather";
import { Img } from "../../components/style/Img_Styled";
import { AlertButton, PrimaryButton } from "../../components/Button";
import { Loading } from "../../components/Loading";
import DataGrid from "../../components/DataGrid";
import { ErrLabel, Label } from "../../components/style/Label";
import { Input } from "../../components/style/Input_styled";
import Flatpickr from "react-flatpickr";
import { Formik } from "formik";
import { CardBody, CardHeaderButton } from "../../components/style/Card_styled";
import { Modal } from "../../components/Modal";
import { useEffect } from "react";

import { loadPage } from "../page/page_slice";
import { Constants, formatGridDate } from "../../utils/helper";

import { deletePhoto, loadPhotoData, initLoader, uploadPhoto } from "../bmdPortal/photo_gallery_slice";
import { Toast } from "../../components/Toast";
import { DateTime } from "luxon";

export const ProjectImageModal = ({ open, photo_type, photo_type_id, title, setOpen = () => { }, data, }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState("");
    const userReadOnly = useSelector((state) => state.user.read_only);
    const formRef = useRef();
    const fileRef = useRef();
    const [disabled, set_disabled] = useState(false);
    const photoGalleryData = useSelector((state) => state.photoGallery);
    const [initData, setInitData] = useState({
        file: '',
        photo_name: '',
        photo_desc: '',
        photo_date: DateTime.now().toFormat('yyyy-MM-dd'),
    })
    const dispatch = useDispatch();

    useEffect(() => {
        setPhotoUrl("")
        dispatch(
            loadPage({
                title: "View Photos",
                button: false,
            })
        );
    }, []);



    const validate = (values) => {
        let errors = {};
        if (!values.file) {
            errors.file = ("File is required.");
        } else if (values.file == "invalid") {
            errors.file = ("JPG/JPEG/PNG/GIF are allowed.");
        } else if (values.file == "length") {
            errors.file = ("Maximum 2MB are allowed.");
        }
        return errors;
    };


    const submitForm = (values) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append('photo_desc', values.photo_desc);
        data.append('photo_date', values.photo_date);
        data.append('photo_type', photo_type);
        data.append('photo_type_id', photo_type_id);
        data.append('type', 'save_photo');
        dispatch(uploadPhoto(data));
    };

    const photoColums = [
        {
            headerName: "Id",
            field: "photo_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: "Photo Name",
            field: "photo_name",
            description: "photo name",
            type: "board",
        },
        {
            headerName: "Photo desc",
            field: "photo_desc",
            description: "photo description",
            type: "string",
        },
        {
            headerName: "Photo Date",
            description: "photo date",
            field: "photo_date",
            type: "date",
        },
        {
            headerName: "action",
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["preview", "delete"],
            colors: ["succes", "error"],
            descriptions: ["View Photo", "Delete"],
            callBacks: [
                (photo_id, r, e) => {
                    e.preventDefault();
                    var data = photoGalleryData?.galleryData?.find((d) => d.photo_id == photo_id);
                    setPhotoUrl(data.photo_url);
                },
                (photo_id, r, e) => {
                    e.preventDefault();
                    var data = photoGalleryData?.galleryData?.find((d) => d.photo_id == photo_id);
                    dispatch(deletePhoto({ photo_id: [parseInt(photo_id)], photo_name: [data.photo_name], "photo_type": photo_type, "photo_type_id": photo_type_id }));
                },
            ],

        },
    ];
    const comColums = [
        {
            headerName: "Id",
            field: "photo_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: "Photo Name",
            field: "photo_name",
            description: "photo name",
            type: "board",
        },
        {
            headerName: "Photo desc",
            field: "photo_desc",
            description: "photo description",
            type: "string",
        },
        {
            headerName: "Photo Date",
            description: "photo date",
            field: "photo_date",
            type: "date",
        },
        {
            headerName: "action",
            field: "",
            hide: userReadOnly,
            type: "action",
            icons: ["preview",],
            colors: ["succes"],
            descriptions: ["View Photo"],
            callBacks: [
                (photo_id, r, e) => {
                    e.preventDefault();
                    var data = photoGalleryData?.galleryData?.find((d) => d.photo_id == photo_id);
                    setPhotoUrl(data.photo_url);
                },
                
            ],

        },
    ];

    useEffect(() => {
        if (photoGalleryData.uploading == "succeeded") {
            setInitData({ file: '', photo_name: '', photo_desc: '', photo_date: '' });
            setPhotoUrl("")
            fileRef.current.value = "";
            dispatch(loadPhotoData({ "photo_type": photo_type, "photo_type_id": photo_type_id }));
            setTimeout(() => { formRef.current.resetForm(); set_disabled(false); }, 3000);
        } else if (photoGalleryData.uploading != "idle") {
            setTimeout(() => { set_disabled(false); }, 4000);
        }
    }, [photoGalleryData.uploading]);

    useEffect(() => {
        photoGalleryData?.galleryData.length ? setPhotoUrl(photoGalleryData?.galleryData[0].photo_url) : setPhotoUrl("")
    }, [photoGalleryData?.galleryData]);

    return (
        <>
            <Modal
                md={10}
                sm={12}
                xs={12}
                title={title ?? "Photo"}
                open={open}
                onClose={() => {
                    setOpen(false);
                    setPhotoUrl("");
                }}
                outsideclick
            >
                <Suspense fallback={<Loader />}>
                    <Flex row>
                        <Formik
                            initialValues={initData}
                            onSubmit={submitForm}
                            validate={validate}
                            innerRef={formRef}
                            enableReinitialize
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
                                    resetForm,
                                    setFieldValue
                                } = formik;

                                return (
                                    <div>
                                        <form onSubmit={handleSubmit}>
                                            <Flex row>
                                                <Flex padding="0 5px 0 0!important" md={8} sm={8} xs={12}>
                                                    <Flex row>
                                                        <Flex padding='10px 0 0 0 !important' md={4} sm={6} xs={12}>
                                                            <Label color="font">{("Photo")}</Label>
                                                        </Flex>
                                                        <Flex padding='10px 0 0 0 ! important' md={8} sm={6} xs={12}>
                                                            <Input
                                                                app
                                                                type="file"
                                                                name="file"
                                                                ref={fileRef}
                                                                accept="image/png, image/gif, image/jpeg"
                                                                onChange={(e) => {
                                                                    if (e.target.value && e.target.files) {
                                                                        var length = e.target.files[0].size / 1024;
                                                                        var fileName = e.target.files[0].name;
                                                                        var idxDot = fileName.lastIndexOf(".") + 1;
                                                                        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                                                        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
                                                                            if (length > 2048) {
                                                                                setPhotoUrl('');
                                                                                setFieldValue('file', "length");
                                                                                console.log("Image Size: ", length.toFixed(2) + " KB")
                                                                            } else {
                                                                                setSelectedFiles(e.target.files[0])
                                                                                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                                                setFieldValue('file', fileName)
                                                                            }
                                                                        } else {
                                                                            setPhotoUrl('');
                                                                            setFieldValue('file', "invalid");
                                                                        }
                                                                    } else {
                                                                        console.log("Nothing choose")
                                                                    }
                                                                }}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.file && touched.file ? <ErrLabel>{errors.file}</ErrLabel> : null
                                                            }
                                                        </Flex>
                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding='0 !important' md={4} sm={6} xs={12}>
                                                            <Label color="font">{("Photo Description")}</Label>
                                                        </Flex>
                                                        <Flex padding='0 !important' md={8} sm={6} xs={12}>
                                                            <Input
                                                                app
                                                                type="text"
                                                                name="photo_desc"
                                                                placeholder={("type photo description")}
                                                                value={values.photo_desc}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.photo_desc && touched.photo_desc ? <Label >{errors.photo_desc}</Label> : null
                                                            }
                                                        </Flex>
                                                    </Flex>
                                                    <Flex row>
                                                        <Flex padding='0 0 10px 0 !important' md={4} sm={6} xs={12}>
                                                            <Label color="font">{("Photo Date")}</Label>
                                                        </Flex>
                                                        <Flex padding='0 0 10px 0 !important' md={8} sm={6} xs={12}>
                                                            <Flatpickr
                                                                app
                                                                readOnly
                                                                options={{
                                                                    dateFormat: "Y-m-d",
                                                                }}
                                                                value={values.photo_date || DateTime.now().toFormat('yyyy-MM-dd')}
                                                                onChange={(e, str) => {
                                                                    setFieldValue("photo_date", str);
                                                                }}
                                                                render={(
                                                                    { defaultValue, value, ...props },
                                                                    ref
                                                                ) => {
                                                                    return (
                                                                        <Input
                                                                            app
                                                                            {...props}
                                                                            type="text"
                                                                            name="photo_date"
                                                                            placeholder={("select photo date")}
                                                                            value={values.photo_date}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            color={
                                                                                errors.photo_date && touched.photo_date
                                                                                    ? "error"
                                                                                    : null
                                                                            }
                                                                            ref={ref}
                                                                        />
                                                                    );
                                                                }}
                                                            />
                                                            {
                                                                errors.photo_date && touched.photo_date ? <Label >{errors.photo_date}</Label> : null
                                                            }
                                                        </Flex>
                                                    </Flex>

                                                    {data?.status!="Completed"?<Flex row>
                                                        <CardHeaderButton>
                                                            <PrimaryButton
                                                                type="submit"
                                                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                                disabled={!(dirty && isValid) || disabled}
                                                            >
                                                                {("Submit")}
                                                            </PrimaryButton>
                                                        </CardHeaderButton>
                                                    </Flex>:<></>}

                                                    <Flex padding="10px 0 10px 0 !important" md={12}>
                                                        <DataGrid colums={data?.status=="Completed"?comColums:photoColums} rows={photoGalleryData?.galleryData || []} />
                                                    </Flex>

                                                </Flex>
                                                <Flex padding="10px 0 0 5px !important" md={4} sm={8} xs={12}> 
                                                    <Img src={photoUrl} alt="No Image Found"></Img> 
                                                </Flex>

                                            </Flex>

                                        </form>
                                    </div>
                                );
                            }}
                        </Formik>
                    </Flex>

                </Suspense>
            </Modal>
        </>
    );
};
