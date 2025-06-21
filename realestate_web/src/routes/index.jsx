import {
  createHashRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { LayoutHome } from "../layouts/Layout_home";
import About from "../pages/About";
import { Dashboard } from "../pages/Dashboard";
import { ForgetPass } from "../pages/ForgetPass";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import NotFound from "../pages/NotFound";
import { ResetPass } from "../pages/Reset";
import { LayoutLogin } from "../layouts/Layout_login";
import { ChangePass } from "../pages/ChangePass";
import { FeedBack } from "../pages/FeedBack";
import { TermsConditionPage} from "../pages/TermsCondition";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicy";
import { OrgRegistration } from "../pages/OrgRegistration";
import { UserRegistration } from "../pages/UserRegistration";
import { Profile } from "../pages/Profile";
import { Faq } from "../pages/Faq";
import { PhotoGallery } from "../pages/PhotoGallery";
import { RegRequestPage } from "../pages/RegRequest";
import { ValidateEmail } from "../pages/ValidateEmail"; 
import { PubPhotoGallery } from "../pages/PubPhotoGallery";
import { ContactPage } from "../pages/Contact";
import { DetailsPage } from "../pages/Details";
import { AboutUsPage } from "../pages/AboutUsPage";
import { LayoutSignup } from "../layouts/Layout_signup";
import { SignUpPage } from "../pages/SignupPage";
import { ConfirmEmail } from "../pages/ConfirmEmail";
import { RegCredentialPage } from "../pages/RegCredential";
import { RegTypePage } from "../pages/RegType";
import { RegDetailsPage } from "../pages/RegDetails";
import { RegBankPage } from "../pages/RegBank";
import { SignupStatus } from "../pages/SignupStatus";
import { ProjectTypePage } from "../pages/ProjectType";
import { SubProjectTypePage } from "../pages/SubProjectType";
import { TemplateMsgPage } from "../pages/TemplateMsg";
import { CreateViewProjectPage } from "../pages/CreateViewProject";
import { CreateViewSubProjectPage } from "../pages/CreateViewSubProject";
import { SmsSetting } from "../pages/SmsSetting";
import { EmailSetting } from "../pages/EmailSetting";
import { AdminSetting } from "../pages/AdminSetting";
import { ExternalUser } from "../pages/ExternalUser";
import { InternalUserPage } from "../pages/InternalUser";
import { StackholderInfoPage } from "../pages/StackholderInfo";
import { StackRegistrationPage } from "../pages/StackRegistration";
import { StackPaymentPage } from "../pages/StackPayment";
import { StackInvestmentPage } from "../pages/StackInvestment";
import { StackWithdrawlPage } from "../pages/StackWithdrawl";
import { StackReleasePage } from "../pages/StackRelease";
import { AdminInvesment } from "../pages/AdminInvestment";

import { CustComBankInfoPage } from "../pages/CustComBankInfo";
import { CustViewProjectPage } from "../pages/CustViewProject";
import { CustPaymentPage } from "../pages/CustPayment";
import { CustProjectProgressPage } from "../pages/CustProjectProgress";
import { CustProfilePage } from "../pages/CustProfile";

import { PubFaqPage } from "../pages/PubFaq";

import { InvCompanyBank } from "../pages/InvCmpanyBank";
import { InvViewProgress } from "../pages/InvViewProgress";
import { InvPayment } from "../pages/InvPayment";
import { InvInvestment } from "../pages/InvInvestment";
import { InvCashRelease } from "../pages/InvCashRelease";
import { InvSummaryPage } from "../pages/InvSummary";
import { InvDashboard } from "../pages/InvDashboard";
import { HomeFeedback } from "../pages/HomeFeedback";
import { CustDashboard } from "../pages/CustDashboard";
import { InvProfile } from "../pages/InvProfile";

import { AdminAuditLogsPage } from "../pages/AuditLogsAdmin";
import { PublicAuditLogsPage } from "../pages/AuditLogsPublic";
import { CustTransactionPage } from "../pages/CustTransaction";
import { InvWithdrawPage } from "../pages/InvWithdraw";
import { InvTransferPage } from "../pages/InvTransfer";
import { Milestonepage } from "../pages/MilestoneSetup";
import { ProgressMonitorpage } from "../pages/ProgressMonitor";
import { Allotmentpage } from "../pages/Allotment";
import { WalletPage } from "../pages/AdminWallet";
import { TransactionSummary } from "../pages/TransactionSummary";
import { ProjectwiseSummary } from "../pages/ProjectwiseSummary";
import { AdminBankInfo } from "../pages/AdminBank";
import { InvBankInfo } from "../pages/InvBankInfo";
import { CustBankInfo } from "../pages/CustBankInfo";
import UnAuthorized from "../pages/UnAuthorized";
import { AdmProjectSummaryPage } from "../pages/AdmProjectSummary";
import { SmsEmailPage } from "../pages/SmsEmailPage";
import { AdminComSummaryPage } from "../pages/AdminComSummary";


export const WebRouter = createHashRouter(
  createRoutesFromElements(
    <>
      <Route element={<LayoutHome />}>
        <Route path="/" element={<Home />} />
        <Route path="/au-mgmt" element={<About />} />
        <Route path="/pub-pg" element={<PubPhotoGallery />} />
        <Route path="/pub-inq" element={<HomeFeedback />} />
        <Route path="/pub-termcon" element={<TermsConditionPage/>} />
        <Route path="/pub-disclaim" element={<PrivacyPolicyPage/>} />
      
        <Route path="/org-registration" element={<OrgRegistration />} />
        <Route path="/user-registration" element={<UserRegistration />} />

        <Route path="/validate-email/:token" element={<ValidateEmail />} />
        <Route path="/reset" element={<ForgetPass />} />
        <Route path="/reset/:token" element={<ResetPass />} />

        <Route path="/reg-app" element={<SignUpPage />} />
        <Route path="/reg-ver" element={<ConfirmEmail />} />
        <Route path="/credential" element={<RegCredentialPage />} />
        <Route path="/reg-details" element={<RegDetailsPage />} />
        <Route path="/reg-bank" element={<RegBankPage />} />
        <Route path="/reg-success" element={<SignupStatus />} />

        <Route path="/pub-con" element={<ContactPage />} />
        <Route path="/pub-faq" element={<PubFaqPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/au-abtus" element={<AboutUsPage/>}/>

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<LayoutLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/reg-type" element={<RegTypePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* <Route path="/" element={<LayoutSignup />} errorElement={<NotFound />}> 
        <Route path="reg-app" element={<SignUpPage />} />
        <Route path="reg-ver" element={<ConfirmEmail />} />
        <Route path="credential" element={<RegCredentialPage />} />
        <Route path="reg-type" element={<RegTypePage />} />
        <Route path="reg-details" element={<RegDetailsPage />} />
        <Route path="reg-bank" element={<RegBankPage />} />
        <Route path="reg-success" element={<SignupStatus />} />

        <Route path="*" element={<NotFound color={"primary"} />} />
      </Route> */}

      <Route path="/app" element={<Layout />} errorElement={<NotFound />}>
        <Route index element={<Dashboard />} />
        <Route path="change-pass" element={<ChangePass />} />
        <Route path="feed-inqr" element={<FeedBack />} />
        <Route path="profile" element={<Profile />} />
        <Route path="al-intl" element={<AdminAuditLogsPage />} />
        <Route path="al-pub" element={<PublicAuditLogsPage />} />
        <Route path="gstp-faq" element={<Faq />} />
        <Route path="gstp-pg" element={<PhotoGallery />} />
        <Route path="reg-request" element={<RegRequestPage />} />
        <Route path="md-ptyp" element={<ProjectTypePage />} />
        <Route path="md-sptyp" element={<SubProjectTypePage />} />
        <Route path="md-mtmp" element={<TemplateMsgPage />} />
        <Route path="ps-cvprj" element={<CreateViewProjectPage />} />
        <Route path="ps-cvsprj" element={<CreateViewSubProjectPage />} />
        <Route path="ps-msstp" element={<Milestonepage />} />
        <Route path="ps-prmon" element={<ProgressMonitorpage />} />
        <Route path="ps-allot" element={<Allotmentpage />} />
        <Route path="stg-smsc" element={<SmsSetting />} />
        <Route path="stg-ecfg" element={<EmailSetting />} />
        <Route path="stg-adms" element={<AdminSetting />} />
        <Route path="um-extl" element={<ExternalUser />} />
        <Route path="um-intl" element={<InternalUserPage />} />
        <Route path="stk-dinfo" element={<StackholderInfoPage />} />
        <Route path="stk-reg" element={<StackRegistrationPage />} />
        <Route path="stk-invst" element={<StackInvestmentPage />} />
        <Route path="stk-with" element={<StackWithdrawlPage />} />
        <Route path="stk-rels" element={<StackReleasePage />} />
        <Route path="stk-pmt" element={<StackPaymentPage />} />
        <Route path="com-wall" element={<WalletPage />} />
        {/* <Route path="com-trsm" element={<TransactionSummary />} /> */}
        <Route path="com-prsm" element={< AdmProjectSummaryPage />} />
        <Route path="stk-eshst" element={< SmsEmailPage />} />
        <Route path="com-bnk" element={< AdminBankInfo/>} />
        <Route path="com-invst" element={< AdminInvesment/>} /> 
        <Route path="com-tpsm" element={< AdminComSummaryPage />} />

        <Route path="unauth" element={< UnAuthorized/>} />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/inv" element={<Layout />} errorElement={<NotFound />}>
        <Route index element={<InvDashboard />} />
        <Route path="inv-cbnk" element={<InvCompanyBank />} />
        <Route path="inv-obnk" element={<InvBankInfo />} />
        <Route path="inv-prjp" element={<InvViewProgress />} />
        <Route path="inv-pmt" element={<InvPayment />} />
        <Route path="inv-invs" element={<InvInvestment />} />
        <Route path="inv-rel" element={<InvCashRelease />} />
        <Route path="inv-sum" element={<InvSummaryPage />} />
        <Route path="inv-wdl" element={<InvWithdrawPage />} />
        <Route path="inv-trn" element={<InvTransferPage />} />
        <Route path="inv-profile" element={<InvProfile />} />
        <Route path="change-pass" element={<ChangePass />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/cust" element={<Layout />} errorElement={<NotFound />}>
        <Route index element={<CustDashboard />} /> 
        <Route path="cst-cbnk" element={<CustComBankInfoPage />} />
        <Route path="cst-obnk" element={<CustBankInfo />} />
        <Route path="cst-vbpr" element={<CustViewProjectPage />} />
        <Route path="cst-psts" element={<CustProjectProgressPage />} />
        <Route path="cst-pmt" element={<CustPaymentPage />} /> 
        <Route path="cst-tsum" element={<CustTransactionPage />} />
        <Route path="cust-profile" element={<CustProfilePage/>} />
        <Route path="change-pass" element={<ChangePass />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  ),
  {
    basename: import.meta.env.BASE_URL
  }
);


