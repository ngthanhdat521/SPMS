import React, { useEffect, useState } from "react";
import Body from "../../../../components/Body/Body.component";
import Group from "../../../../components/ContributionReport/Group/Group.component";
import StageReport from "../../../../components/ContributionReport/StageReport/StageReport.component";
import Header from "../../../../components/Header/Header.component";
import EvaluationStageService from "../../../../services/Supporter/EvaluationStage/EvaluationStage";
import ProjectService from "../../../../services/Supporter/Project/Project";
import { useSearchParams } from "react-router-dom";
import styles from "./ContributionReport.module.scss";

function ContributionReport() {
    const [reports, setReports] = useState([]);
    const [groups, setGroups] = useState([]);
    const [searchParams] = useSearchParams();

    const onLoad = async () => {
        let { data, isSucess } = await ProjectService.loadMyGroup();
        console.log(data);
        if (isSucess) setGroups(data);
    };

    useEffect(onLoad, []);

    useEffect(async () => {
        let projectId = searchParams.get("projectId");
        if (projectId) {
            let { data, isSucess } = await EvaluationStageService.loadByProject(projectId);
            if (isSucess) setReports(data);
        }
    }, [searchParams]);

    return (
        <div className={styles["contribution-report"]}>
            <Header>
                <h5>Contribution Report</h5>
            </Header>
            <Body>
                <div className={styles["contribution-report_container"]}>
                    {searchParams.get("projectId") ? (
                        reports.map((report) => <StageReport {...report} />)
                    ) : (
                        <div className="">
                            <h3 className="mb-5">{groups.length} Groups</h3>
                            <div>
                                {groups.map((group, index) => (
                                    <Group key={index} {...group} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Body>
        </div>
    );
}

export default ContributionReport;
