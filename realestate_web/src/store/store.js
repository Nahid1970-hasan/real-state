import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "../features/district/district_slice";
import genderReducer from "../features/gender/gender_slice";
import orgTypeReducer from "../features/orgType/orgType_slice";
import pageReducer from "../features/page/page_slice";
import orgRegistrationSlice from "../features/registration/org_registration_slice";
import userRegistrationSlice from "../features/registration/user_registration_slice";
import thanaReducer from "../features/thana/thana_slice";
import userReducer from "../features/user/user_slice";
import getUserDataReducer from "../features/registration/user_data_slice";

import changePasswordReducer from "../features/changePassword/changePassword_slice";
import profileReducer from "../features/profile/profile_slice";
import profileInv from "../features/invProfile/inv_profile_slice";
import profileCustomer from "../features/custProfile/cust_profile_slice";
import feedbackTypeReducer from "../features/homeFeedback/homeFeedback_slice";
import feedBackReducer from "../features/feedback/feedback_slice";
import loadHomepageDataReducer from "../features/homepage/homepage_slice";
import loadHomepageSrcDataReducer from "../features/homepage/homepage_search_slice";
import getDashboardStatData from "../features/dashboard/dashboard_slice";
import getInvDashboardStat from "../features/dashboard/inv_dashboard_slice";
import getCustDashboardata from "../features/dashboard/cust_dashboard_slice";
import getTodayData from "../features/page/navbar_slice";
import getForgetPass from "../features/resetPassword/forget_password_slice";
import getResetPass from "../features/resetPassword/reset_password_slice";
import getValidateEmail from "../features/resetPassword/validate_email_slice";
import getPhotoGalleryReducer from "../features/bmdPortal/photo_gallery_slice";
import getPubPhotoGalleryReducer from "../features/bmdPortal/pub_photo_gallery_slice";
import getPubAuditLogReducer from "../features/dashboard/pub_audit_log_slice";
import getAdmAuditLogReducer from "../features/dashboard/adm_audit_log_slice";
import getFaqReducer from "../features/faq/faq_slice";
import getRegRequest from "../features/regRequest/reg_req_Slice";
import getProjectType from "../features/projectType/pro_Type_slice";
import getSubProjectType from "../features/subprojecttype/sub_project_type_Slice";
import getMessageTemp from "../features/message/message_Slice";
import getViewProjectReducer from "../features/createViewProject/create_project_slice";
import getViewSubProjectReducer from "../features/createViewSubProject/create_sub_project_slice";
import getSmsSetting from "../features/smsconfig/smsConfig_slice";
import getEmailSetting from "../features/emailConfig/emailConfig_slice";
import getAdminSetting from "../features/adminsettings/admin_settings_slice";
import getExternal from "../features/externalUser/external_Slice";
import getInternal from "../features/InternalUser/internal_user_Slice";
import getRole from "../features/externalUser/userRole_slice";
import getStackInfoReducer from "../features/stackholderInfo/stackholder_info_slice";
import getStackRegistrationReducer from "../features/stackRegistration/stack_registration_slice";
import getStackPaymentReducer from "../features/stackPayments/stack_payment_slice";
import getStackInvestmentReducer from "../features/stackInvestment/stack_investment_slice";
import getStackholderWithdrawlReducer from "../features/stackWithdrawl/stack_withdrawl_slice";
import getStackReleaseReducer from "../features/stackRelease/stack_release_slice";
import getAdminTranctionSum from "../features/adminTransaction/admin_transaction_slice";
import getMilestoneSetup from "../features/milestoneSetup/milestonesetup_slice";
import getProgress from "../features/progress/progress_slice";
import getAllotmentInfo from "../features/allotment/allotment_slice";
import getBankInfo from "../features/bankInfo/admin_bank_info_slice";
import getProSummery from "../features/projectSummery/project_summery_Slice";
import getComSummaryReducer from "../features/projectSummery/company_summary_slice";
import getAdminInvestment from "../features/adminINV/admin_inv_slice";
import getAdminWallet from "../features/adminWallet/wallet_slice";
import getSmsEmailHistory from "../features/smsEmailHist/sms_email_slice";

import getCompanyBnakInfo from "../features/compbankinfo/comp_bank_info_slice";
import getCustViewProjects from "../features/custViewProject/cust_view_project_slice"; 
import getCustPaymentReducer from "../features/custPayment/cust_payment_slice";
import getCustTransaction from "../features/custTransaaction/cust_Transaction_slice";
import getDprogressInfo from "../features/custViewProjectProgress/progress_Slice";
import getViewProjectProgressReducer from "../features/custViewProjectProgress/cust_project_progress_slice";
import getPubFaqDataReducer from "../features/faqConfig/pub_faq_slice";
import getCustBankInfo from "../features/custBankInfo/cust_bank_slice";

import getInvCompanyBnakInfo from "../features/invcompanybank/inv_company_banl_Slice";
import getInvPrgsDropInfo from "../features/invviewprogress/inv_progs_drop_Slice";
import getInvPrgsGridInfo from "../features/invviewprogress/inv_progress_grid_Slice";
import getInvpaymentInfo from "../features/invpayment/inv_payment_Slice";
import getInvInvestmentInfo from "../features/invinvestment/inv_investment_Slice";
import getInvCashReleaseInfo from "../features/invcashrelease/inv_cash_release_Slice";
import getInvSummaryInfo from "../features/invsummary/inv_summary_Slice";
import getInvWithdrawlInfo from "../features/invWithdrawl/inv_withdrawl_slice";
import getInvTransferInfo from "../features/invTransfer/inv_transfer_slice";
import getInvBankInfo from "../features/invBankInfo/inv_bank_slice";



export const store = configureStore({
  reducer: {
    user: userReducer,
    userData: getUserDataReducer,
    page: pageReducer,
    org_registration: orgRegistrationSlice,
    user_registration: userRegistrationSlice,
    gender: genderReducer,
    orgType: orgTypeReducer,
    district: districtReducer, 
    thana: thanaReducer, 
    self: profileReducer,
    invprofile: profileInv,
    custprofile: profileCustomer,
    changePassword: changePasswordReducer, 
    homefeedback: feedbackTypeReducer, 
    feedback: feedBackReducer,
    homePage: loadHomepageDataReducer,
    homepagesrcdata: loadHomepageSrcDataReducer,
    dashboardData: getDashboardStatData,
    invdashboard: getInvDashboardStat,
    custdashboard: getCustDashboardata,
    todayData: getTodayData,
    forgetPass: getForgetPass,
    resetPass: getResetPass,
    validateEmail: getValidateEmail,
    photoGallery: getPhotoGalleryReducer,
    pubphotoGallery: getPubPhotoGalleryReducer,
    pubLogData: getPubAuditLogReducer, 
    admLogData: getAdmAuditLogReducer, 
    pubFaqData: getPubFaqDataReducer,
    faq:getFaqReducer,
    regreq:getRegRequest,
    protype:getProjectType,
    subprotype:getSubProjectType,
    message:getMessageTemp,
    createproject:getViewProjectReducer,
    createsubproject:getViewSubProjectReducer,
    smsConfig:getSmsSetting,
    emailConfig:getEmailSetting,
    adminSettings:getAdminSetting,
    external:getExternal,
    internal:getInternal,
    userrole:getRole,
    stackInfo:getStackInfoReducer,
    stackRegistration:getStackRegistrationReducer,
    stackPayment:getStackPaymentReducer,
    stinvestment:getStackInvestmentReducer,
    stackwithdrawl: getStackholderWithdrawlReducer,
    stackRelease:getStackReleaseReducer,
    tranctionsummary:getAdminTranctionSum,
    milestonesetup:getMilestoneSetup,
    progress:getProgress,
    allotment:getAllotmentInfo,
    bankInfo:getBankInfo,
    prosummary:getProSummery,
    comsummary:getComSummaryReducer,
    adminInv:getAdminInvestment,
    adminWallet:getAdminWallet,
    smshistory:getSmsEmailHistory,

    compbankinfo:getCompanyBnakInfo,
    custProjectData:getCustViewProjects,
    custProjectProgressData:getViewProjectProgressReducer, 
    custPayemntData:getCustPaymentReducer,
    custtransfer:getCustTransaction,
    dprogress:getDprogressInfo,
    custBankInfo:getCustBankInfo,


    invcompbankinfo:getInvCompanyBnakInfo,
    invviewprgs:getInvPrgsDropInfo,
    invprogsview:getInvPrgsGridInfo,
    invpayment:getInvpaymentInfo,
    investment:getInvInvestmentInfo,
    invrelesae:getInvCashReleaseInfo,
    invsummary:getInvSummaryInfo,
    invwithdrawl:getInvWithdrawlInfo,
    invtransfer:getInvTransferInfo,
    invBank:getInvBankInfo
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
