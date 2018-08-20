import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../shared/services/schedule-service.service';
import { Train, TimeTableRow } from '../shared/models/train/train';
import { Station } from '../shared/models/station/station';
import { TableRow } from '../shared/models/table-row/table-row';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private schedulerService: ScheduleService) { }

  private readonly departureType = 'DEPARTURE';
  private readonly arrivalType = 'ARRIVAL';
  private readonly commuterTrainP = 'P';
  private readonly commuterTrainI = 'I';
  private readonly trainCategoryLD = 'Long-distance';
  private readonly trainCategoryCommuter = 'Commuter';
  private readonly commuterNamePrefix = 'Commuter train ';

  private trains: Train[] = [];

  tableRowsDeparture: TableRow[] = [];
  tableRowsArrival: TableRow[] = [];
  stations: Station[] = [];

  ngOnInit() {
    this.getPassengerStations();
  }
  getPassengerStations() {
    this.schedulerService.getAllStations().subscribe((stationsAll => {
    this.stations = stationsAll.filter(station => station.passengerTraffic === true);
    }));
  }

  search(stationShortCode: string) {
    this.clear();

    this.schedulerService.getTrains(stationShortCode).subscribe(trains => {
      trains.map( train => {
        console.log(train);

        // Remove internal trains
        if ( train.commuterLineID === this.commuterTrainI || train.commuterLineID === this.commuterTrainP) {
          return;
        }
        // Remove cargo etc. trains
        if ( train.trainCategory !== this.trainCategoryLD && train.trainCategory !== this.trainCategoryCommuter) {
          return;
         }

         const departure: TimeTableRow = train.timeTableRows.find( timeTable =>
          timeTable.stationShortCode === stationShortCode && timeTable.type === this.departureType );
        const arrival: TimeTableRow = train.timeTableRows.find( timeTable =>
          timeTable.stationShortCode === stationShortCode && timeTable.type === this.arrivalType );

        if ( departure ) {
          this.createTableRowsForDeparture(train, departure);
        }

        if ( arrival ) {
          this.createTableRowsForArrival(train, arrival);
        }
      });
    });

  }
  private createTableRowsForDeparture(train: Train, departure: TimeTableRow) {

    const tableRow: TableRow = <TableRow>{};

    this.populateTableRowGeneral( train, tableRow );

    tableRow.selectedStationTime = departure.scheduledTime;
    tableRow.type = this.departureType;
    tableRow.actualTime = departure.actualTime;
    tableRow.trainCancelled = departure.cancelled;

    this.tableRowsDeparture.push(tableRow);
  }

  private createTableRowsForArrival(train: Train, arrival: TimeTableRow) {

    const tableRow: TableRow = <TableRow>{};

    this.populateTableRowGeneral( train, tableRow );

    tableRow.selectedStationTime =  arrival.scheduledTime;
    tableRow.type = this.arrivalType;
    tableRow.actualTime = arrival.actualTime;
    tableRow.trainCancelled =  arrival.cancelled;

    this.tableRowsArrival.push(tableRow);
  }

  private populateTableRowGeneral( train: Train, tableRow: TableRow ) {
    tableRow.trainName =
      train.commuterLineID !== '' ? this.commuterNamePrefix + train.commuterLineID : train.trainType + ' ' + train.trainNumber;
    tableRow.departingStation = this.getStationName(train.timeTableRows[0].stationShortCode);
    tableRow.arrivalStation = this.getStationName(train.timeTableRows[train.timeTableRows.length - 1].stationShortCode);
  }

  getStationName( stationShortCode ) {
    const station: Station = this.stations.find( current => current.stationShortCode === stationShortCode );

    if ( station ) {
      return station.stationName;
    } else {
      return stationShortCode;
    }
  }
  clear() {
    this.tableRowsArrival = [];
    this.tableRowsDeparture = [];
  }

}
