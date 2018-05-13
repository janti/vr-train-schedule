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

  private allTrains: Train[] = [];
  private trains: Train[] = [];

  tableRowsDeparture: TableRow[] = [];
  tableRowsArrival: TableRow[] = [];
  stations: Station[] = [];
  selectedStationShortCode = '';

  ngOnInit() {
    this.getPassengerStations();
  }
  getPassengerStations() {
    this.schedulerService.getAllStations().subscribe((stationsAll => {
    // Filter only stations which has passenger traffic
    this.stations = stationsAll.filter(station => station.passengerTraffic === true);
    }));
  }
  search(stationShortCode: string) {
    this.clear();

    this.schedulerService.getTrains(stationShortCode).subscribe(trains => {
      trains.map( train => {
        if ( train.trainCategory !== 'Long-distance') {
          return;
        }
        const departure: TimeTableRow = train.timeTableRows.find( timeTable =>
          timeTable.stationShortCode === stationShortCode && timeTable.type === 'DEPARTURE' );
        const arrival: TimeTableRow = train.timeTableRows.find( timeTable =>
          timeTable.stationShortCode === stationShortCode && timeTable.type === 'ARRIVAL' );

        const stationTime = '';

        if ( departure ) {
          const tableRow: TableRow = {
            trainName:  train.trainType + train.trainNumber,
            departingStation: this.getStationName( train.timeTableRows[0].stationShortCode ),
            arrivalStation: this.getStationName( train.timeTableRows[train.timeTableRows.length - 1].stationShortCode),
            selectedStationTime: departure.scheduledTime,
            type: 'DEPARTURE',
            actualTime: departure.actualTime,
            trainCancelled: departure.cancelled
          };
          this.tableRowsDeparture.push(tableRow);
        }
        if ( arrival ) {
          const tableRow: TableRow = {
            trainName:  train.trainType + train.trainNumber,
            departingStation: this.getStationName(train.timeTableRows[0].stationShortCode),
            arrivalStation: this.getStationName( train.timeTableRows[train.timeTableRows.length - 1].stationShortCode ),
            selectedStationTime: arrival.scheduledTime,
            actualTime: arrival.actualTime,
            type: 'ARRIVAL',
            trainCancelled: train.cancelled
          };
          this.tableRowsArrival.push(tableRow);
        }
      });
    });

    this.selectedStationShortCode = stationShortCode;
    console.log(this.tableRowsArrival);

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
