import { Component, OnInit, Input } from '@angular/core';
import { Train, TimeTableRow } from '../../models/train/train';
import { Station } from '../../models/station/station';

@Component({
  selector: 'app-train-table',
  templateUrl: './train-table.component.html',
  styleUrls: ['./train-table.component.css']
})
export class TrainTableComponent implements OnInit {
  displayedColumns = ['trainNumber', 'trainDepartureStation', 'trainArrivalStation', 'trainTime'];
  @Input() dataSource: Train[];
  @Input() stations: Station[];
  @Input() selectedStationShortCode: string;
  @Input() type: string;

  constructor() { }

  ngOnInit() {

  }

  getTrainDepartureStation(train: Train) {
    const departureStationShortName = train.timeTableRows[0].stationShortCode;
    const departureStation: Station[] =
      this.stations.filter( station => station.stationShortCode === departureStationShortName);

    if (departureStation.length === 0 ) {
      return departureStationShortName;
    } else {
      return departureStation[0].stationName;
    }
  }
  getTrainArrivalStation(train: Train) {
    const arrivalStationShortName = train.timeTableRows[train.timeTableRows.length - 1].stationShortCode;

    const arrivalStation: Station[] =
      this.stations.filter( station => station.stationShortCode === arrivalStationShortName);

    if (arrivalStation.length === 0 ) {
        return arrivalStationShortName;
      } else {
        return arrivalStation[0].stationName;
      }
    }
  getSelectedStationTime(train: Train) {
    if ( this.type === 'ARRIVAL') {
      const arrival: TimeTableRow[] = train.timeTableRows.filter(
        timeTableRow =>
        timeTableRow.stationShortCode === this.selectedStationShortCode &&
        timeTableRow.type === 'ARRIVAL');
        if ( arrival.length === 1 && arrival[0].scheduledTime !== undefined ) {
          return arrival[0].scheduledTime;
        } else {
          return '';
        }

      } else {

        const departure: TimeTableRow[] = train.timeTableRows.filter(
          timeTableRow => timeTableRow.stationShortCode === this.selectedStationShortCode &&
          timeTableRow.type === 'DEPARTURE');
        if ( departure.length === 1 && departure[0].scheduledTime !== undefined ) {
          return departure[0].scheduledTime;
        } else {
          return '';
        }

      }
    }
    getTimeText() {
      if ( this.type === 'DEPARTURE') {
        return 'Lähtee';
      } else {
        return 'Saapuu';
      }
    }
}
