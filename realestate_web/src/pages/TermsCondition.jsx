import { Suspense } from "react";
import { InfoCard, ShadowCard } from "../components/style/Card_styled";
import { Center } from "../components/style/Center_styled";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { Typography } from "../components/style/Typography_styled";
import { Container, ContainerBody } from "../components/style/Container_styled";
import { SubTitleText } from "../components/StaticText/SubTitleText";
import { ContentText } from "../components/StaticText/ContentText";

export const TermsConditionPage = () => {
  return (
    <Container border="none" >
      <Suspense fallback={<Loader />}>
        <Flex md={12}>
        <ShadowCard padding="10px 30px">
          <Flex row>
            <Flex md={12}>
              <Center>
                <Typography
                  fontSize="bodyTitleFontSize"
                  textAlign="center"
                  fontWeight="bold"
                >
                  Terms and Conditions
                </Typography>
              </Center>
            </Flex>
          </Flex>
          <Flex row>
            <Flex md={12}>
              <Typography
                fontSize="bodySubTitleFontSize"
                textAlign="left"
                fontWeight="bold"
              >
                Terms and Conditions (Ts and Cs) of SRE User Agreement
              </Typography>
            </Flex>
            <Flex padding={"0"} md={12}>
              <Typography textAlign="justify">
                Selim Real Estate(SRE) is designed, customized,
                commissioned, owned and operated by EED to execute its
                suppliers/ tenderers enlistment, renewal and procurement
                activities.Selim Real Estate(SRE) is designed,
                customized, commissioned, owned and operated by EED to execute
                its suppliers/ tenderers enlistment, renewal and procurement
                activities.
              </Typography>
            </Flex>
            <Flex md={12}>
              <Typography
                fontSize="bodySubTitleFontSize"
                textAlign="left"
                fontWeight="bold"
              >
                Tenderer Enlistment Request, Email Verification, and Credential
                Documents Verification
              </Typography>
            </Flex>
            <Flex padding={"0"} md={12}>
              <Typography
                fontSize="bodySubTitleFontSize"
                textAlign="left"
                fontWeight="bold"
              >
                Email verification:
              </Typography>
            </Flex>
            <Flex padding={"8px 0 0 0"} md={12}>
              <Typography textAlign="justify">
                Your email will be used as the user name for accessing OTD
                System. Upon submission of your{" "}
                <div style={{ fontWeight: "bold", display: "contents" }}>
                  "New Enlistment"
                </div>{" "}
                button from the home page of SRE Portal, you will receive in
                the email provided by you, an email fromsystem adminwith a link
                to click, your unique security key, and other instruction
                related to your credential documents verification, and payment
                process. When you click the link provided in your email, an
                email verification page with a form will open. You need to enter
                the email, password and the received security key, and Press the{" "}
                <div style={{ fontWeight: "bold", display: "contents" }}>
                  {" "}
                  "Submit"{" "}
                </div>{" "}
                button. If you correctly enter the information, this process
                will complete the email verification process successfully.
              </Typography>
            </Flex>
            <Flex padding={"8px 0 0 0"} md={12}>
              <Typography textAlign="justify">
                With that your account will be successfully created, and you
                will be displayed another form for entering your specific
                information, upload digitally scanned mandatory credential
                documents (scanned documents of Company registration
                Certificate, Tax and VAT clearance certificate, Valid Trade
                license, National ID of Contact Person, must be easily
                readable).
              </Typography>
            </Flex>
            <SubTitleText>Credential documents verification:</SubTitleText>
            <ContentText>
              After verification of the original credential documents, Tenderer
              gets the Confirmation email notification of registration and will
              instantly get full access to secured personal dashboard for user
              specific functions of the OTD system as the User.
            </ContentText>
            <SubTitleText>Maintaining Confidentiality:</SubTitleText>
            <ContentText>
              Users are responsible for maintaining the confidentiality of their
              password and are fully responsible for all activities that occur
              using your account (email ID and password). Users must ensure that
              they appropriately log-out every time from their unattended
              computers or from the computers you are using in public places.
              EED is not liable for any loss or damage arising from such
              compromise of your user account and password.
            </ContentText>
            <ContentText>
              The OTD System allows modifying, updating their user details
              including password. But it does not allow to change the login
              email ID and the name of the company provided during registration
              process.
            </ContentText>
            <SubTitleText>
              Internet Browser and Users Computer compatibility:
            </SubTitleText>
            <ContentText>
              To access the OTD System securely, users should use appropriate
              web browsers and their associated security settings. However,
              because of the rapid development of new browsers and new security
              measures come up frequently, users need to update or install new
              components and configuration settings as and when these come into
              effect. Current version of OTD system can be best viewed at
              Internet Explorer, Google Chrome, Opera Mozilla Firefox browsers.
            </ContentText>
            <SubTitleText>Proprietary Rights:</SubTitleText>
            <ContentText>
              This OTD Portal is developed and maintained by EED of the
              Government of Bangladesh. The materials located on this OTD System
              web portal including the information and software programs (source
              code) are copyrighted to EED and operating system, tools, and
              other software and contents used for the operation of SRE Portal
              are licensed to or controlled by EED.
            </ContentText>
            <SubTitleText>Auto alert and User Dashboard Inbox:</SubTitleText>
            <ContentText>
              Users may choose to select automatic alert services through the
              configuration in preference section of their dashboard. Each auto
              alert will be sent to users via preferred channel (i.e. email or
              SMS), and by default same will be seen in the users’ inbox
              available in their SRE Dashboard. If the user does not receive
              auto alerts because of some third party component or system
              failure or for any other reason, the users must check their inbox
              for such alerts/notifications and communications.
            </ContentText>
            <SubTitleText>Enlistment Charge:</SubTitleText>
            <ContentText>
              Tenderers is charged Tk. 5000 for the enlistment and the user of
              the system. Annual renewal fee is Tk. 2000.
            </ContentText>
            <SubTitleText>Tender Submission:</SubTitleText>
            <ContentText>
              The Tenderers are responsible to plan their time sufficient to
              complete the documents upload, third party transactions like
              Tender security preparation and submission through banks, verify
              completeness of tender, and final submission of tenders documents
              for the specific tenders. Before final submission, the Tenderer
              may upload documents, fill-in required online forms, modify and
              verify the documents, and complete other activities part by part.
              But attempt to submit incomplete tender will not be allowed by the
              SRE.
            </ContentText>
            <SubTitleText>Payment Process:</SubTitleText>
            <ContentText>Online payment process.</ContentText>
            <SubTitleText>Virus and Integrity of documents:</SubTitleText>
            <ContentText>
              If the electronic records entered online and files containing the
              Tender are corrupt, contain a virus, or are unreadable for any
              reason, the tender will not be considered. It is strictly the
              responsibility of the Tenderer to ensure the integrity,
              completeness and authenticity of the Tender / Proposal, and also
              should comply with the applicable laws of Bangladesh.
            </ContentText>
          </Flex>
          <Flex row>
            <Flex md={12}>
              <Typography fontSize="13px" textAlign="left">
                Issued on 2 June, 2023
              </Typography>
            </Flex>
          </Flex>
  
        </ShadowCard>
        </Flex>
        
        
      </Suspense>
    </Container>
  );
};
