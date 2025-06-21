import { StyledSidebar } from "../components/style/Sidebar_styled";
import logo from "../assets/img/logo.png";
import { Link, NavLink } from "react-router-dom";
import { SidebarMenu } from "../components/SidebarMenu";
import { Img } from "../components/style/Img_Styled";
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

export const SideBar = forwardRef((_, ref) => {
  const scrollRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [indexUrl, setIndexUrl] = useState("/");
  
  useEffect(() => {
    if (user.user_type == "INVESTOR") {
      setIndexUrl("/inv")
    } else if (user.user_type == "CUSTOMER") {
      setIndexUrl("/cust")
    } else if (user.user_type == "ADMIN") {
      setIndexUrl("/app")
    } else {
      setIndexUrl("/");
    }
  }, [user]);

  function handleScroll(e) {
    let element = scrollRef.current;

    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 1000);

    let scrollHeight = e.target.clientHeight / e.target.scrollHeight;

    element.style.height = scrollHeight * 100 + "%";

    element.style.transform =
      "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
  }

  const menu = JSON.parse(localStorage.getItem("menu")) || [];
  //[{"module_id":300,"page_name":"/app","icon_name":"Home","module_name_bn":"","module_name_en":"Dashboard"},{"module_id":330,"sub_module":[{"page_name":"/app/bank-info","sub_module_id":10,"sub_module_name_bn":"","sub_module_name_en":"Bank Info"},{"page_name":"/app/view-projects","sub_module_id":10,"sub_module_name_bn":"","sub_module_name_en":"View/Book Projects"}],"module_name_bn":"","icon_name":"Award","module_name_en":"Company"},{"module_id":310,"sub_module":[{"page_name":"/app/payments","sub_module_id":10,"sub_module_name_bn":"","sub_module_name_en":"Payments"}],"module_name_bn":"","icon_name":"CreditCard","module_name_en":"Payments"},{"module_id":320,"sub_module":[{"page_name":"/app/project-status","sub_module_id":10,"sub_module_name_bn":"","sub_module_name_en":"Project Progress/Status"}],"module_name_bn":" ","icon_name":"Settings","module_name_en":"View Progress"}]; // JSON.parse(localStorage.getItem("menu"))|| [];

  return (
    <>
      <StyledSidebar ref={ref}>
        <div onScroll={handleScroll}>
          <div className="applogo">
            <Link to={indexUrl}>
              <img src={logo} alt="LOGO" />
            </Link>
          </div>
          <ul>
            {menu.map((item, i) => (
              <SidebarMenu key={i} item={item} />
            ))}
            {/* <li>
                  <NavLink to="/app">
                      <span className="material-icons md-18">dashboard</span>
                      Dashboard
                  </NavLink>
              </li> */}

          </ul>
        </div>

        <div>
          <div ref={scrollRef}></div>
        </div>
      </StyledSidebar>
      <div className=""></div>
    </>
  );
});
