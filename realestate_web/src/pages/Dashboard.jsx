import { useSelector } from "react-redux";
import { AdminDashboard } from "./AdminDashboard";
import UnAuthorized from "./UnAuthorized";

export const Dashboard = () => {
  const userReadOnly = useSelector((state) => state.user.module);
  return (
    userReadOnly?<AdminDashboard/>:<UnAuthorized/>
  );
};
