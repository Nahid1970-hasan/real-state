import { Suspense } from "react";
import { CardBody, InfoCard, ShadowCard } from "../components/style/Card_styled";
import { Center } from "../components/style/Center_styled";
import { Flex } from "../components/style/Flex_styled";
import { Loader } from "../components/style/Loader_styled";
import { Typography } from "../components/style/Typography_styled";
import { Container } from "../components/style/Container_styled";
import { SubTitleText } from "../components/StaticText/SubTitleText";
import { ContentText } from "../components/StaticText/ContentText";

export const PrivacyPolicyPage = () => {
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
                                    fontFamily="var(--dashboard-font)"
                                    notResize
                                >
                                    Privacy Policy
                                </Typography>
                            </Center>
                        </Flex>
                    </Flex>
                    <Flex row>
                        <ContentText>BMD built the BMD Current Weather as a Free app. This SERVICE is provided by BMD at no cost and is intended for use as is.</ContentText><br />
                        <br />
                        <ContentText>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</ContentText><br />
                        <br />
                        <ContentText>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</ContentText><br />
                        <br />
                        <ContentText>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at BMD Current Weather unless otherwise defined in this Privacy Policy.</ContentText><br />
                        <br />
                        <br />
                        <ContentText>Any organization or individual refered here as stackholder who is willing to work with weather or climate data can use the app. In order to use the app organiztion and/or individual need to register into the AIS. AIS will collect weather and climate products, forecast, alert/ warning and weather related information/ data from Forecast Production System, IFMSS and concerned databases & system of BMD. AIS will then disseminate those collected information to concerned stakeholders through the app automatically or upon requests from the stakeholders.

                            Weather and climate data have wide range of usage by wide range of users.
                            <SubTitleText>The following are the different types of data: </SubTitleText>
                            <ContentText list>Seismic Data</ContentText>
                            <ContentText list>Astronomical Data</ContentText>
                            <ContentText list>Upper Air Data</ContentText>
                            <ContentText list>Meteorological Data</ContentText>
                            <ContentText list>Agromet Data</ContentText>
                            <SubTitleText>The Following are the users group of weather and climate data: </SubTitleText>
                            <ContentText list>Academics and students of various national and international educational institutes</ContentText>
                            <ContentText list> President's Office, Prime Minister's Office, Army, Navy, Air Force, Coast Guard, All DCs, Departmental Offices, Islamic Organizations & National Media
                            </ContentText>
                            <ContentText list> ISPR (National Media)</ContentText>
                            <ContentText list>national and international development corporate institutes</ContentText>
                            <ContentText list>Agromet Data</ContentText>
                            <ContentText list>national and international insurance companies </ContentText>
                            <ContentText list> sident's Office, Prime Minister's Office, Army, Navy, Air Force, Coast Guard, All DCs, Departmental Offices, Islamic Organizations & National Media
                            </ContentText>
                            <ContentText list> National Moon Sighting Committee (Islamic Foundation), SWC Dhaka, M&GC Ctg. and all the departmental observatories
                            </ContentText>

                            <ContentText list>Ministry of Public Administration, Islamic Foundation, BG Press and other publishing houses
                            </ContentText>
                            <ContentText list>Navy, Air Force, DB, SB, SWC Dhaka and M&GC Ctg.</ContentText>
                            <ContentText list> All national and international insurance companies and shipping agencies
                            </ContentText>

                            In order to use the app organiztion and/or individual need to register into the AIS. Just after installing the app in the mobile it will promt user to get register. Once the user is registered he/she will get desired data from the app.
                            There is no content in the  app for which users will need to pay</ContentText>
                        <SubTitleText>Information Collection and Use</SubTitleText> <br />
                        <br />

                        <ContentText >For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained by us and used as described in this privacy policy.</ContentText> <br />
                        <br />
                        <ContentText >The app does use third party services that may collect information used to identify you.</ContentText><br />
                        <ContentText >Link to privacy policy of third party service providers used by the app</ContentText><br /><br />
                        <ContentText list>Google Play Services</ContentText><br /><br />
                        <SubTitleText>Log Data</SubTitleText>
                        <ContentText>We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</ContentText>
                        <SubTitleText>Cookies</SubTitleText>
                        <ContentText>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.</ContentText><br /><br />
                        <ContentText>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</ContentText>
                        <SubTitleText> Service Providers</SubTitleText><br />
                        <ContentText>We may employ third-party companies and individuals due to the following reasons:</ContentText>
                        <ContentText list>To facilitate our Service;</ContentText><br />
                        <ContentText list>To provide the Service on our behalf;</ContentText><br />
                        <ContentText list>To perform Service-related services;</ContentText><br />
                        <ContentText list> or  To assist us in analyzing how our Service is used.</ContentText><br />
                        <ContentText>
                            We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
                        </ContentText>
                        <br />
                        <SubTitleText>Security</SubTitleText>
                        <ContentText>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</ContentText>
                        <SubTitleText>Links to Other Sites</SubTitleText>
                        <ContentText>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</ContentText>

                        <SubTitleText>Children’s Privacy</SubTitleText>
                        <ContentText>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</ContentText>
                        <SubTitleText>Changes to This Privacy Policy</SubTitleText>
                        <ContentText>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</ContentText>

                    </Flex>
               </ShadowCard>
                </Flex>
              
                    
           
            </Suspense>
        </Container>
    );
};
