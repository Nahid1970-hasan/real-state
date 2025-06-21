import { Link, useNavigate } from "react-router-dom";
import { Center } from "../components/style/Center_styled";
import { Typography } from "../components/style/Typography_styled";
import { DownloadButton } from "../components/Button";
import { useSelector } from "react-redux";

export default ({ color }) => {
    const user = useSelector((state) => state.user);
    const nevigate = useNavigate();

    function gotToHome() {
        if (user.user_type == "INVESTOR") {
            nevigate("/inv")
        } else if (user.user_type == "CUSTOMER") {
            nevigate("/cust")
        } else if (user.user_type == "INV-CUST") {
            nevigate("/reg-type")
        } else if (user.user_type == "ADMIN") {
            nevigate("/app")
        } else {
            nevigate("/");
        }
    }
    return <div style={{ userSelect: "none" }}>
        <Center>
            <Typography fontWeight={100} fontSize={"titleErrorFont"} color={color ? color : "font"}>404</Typography>
            <Typography fontSize={"subtitleErrorFont"} lineHeight="23px">
                Opps something went wrong!
            </Typography>
            <DownloadButton margin='10px' onClick={gotToHome}>Back to Home</DownloadButton>
        </Center>
    </div>
}