import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadPage } from "../features/page/page_slice";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeaderButton } from "../components/style/Card_styled";
import { Loader } from "../components/style/Loader_styled";
import { Toast } from "../components/Toast";
import { Flex } from "../components/style/Flex_styled";
import DataGrid from "../components/DataGrid";
import { AlertButton, Button, PrimaryButton } from "../components/Button";
import { Formik } from "formik";
import Flatpickr from "react-flatpickr";
import { Modal } from "../components/Modal";
import { Input } from "../components/style/Input_styled";
import { ErrLabel, Label } from "../components/style/Label";
import { Img } from "../components/style/Img_Styled";
import { deletePhoto, initLoader, loadPhotoData, uploadPhoto } from "../features/bmdPortal/photo_gallery_slice";
import { Loading } from "../components/Loading";
import { Constants } from "../utils/helper";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";

export const PhotoGallery = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photoID, setPhotoID] = useState([]);
  const [photoNAME, setPhotoNAME] = useState([]);
  const [photoUrl, setPhotoUrl] = useState();
  const formRef = useRef();
  const fileRef = useRef();
  const [previewPhoto, setPreviewPhoto] = useState();
  const [disabled, set_disabled] = useState(false);
  const photoGalleryData = useSelector((state) => state.photoGallery);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const location= useLocation();
  const [initData, setInitData] = useState({
    file: '',
    photo_name:'',
    photo_desc: '',
    photo_date: DateTime.now().toFormat('yyyy-MM-dd'),
    photo_type:'',
    photo_type_id:''
  })
  const dispatch = useDispatch();

  useEffect(() => {
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
    if(isvalid){
      dispatch(loadPhotoData({"photo_type":Constants.photo_gallery,"photo_type_id":0}))
    }
    setPreviewPhoto("");
    setPhotoUrl(""); 
    
    dispatch(
      loadPage({
        title: "View Photos",
        button: isvalid,
        onClick: () => {
          if(isvalid){
            setOpen(true);
          }
         
        },
        buttonText: "Add New",
        // buttonIcon: "add",
      })
    );
  }, [location]);
  
  useEffect(() => {
    if(photoGalleryData?.galleryData.length>0){ 
      setPreviewPhoto(photoGalleryData?.galleryData[0].photo_url);
    }  
  }, [photoGalleryData?.galleryData]);

  const validate = (values) => {
    let errors = {};
    if (!values.file) {
      errors.file = ("File is required");
    } else if (values.file == "invalid") {
      errors.file = ("JPEG/JPG/PNG/GIF are allowed.");
    } else if (values.file == "length") {
      errors.file = ("Max 2MB are allowed.");
    }
    if (!values.photo_desc) {
      errors.photo_desc = ("Photo description is required");
    } else if (values.photo_desc.length > 160) {
      errors.photo_desc = ("Maximum 160 characters are allowed");
    }
    if (!values.photo_date) {
      errors.photo_date = ("Photo date is required");
    }
    return errors;
  };

  const submitForm = (values) => {
    var data = new FormData();
    data.append('file', selectedFiles);
    data.append('photo_desc', values.photo_desc);
    data.append('photo_type', Constants.photo_gallery);
    data.append('photo_type_id', 0);
    data.append('photo_date', values.photo_date);
    data.append('type', 'save_photo');
    dispatch(uploadPhoto(data));
    set_disabled(true)
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
      description: "Photo Name",
      type: "string",
    },
    {
      headerName: "Photo Description",
      field: "photo_desc",
      description: "Photo Description",
      type: "string",
    },
    {
      headerName: "Photo Date",
      description: "Photo Date",
      field: "photo_date",
      type: "date",
    },
    {
      headerName: "action",
      icons: ["preview"],
      colors: ["succes"],
      descriptions: ["View Photo"],
      type: "action",
      callBacks: [
        (id) => {
          var data = photoGalleryData?.galleryData?.find((d) => d.photo_id == id);
          setPreviewPhoto(data.photo_url);
        },
      ],
      
    },
  ];

  function getSelectedIds(ids) {
    var ID = []; var NAME = [];
    photoGalleryData?.galleryData
      ?.filter((d) => ids.includes(d.photo_id))
      ?.map((d) => { ID.push(d.photo_id); NAME.push(d.photo_name) });
    setPhotoID(ID);
    setPhotoNAME(NAME);
  }

  useEffect(() => {
    if ( photoGalleryData.uploading == "pending") {
        setIsLoading(true);
    } else if ( photoGalleryData.uploading == "succeeded") {
      setPhotoUrl("");
      setPreviewPhoto("");
      fileRef.current.value="";
      dispatch(loadPhotoData({"photo_type":Constants.photo_gallery,"photo_type_id":0}));
      formRef.current.resetForm(); setIsLoading(false); set_disabled(false); setOpen(false) 
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    }else if (photoGalleryData.uploading !=  "idle"){ 
      setTimeout(() => { dispatch(initLoader());  setIsLoading(false); set_disabled(false);}, 5000);
    }
  }, [photoGalleryData.uploading]);

  useEffect(() => {
    photoGalleryData.loading == "pending"? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [photoGalleryData.loading]);

  return (
    <>
      {(photoGalleryData.uploading == "idle" || photoGalleryData.uploading == "pending") ? <></> : (
        photoGalleryData.uploading == "succeeded" ? (
          <Toast msg={photoGalleryData.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={photoGalleryData.msg} />
        )
      )}
      <Suspense fallback={<Loader />}>
        <Flex row>
          <Flex padding="0 !important" md={7} sm={6} xs={6}>
            <div>
              <DataGrid
                colums={photoColums}
                rows={photoGalleryData?.galleryData}
                getSelectedIds={getSelectedIds}
                selectable
              />
            </div>
          </Flex>
          <Flex md={5} sm={6} xs={6}>
            <Img src={previewPhoto} alt="No Image Found"></Img>
            <Flex row justifyCenter>
              <AlertButton
                type="submit"
                disabled={photoID.length == 0}
                onClick={() => {
                  let data = {
                    "photo_id": photoID,
                    "photo_name": photoNAME,
                    "photo_type": Constants.photo_gallery,
                    "photo_type_id":0

                  }
                  dispatch(deletePhoto(data))
                }}
              >
                {("Delete Selected Photo(s)")}
              </AlertButton>
            </Flex>
          </Flex>
        </Flex>
      </Suspense>

      <Modal
        md={6}
        sm={8}
        xs={10}
        title={("Add Photo")}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        outsideclick
      >

        <Formik
          initialValues={initData}
          validate={validate}
          onSubmit={submitForm}
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
                  <CardHeaderButton>

                    <AlertButton
                      type="reset"
                      onClick={() => {
                        resetForm();
                        setPhotoUrl("")
                      }}
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
                  <CardBody>
                    <Flex row>
                      <Flex padding='10px 0 0 0' md={3} sm={6} xs={12}>
                        <Label>{("Photo")}</Label>
                      </Flex>
                      <Flex padding='10px 0 0 0' md={9} sm={6} xs={12}>
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
                      <Flex padding='0' md={3} sm={6} xs={12}>
                        <Label>{("Photo Description")}</Label>
                      </Flex>
                      <Flex padding='0' md={9} sm={6} xs={12}>
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
                          errors.photo_desc && touched.photo_desc ? <ErrLabel >{errors.photo_desc}</ErrLabel> : null
                        }
                      </Flex>
                    </Flex>
                    <Flex row>
                      <Flex padding='0' md={3} sm={6} xs={12}>
                        <Label>{("Photo Date")}</Label>
                      </Flex>
                      <Flex padding='0' md={9} sm={6} xs={12}>
                        <Flatpickr
                          readOnly
                          options={{
                            dateFormat: "Y-m-d",
                          }}
                          value={values.photo_date}
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
                          errors.photo_date && touched.photo_date ? <ErrLabel >{errors.photo_date}</ErrLabel> : null
                        }
                      </Flex>
                    </Flex>
                    <Flex row>
                      <Flex padding='5px 0 0 0' md={11.99} sm={12} xs={12}>
                        <Label color="font">{("Image")}</Label>
                        <Img src={photoUrl} alt="No Image Found"></Img>
                      </Flex>
                    </Flex>
                  </CardBody>
                </form>
              </div>
            );
          }}
        </Formik>
      </Modal>
      <Loading open={isLoading} />
    </>
  );
};
