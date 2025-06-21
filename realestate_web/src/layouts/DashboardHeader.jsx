import { Suspense, useEffect } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HeaderButton } from "../components/Button";
import { Menu } from "../components/Menu";
import { Modal } from "../components/Modal";
import { Avatar } from "../components/style/Avatar_styled";
import { StyledDashboardHeader } from "../components/style/DashboardHeader_styled";
import { Loader } from "../components/style/Loader_styled";
import { MenuItem } from "../components/style/MenuItem_styled";
import { Typography } from "../components/style/Typography_styled";
import { getLogout } from "../features/user/user_slice";
import { stringSearch, useOutsideClicker } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { Loading } from "../components/Loading";

export const DashboardHeader = forwardRef(({ title }, ref) => {
  const allMenus = JSON.parse(localStorage.getItem("menu") || "[]")
    .map((d) =>
      !!d.sub_module
        ? d.sub_module.map((d) => ({
          name: d.sub_module_name,
          link: d.page_name,
        }))
        : { name: d.module_name, link: d.page_name }
    )
    .flat();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [pageName, setPageName] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedMenu, setSearchedMenu] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wraperRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user); 
  const fullname = useSelector((state) => state.user.fullname);
  const page = useSelector((state) => state.page);
 
  useEffect(() => { 
    setSearchOpen(false); 
    setPageName(location.pathname.replace("/app/", "")); 
    var isvalid = !!(user?.pageList?.find((d) => d == location.pathname) || ""); 
    if (isvalid) { 
      //  navigate("/unauth")
    } 
  }, []);

  useOutsideClicker(wraperRef, () => {
    setOpen(false);
  });
 
  useOutsideClicker(searchRef, () => {
    setSearchOpen(false);
  });
  
  function logoutHandle(e) {
    setIsLoading(true);
    dispatch(getLogout());
  }
  function profileHandle(e) {
    setOpen(false); 
    if (user.user_type == "INVESTOR") {
      navigate("/inv/inv-profile")
    } else if (user.user_type == "CUSTOMER") {
      navigate("/cust/cust-profile")
    } else if (user.user_type == "ADMIN") {
      navigate("/app/profile")
    }
  }
  
  function cngPassHandle(e) {
    setOpen(false);
    if (user.user_type == "INVESTOR") {
      navigate("/inv/change-pass")
    } else if (user.user_type == "CUSTOMER") {
      navigate("/cust/change-pass")
    } else if (user.user_type == "ADMIN") {
      navigate("/app/change-pass");
    }
    
  }

  useEffect(() => { 
    if (!user.login) {
      navigate("/");
    }
    if (search != "") {
      setLoader(true);
      stringSearch(allMenus, search, "name").then((d) => {
        setSearchedMenu(d);
        setLoader(false);
        setSearchOpen(true);
      });
    } else {
      setSearchedMenu(null);
      setLoader(false);
      setSearchOpen(false);
    }
  }, [user, search]);

  useEffect(() => {
    if (user.loading != "idle") {
      setTimeout(() => { setIsLoading(false) }, 2000);
    }
  }, [user.loading]);

  return (
    <>  <Suspense>
      <StyledDashboardHeader>
        <div>
          <a ref={ref}>
            <span className="material-icons md-36">menu</span>
          </a>
          <span>{t(page.title)}</span>
          {page.button && (
            <HeaderButton fontColor="font" onClick={page.onClick}>
              {page.prefixIcon && (<span className="material-icons">{page.prefixIcon}{"  "}</span>)}
              {t(page.buttonText)}
              {page.buttonIcon && (<span className="material-icons">{page.buttonIcon}</span>)}
            </HeaderButton>
          )}

          <div>
            <form>
              <input
                type="text"
                placeholder="Search menu..."
                value={search || ""}
                id="searchtext"
                onChange={(e) => e.target.value.length > 0 ? setSearch(e.target.value) : (setSearch(""), setSearchOpen(false))}
              />
              <span className="material-icons md-18">search</span>
              {!!searchedMenu && (
                <Menu open={searchOpen} ref={searchRef}>
                  {loader ? (<Loader />) : searchedMenu.length ?
                    searchedMenu.map((d, i) => (
                      <Link key={i} to={d.link}>
                        <MenuItem onClick={() => setSearch("")}>
                          {d.name}
                        </MenuItem>
                      </Link>
                    )) :
                    <MenuItem>
                      <Typography fontWeight="var(--dashboard-font)" color="font">no match found</Typography>
                    </MenuItem>
                  }
                </Menu>
              )}
            </form>
            <ul>

              <li ref={wraperRef}>
                <a onClick={() => setOpen(!open)}>
                  {/* <Avatar /> */}
                  <div>{fullname}</div>
                  <span
                    className="material-icons md-18"
                    style={{ verticalAlign: "middle" }}
                  >
                    arrow_drop_down
                  </span>
                </a>
                <Menu open={open} last="0px">
                  <MenuItem active={pageName == 'profile'} onClick={profileHandle}>
                    <Typography color="font" textAlign="left">{t("profile")}</Typography>
                  </MenuItem>
                  <MenuItem active={pageName == 'change-pass'} onClick={cngPassHandle}>
                    <Typography color="font" textAlign="left">{t("chang_pass")}</Typography>
                  </MenuItem>
                  <MenuItem onClick={logoutHandle} highlight>
                    <Typography color="font" textAlign="left">{t('logout')}</Typography>
                  </MenuItem>
                </Menu>
                
              </li>
            </ul>
          </div>
        </div>
      </StyledDashboardHeader>
    </Suspense>
      <Loading open={isLoading} />
    </>
  );
});
