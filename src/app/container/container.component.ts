import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../shared/services/schedule-service.service';
import { Train, TimeTableRow } from '../shared/models/train/train';
import { Station } from '../shared/models/station/station';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(private schedulerService: ScheduleService) { }

  trains: Train[] = [];
  arrivalTimeTrains: Train[] = [];
  departureimeTrains: Train[] = [];
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
    this.schedulerService.getTrains(stationShortCode).subscribe(trains => {
      // Filter only stations which has passenger traffic
      this.trains = trains;
    });
    this.selectedStationShortCode = stationShortCode;
  }
  clear() {
    this.stations = [];
  }

}
