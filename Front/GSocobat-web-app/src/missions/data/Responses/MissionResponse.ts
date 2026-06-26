export type MissionResponse = {
  id: number;
  missionTypeId: number;
  assetId: number;
  missionTitle: string;
  distance?: number;
  startDate: string;
  endDate: string;
  hours?: number;
  employeeName: string;
  constructionSiteAddress?: string;
  missionDesc?: string;
  fromAddress?: string;
  toAddress?: string;
};