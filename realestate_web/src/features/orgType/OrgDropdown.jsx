import { useRef, useState } from "react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, DownloadButton, PrimaryButton } from "../../components/Button"
import { Card, CardBody } from "../../components/style/Card_styled"
import { Flex } from "../../components/style/Flex_styled"
import { Select } from "../../components/style/Select_styled"
import { OrgUserGrid } from "../orgUser/OrgUserGrid"
import { OrgViewModal } from "../orgSingleUser/OrgViewModal"
import { loadOrg } from "./orgType_slice"
import UnAuthorized from "../../pages/UnAuthorized"
import { OrgEditModal } from "../orgUser/OrgEditModal"
import { OrgUserDelete } from "../orgUser/OrgUserDelete"

export const OrgDropdown = () => {
    const orgType = useSelector(state => state.orgType);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [org_type_id, set_org_type_id] = useState(1);
    const dropDownRef = useRef(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [remove, setRemove] = useState(false);
    const [user_id, set_user_id] = useState(0);
    const [userData, setUserData] = useState({}); 
    useEffect(() => {
        dispatch(loadOrg());
    }, []);


    return orgType.loading === "unauthorized" ? (
        <UnAuthorized />
    ) :

        (
            <>
                        <Flex row>
                            <Flex padding="0 !important" md={3} sm={4} xs={8}>

                                <Select app ref={dropDownRef}>
                                    <option disabled> {t("ph_stake_type")}</option>
                                    {
                                        orgType.list.map((d, i) => (<option key={i} value={d.org_type_id}>{i18n.resolvedLanguage == "bn" ? d.org_type_bn : d.org_type_en}</option>))
                                    }
                                </Select>
                            </Flex>
                            <Flex padding="0 10px 0 0" md={9} sm={8} xs={4}>
                                <DownloadButton margin="4px" onClick={() => { set_org_type_id(dropDownRef.current.value) }}>{t("submit")}</DownloadButton>
                            </Flex>
                            <Flex padding="10px 0 0 0 !impotant" md={12}>
                                <OrgUserGrid setRemove={setRemove} set_user_id={set_user_id} setViewOpen={setViewOpen} setOpen={setOpen} setUserData={setUserData} org_type_id={org_type_id} />
                            </Flex>
                        </Flex>

                <OrgViewModal open={viewOpen} data={{ select_user_id: userData.user_id || 0 }} setOpen={setViewOpen} />
                <OrgEditModal open={open} data={userData} setOpen={setOpen} />
                <OrgUserDelete open={remove} setOpen={setRemove} data={{ user_id }} />
            </>
        )

}
