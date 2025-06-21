import { Suspense } from "react";
import styled from "styled-components";
import { CardBody, InfoCard } from "./style/Card_styled";
import { Center } from "./style/Center_styled";
import { Loader } from "./style/Loader_styled";
import { Select } from "./style/Select_styled";
import { Typography } from "./style/Typography_styled";
import { DateTime } from "luxon";
import { memo } from "react";

const CustSelect = styled(Select)`
  margin-top: 0;
  background-color: #eaeced;
`;
const CustSection = styled.div`
  width: 100%;
  padding: 5px;
  text-align: center;
  border: 2px solid #000;
  margin: ${({ margin }) => (margin ? margin : "10px 0")};
`;
const CardArea = styled.div`
  max-height: 400px;
  overflow: auto;
`;

const CustDiv = styled.div`
  width: 100%;
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  margin: ${({ margin }) => (margin ? margin : "0")};
  border-bottom: ${({ uLine }) => (uLine ? uLine : "0")};
`;
function WeatherInfo({pageLoading,type,selectType,name,onchange,divisionData,divPos=0}){
    console.log(divPos);
    const gettimeDay = (data) => {
        var am9 = DateTime.now().set({ hour: 9, minute: 0, second: 0 });
        var pm12 = DateTime.now().set({ hour: 12, minute: 0, second: 0 });
        var pm3 = DateTime.now().set({ hour: 15, minute: 0, second: 0 });
        var pm6 = DateTime.now().set({ hour: 18, minute: 0, second: 0 });
        var ddd = DateTime.now();
        return data ?? ddd > pm6
          ? data.sky_state_6pm
          : ddd > pm3
          ? data.sky_state_3pm
          : ddd > pm12
          ? data.sky_state_12pm
          : ddd > am9
          ? data.sky_state_9am
          : data.sky_state_6pm;
      };
    return (
        <Suspense fallback={<Loader />}>
    <>
      {pageLoading == "succeeded" && divisionData.length ? (
        <InfoCard position="initial">
          <CardBody>
            <Center>
              <Typography
                fontSize="18px"
                textAlign="center"
                fontWeight="bold"
              >
                Today's Condition
              </Typography>
              <Typography
                fontSize="18px"
                textAlign="center"
                fontWeight="bold"
              >
                {type}
              </Typography>

              <CustSection>
                <CustSelect
                  name={selectType}
                  onChange={onchange}
                  value={divisionData[divPos][name]}
                >
                  {divisionData?.map((d, i) => (
                    <option value={d[name]} key={i}>
                      {d[name]}
                    </option>
                  ))}

                  {/* {thanaList?.list.map((d,i)=> <option value={d.org_type_id} key={i}>{d.org_type_en}</option>)} */}
                </CustSelect>
              </CustSection>
              <Typography
                fontSize="16px"
                textAlign="center"
                fontFamily="PoppinsRegular"
                fontWeight="bold"
              >
                Temperature
              </Typography>
            </Center>
            <CustDiv>
              <Typography fontSize="12spx">MAX:</Typography>
              <Typography fontSize="12px">
                {parseFloat(divisionData[divPos].temp_max).toFixed(2)}°C
              </Typography>
            </CustDiv>
            <CustDiv>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                MIN:
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {parseFloat(divisionData[divPos].temp_min).toFixed(2)}°C
              </Typography>
            </CustDiv>
            <Center>
              <Typography
                fontSize="15px"
                textAlign="center"
                fontFamily="PoppinsRegular"
                fontWeight="bold"
              >
                Sky State
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
                margin="5px 0"
              >
                {gettimeDay(divisionData[divPos]) ?? "-------"}
              </Typography>
              <Typography
                fontSize="15px"
                textAlign="center"
                fontFamily="PoppinsRegular"
                fontWeight="bold"
              >
                Sunrise & Sunset
              </Typography>
            </Center>
            <CustDiv>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                Sunrise:{" "}
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {divisionData[divPos].sunrise}
              </Typography>
            </CustDiv>
            <CustDiv uLine="2px solid">
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                Sunset:{" "}
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {divisionData[divPos].sunset}
              </Typography>
            </CustDiv>
            <CustDiv margin="15px 0 0 0">
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                Rainfall:{" "}
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {divisionData[divPos].rainfall} mm
              </Typography>
            </CustDiv>
            <CustDiv>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                Wind Speed:{" "}
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {divisionData[divPos].wind_speed} kph
              </Typography>
            </CustDiv>
            <CustDiv>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                Morning Humidity:{" "}
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {divisionData[divPos].morning_humidity}%
              </Typography>
            </CustDiv>
            <CustDiv>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                Evening Humidity:{" "}
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {divisionData[divPos].evening_humidity}%
              </Typography>
            </CustDiv>
            <CustDiv>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                Surface Pressure:{" "}
              </Typography>
              <Typography
                fontSize="12px"
                textAlign="center"
                fontWeight="bold"
              >
                {parseFloat(
                  divisionData[divPos].surface_pressure
                ).toFixed(2)}{" "}
                hPa
              </Typography>
            </CustDiv>
          </CardBody>
        </InfoCard>
      ) : (
        <Loader />
      )}
    </>
  </Suspense>
    );
}
export default memo(WeatherInfo);