import { t } from "i18next";
import { Suspense, useEffect, useState } from "react"; 
import DataGrid from "../../components/DataGrid"; 
import { Loader } from "../../components/style/Loader_styled"; 

export const StationListGridBMD = ({ userData }) => {

  const [rows, set_rows] = useState([]);
  useEffect(() => {
    set_rows(userData)  
  }, [userData]);
 
  const colums = [
    {
      headerName: "ID",
      field: "office_id",
      key: true,
      type: "number",
      hide: true,
      sortable: false,
    },
    {
        headerName: "homepage.name_en",
        field: "name_en",
        description: "Office Name",
        sortable: true,
        filterable: true,
        type: "string",
      },
    {
      headerName: t("homepage.type_en"),  
      field: "type_en",
      description: "Office Type", 
      type: "string",
      sortable: false,
    },
    {
        headerName: t("homepage.address"),
        field: "address",
        description: "Address",
        sortable: true,
        filterable: true,
        type: "string",
      },
  ];
 
  return (
    <Suspense fallback={<Loader />}>
      <>
        {
          userData !== null ||  userData !== "" ? (
            <DataGrid colums={colums} rows={rows} />
          ) : (
            <Loader />
          )
        }
      </>
    </Suspense>
  );
};
