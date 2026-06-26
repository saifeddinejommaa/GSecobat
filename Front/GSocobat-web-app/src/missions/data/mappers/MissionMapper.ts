import type { Mission } from "../../domain/models/Mission";
import type { MissionResponse } from "../Responses/MissionResponse";

export function MapToMissionModel(response:MissionResponse) : Mission {
    return {
        assetId : response.assetId,
        employeeName : response.employeeName,
        startDate : response.startDate,
        endDate : response.endDate,
        id : response.id,
        missionTitle: response.missionTitle,
        missionTypeId : response.missionTypeId,
        distance : response.distance,
        constructionSiteAddress : response.constructionSiteAddress,
        fromAddress: response.fromAddress,
        hours : response.hours,
        missionDesc: response.missionDesc,
        toAddress : response.toAddress,
    }
}