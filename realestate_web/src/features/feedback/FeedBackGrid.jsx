import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DataGrid from "../../components/DataGrid";
import { CardBody} from "../../components/style/Card_styled";
import { Loader } from "../../components/style/Loader_styled";
import { Toast } from "../../components/Toast";
import { ReplyFeedbackModal } from "./ReplyFeedbackModal";

const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const FeedBackGrid = (data) => {
  const feedback = useSelector((state) => state.feedback);
  const userReadOnly = useSelector((state) => state.user.read_only);
  const dispatch = useDispatch();
  const [replyOpen, setReplyOpen] = useState(false);
  const [row_data, set_row_data] = useState({});

  const colums = [
    {
      headerName: "ID",
      field: "feedback_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
      headerName: ("Name"),
      field: "fullname",
      description: "Requester Name",
      sortable: true,
      filterable: true,
      type: "string",
    },

    {
      headerName: ("Address"),
      field: "address",
      description: "Address",
      hide: false,
    },
    {
      headerName: ("Contact Number"),
      field: "mobile_no",
      description: "Contact Number",
    },
    {
      headerName: ("Date"),
      field: "request_date",
      type: "date",
      description: "Request Date",
      sortable: true,
      filterable: true,
    },
    {
      headerName: ("Detail"),
      field: "request_detail",
      type: "string",
      description: "Request Detail",
      sortable: true,
    },
    {
      headerName: ("Approved"),
      field: "approved",
      description: "Approved",
      width: "110px"
    },

    {
      headerName: ("Response"),
      field: "response",
      description: "Response",
      hide: false,
    },

    {
      headerName: ("action"),
      field: "",
      hide: userReadOnly,
      type: "action",
      icons: ["reply"],
      colors: ["success"],
      descriptions: ["Reply"],
      callBacks: [
        (feedback_id, r, e) => {
          e.preventDefault();
          var data = feedback.list.find((d) => d.feedback_id == feedback_id);
          set_row_data(data);
          setReplyOpen(true);
        },
      ],
    },
  ];



  return (
    <Suspense fallback={<Loader />}>
      <>
        {(feedback.replyloading == "idle" || feedback.replyloading == "pending") ? <></> : (
          feedback.replyloading == "succeeded" ? (
            <Toast msg={feedback.msg} icon="task_alt" color="success" />
          ) : (
            <Toast color="error" msg={feedback.msg} />
          )
        )}
        <CardBody><Scroll>
          <DataGrid colums={colums} rows={feedback?.list || []} />
        </Scroll>
        </CardBody>
        <ReplyFeedbackModal open={replyOpen} setOpen={setReplyOpen} data={row_data} />
      </>
    </Suspense>
  );
};
