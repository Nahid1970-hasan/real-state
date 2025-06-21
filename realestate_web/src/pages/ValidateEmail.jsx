import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { Card, CardBody } from "../components/style/Card_styled"
import { Center } from "../components/style/Center_styled"
import { Container } from "../components/style/Container_styled"
import { Flex } from "../components/style/Flex_styled"
import { Loader } from "../components/style/Loader_styled"
import { Typography } from "../components/style/Typography_styled"
import { Toast } from "../components/Toast"
import NotFound from "./NotFound"

export const ValidateEmail = () => { 
    const { t, i18n } = useTranslation();
    const validEmailData = useSelector((state) => state.validateEmail);
    const dispatch = useDispatch();
    const { token } = useParams();
    const [tokenstr] = useState(token.split(":token=")[1]);

    function validEmail (){
        var data = {
            token: tokenstr
        }
        console.log(data);
       // dispatch(getValidateEmail(data))
    }
    return   <>
    {validEmailData.loading != "idle" ? (
      validEmailData.loading == "failed" || validEmailData.loading == "unauthorized" ? (
        <Toast msg={validEmailData.msg} color="error" />
      ) : (
        <Toast color="success" icon="task_alt" msg={validEmailData.msg} />
      )
    ) : (
      ""
    )}
    <Suspense fallback={<Loader />}>
      <Container>
        <Card color={"bg"}>
          <CardBody>
            {tokenstr != undefined ?validEmailData.loading == "succeeded" ? (
              <Center>
                <Typography fontSize="20px" lineHeight="23px">
                  {t(validEmailData.msg)}
                </Typography> 
              </Center>
            ) :validEmailData.loading == "pending" ? (
              <Loader></Loader>
            ) : (
            <Flex row justifyCenter>
                <Flex md={6}>

                    <Button
                        full
                        color="primary"
                        type="button"
                        fontColor="barFont" 
                        onClick={()=>validEmail()}
                    >
                        {t("active_account")}{" "}
                    </Button>
                </Flex>

            </Flex>
               ) : (
              <NotFound></NotFound>
            )}
          </CardBody>
        </Card>
      </Container>
    </Suspense>
  </>
}