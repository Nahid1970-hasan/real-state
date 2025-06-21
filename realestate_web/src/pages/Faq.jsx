import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { Suspense } from "react";
import DataGrid from "../components/DataGrid";
import {CardBody,} from "../components/style/Card_styled"; 
import { useEffect } from "react";
import { loadPage } from "../features/page/page_slice";
import {initLoader, loadFaq} from "../features/faq/faq_slice";
import { Toast } from "../components/Toast";
import UnAuthorized from "./UnAuthorized";
import { FaqModal } from "./FaqModal";
import { FaqDelete } from "./FaqDelete";
import { Loading } from "../components/Loading";
import { useLocation } from "react-router-dom";

export const Faq = () => {
  const dispatch = useDispatch();
  const faqData = useSelector((state) => state.faq);
  const [faq_id, set_faq_id] = useState(0);
  const [remove, setRemove] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const location= useLocation();

  const colums = [
    {
      headerName: "Id",
      field: "faq_id",
      key: true,
      type: "number",
      hide: true,
    },
    {
      headerName: "Question",
      field: "question",
      description: "Question",
      sortable: true,
      filterable: true,
      type: "string",
    },
    {
      headerName: "Answer",
      field: "answer",
      description: "Answer",
      type: "string",
    },

    {
      headerName: "action",
      field: "",
      type: "action",
      icons: ["edit", "delete"],
      colors: ["success", "error"],
      descriptions:["Edit", "Delete"],
      callBacks: [
        (faq_id) => {
          var rowdata = faqData?.dataList?.find((d) => d.faq_id == faq_id);
          setEditOpen(true);
          setData(rowdata);  
        },
        (faq_id) => { 
          setRemove(true);
          set_faq_id(faq_id);
        },
      ],
    },
  ];

    useEffect(() => { 
      var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || "");
      if(isvalid){
        dispatch(loadFaq());
      }
     
      dispatch(
        loadPage({
          title: "faq",
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
    }, []);


  useEffect(() => {
    faqData.loading == "pending"? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [faqData.loading]);

  useEffect(() => {
    if(faqData.addUpdateLoading == "pending"){
      setIsLoading(true);
    }else if (faqData.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadFaq());
      setTimeout(() => { dispatch(initLoader());}, 5000);
    }else if (faqData.addUpdateLoading !=  "idle"){ 
      setTimeout(() => { dispatch(initLoader());  setIsLoading(false)}, 5000);
    }
  }, [faqData.addUpdateLoading]);

 
    return faqData.loading === "unauthorized" ? (
      <UnAuthorized />
    ) : (
      <>
      {(faqData.addUpdateLoading == "idle" || faqData.addUpdateLoading == "pending") ? <></> : (
          faqData.addUpdateLoading == "succeeded" ? (
            <Toast msg={faqData.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={faqData.msg} />
          )
        )}
        <Suspense fallback={<Loader />}>
          <Flex row>
            <Flex padding="0 !important" md={12}> 
                <CardBody> 
                  <DataGrid
                    colums={colums}
                    rows={faqData?.dataList || []}
                  />
                </CardBody>
              <FaqDelete open={remove} setOpen={setRemove} data={{ faq_id }} />
              <FaqModal open={open} setOpen={setOpen} data={{}} add/>
              <FaqModal open={editOpen} setOpen={setEditOpen} data={data} />
            </Flex>
          </Flex>

        </Suspense>
        <Loading open={isLoading}/>
      </>
    );
  };

