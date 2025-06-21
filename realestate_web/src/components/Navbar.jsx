import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadTodayStatus } from "../features/page/navbar_slice";
import { Container } from "./style/Container_styled";
import { Loader } from "./style/Loader_styled";
import { StyledNavbar } from "./style/navbar_styled";
import { PublicMenu } from "./PublicMenu";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
 
export const Navbar = () => { 
  
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.user);
  const menuData = useSelector((state) => state.todayData.publicMenu);
  const nevigate = useNavigate(); 
  const MODULES = [{"module_id":200,"page_name":"/","module_name_bn":"হোম","module_name_en":"Home"},{"module_id":210,"sub_module":[{"page_name":"/mission","sub_module_id":10,"sub_module_name_bn":"","sub_module_name_en":"Misson"},{"page_name":"/vision","sub_module_id":20,"sub_module_name_bn":"","sub_module_name_en":"Vision"},{"page_name":"/quality","sub_module_id":30,"sub_module_name_bn":"","sub_module_name_en":"Quality"},{"page_name":"/mng-team","sub_module_id":40,"sub_module_name_bn":"","sub_module_name_en":"Management Team"}],"module_name_bn":"","module_name_en":"About Us"},{"module_id":220,"sub_module":[{"page_name":"/project-ongoing","sub_module_id":10,"sub_module_name_bn":" ","sub_module_name_en":"Ongoing"},{"page_name":"/project-upcoming","sub_module_id":20,"sub_module_name_bn":" ","sub_module_name_en":"Upcoming"},{"page_name":"/project-completed","sub_module_id":30,"sub_module_name_bn":" ","sub_module_name_en":"Completed"}],"module_name_bn":" ","module_name_en":"Featured Project"},{"module_id":230,"page_name":"/find-project","module_name_bn":" ","module_name_en":"Find Projecct"},{"module_id":240,"page_name":"/faq","module_name_bn":" ","module_name_en":"FAQ"},{"module_id":250,"page_name":"/photo","module_name_bn":" ","module_name_en":"Photo Gallery"},{"module_id":260,"page_name":"/contact","module_name_bn":" ","module_name_en":"Contact Us"},{"module_id":270,"page_name":"/inquiry","module_name_bn":" ","module_name_en":"Inquiry"}];
  const RMODULES = [{"module_id":400,"page_name":"/login","module_name":"Login"}]//,{"module_id":510,"sub_module":[{"page_name":"/signup/confirm-email","sub_module_id":10,"sub_module_name":"","sub_module_name":"Verify Mobile/Email"},{"page_name":"/signup/personal-details","sub_module_id":20,"sub_module_name":"","sub_module_name":"Apply for Registration"}],"module_name":"","module_name":"Registration"},{"module_id":610,"sub_module":[{"sub_module_id":10,"sub_module_name":"","sub_module_name":"Menu 1","sub_module":[{"page_name":"/menu22","sub_module_id":10,"sub_module_name":"","sub_module_name":"Menu 11"},{"page_name":"/menu11","sub_module_id":20,"sub_module_name":"","sub_module_name":"Menu 22"}]},{"page_name":"/menu2","sub_module_id":20,"sub_module_name":"","sub_module_name":"Menu 2"}],"module_name":"","module_name":"MENU"}];
  useEffect(() => { 
    dispatch(loadTodayStatus());
  }, []);

  useEffect(() => { 
    i18n.changeLanguage(localStorage.i18nextLng ?? "en");
    if (user.login) { 
      if(user.user_type=="INV-CUST"){
        nevigate("/reg-type");
      }else if (user.user_type=="INVESTOR"){
        nevigate("/inv")
      }else if(user.user_type=="CUSTOMER"){
        nevigate("/cust")
      }else {
        nevigate("/app");
      }
    }
  }, [user]);

  return (
    <Suspense fallback={<Loader />}>
      <StyledNavbar>
        <Container border={"none"}>
          <div>
            <ul>
              {menuData?.map((item, i) => (
                <PublicMenu key={i} item={item} />
              ))} 
            </ul>
          </div>
          <div>
            <ul> 
            {RMODULES?.map((item, i) => (
                <PublicMenu key={i} item={item} />
              ))}
            </ul>
          </div>
        </Container>
      </StyledNavbar>
    </Suspense>
  );
};
