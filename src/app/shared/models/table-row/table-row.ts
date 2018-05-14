export class TableRow {
    trainName: string; // train name
    departingStation: string; // departing station for whole trip
    arrivalStation: string; // arrival station for whole trip
    selectedStationTime: string; // time when train is in selected station
    actualTime: string; // actial time if train is delayed or before schedule
    type: string; // DEPARTURE or ARRIVAL informs
    trainCancelled: boolean; // Informs if whole train is cancelled
}
