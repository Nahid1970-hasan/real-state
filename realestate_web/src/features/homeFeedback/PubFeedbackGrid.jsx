import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../components/DataGrid";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { CardBody } from "../../components/style/Card_styled";
import { initLoader } from "./homeFeedback_slice";

export const PubFeedbackGrid = ({ userData }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const homeFeedback = useSelector((state) => state.homefeedback); 
  const [colums, set_colums] = useState([]);
  const [rows, set_rows] = useState([]);
  function getCol(){
    return [
      {
        headerName: "ID",
        field: "request_id",
        key: true,
        type: "number",
        hide: true,
        sortable: false,
      },
      {
        headerName: "Name",
        field: "fullname", 
        sortable: false,
        filterable: false,
        type: "string",
        description: "Name",
      },
      {
        headerName: "Address",
        field: "address", 
        type: "string",
        hide:true,
        description: "Address",
        sortable: false,
        filterable: true, 
      },
      {
        headerName: "Contact Number",
        field: "mobile_no",
        type: "string",
        description: "Contact Number",
        sortable: false,
        filterable: true, 
      },
      {
        headerName: "Request Date",
        field: "request_date", 
        description: "Request Date",
        type: "date",
        sortable: false,
        filterable: true,
      },
      
      {
        headerName: "Detail",
        field: "request_detail", 
        description: "Request Detail",
        sortable: false,
        filterable: true,
        type: "string", 
      },
      {
        headerName: "Response",
        field: "response",
        description: "Response",
        type: "string",
        sortable: false,
        filterable: true, 
        width:"130px"
      }
    ]
  }
  useEffect(() => { 
    set_rows(userData);
  },[userData]);

  useEffect(() => { 
    set_colums(getCol());
  }, [i18n.resolvedLanguage]);
  
  useEffect(() => {
    if (homeFeedback.addLoading == "succeeded") {
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (homeFeedback.addLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    }
  }, [homeFeedback.addLoading]);

  return (
    <Suspense fallback={<Loader />}>
      <> {(homeFeedback.updateLoading == "idle" || homeFeedback.updateLoading == "pending") ? <></> : (
          homeFeedback.updateLoading == "succeeded" ? (
            <Toast msg={homeFeedback.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={homeFeedback.msg} />
          )
        )}
        {/* {
          homeFeedback.loading == "succeeded" ? (
            <DataGrid colums={colums} rows={rows} />
          ) : (
            <Loader />
          )
        } */}
         <CardBody>
          <DataGrid colums={colums} rows={rows} />
        </CardBody>
      </>
    </Suspense>
  );
};
