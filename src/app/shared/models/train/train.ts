export class Train {
  trainNumber: number;
  departureDate: string;
  operatorUICCode: number;
  operatorShortCode: string;
  trainType: string;
  trainCategory: string;
  commuterLineID: string;
  runningCurrently: boolean;
  cancelled: boolean;
  version: number;
  timetableType: string;
  timetableAcceptanceDate: string;
  timeTableRows: TimeTableRow[];
}

export class TimeTableRow {
  stationShortCode: string;
  stationUICCode: number;
  countryCode: string;
  type: string;
  trainStopping: boolean;
  commercialStop?: boolean;
  commercialTrack: string;
  cancelled: boolean;
  scheduledTime: string;
  actualTime?: string;
  differenceInMinutes?: number;
  causes: Cause[][];
  trainReady?: TrainReady;
  liveEstimateTime?: string;
  estimateSource?: string;
}

export class TrainReady {
  source: string;
  accepted: boolean;
  timestamp: string;
}

export class Cause {
  categoryCode: string;
  detailedCategoryCode?: string;
  thirdCategoryCode?: string;
  categoryCodeId: number;
  detailedCategoryCodeId?: number;
  thirdCategoryCodeId?: number;
}
