import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../models/station/station';
import { Train } from '../models/train/train';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  apiRootTrains = 'https://rata.digitraffic.fi/api/v1/live-trains/station/';
  apiRootStations = 'https://rata.digitraffic.fi/api/v1/metadata/stations';

  parameters = '?arrived_trains=0&arriving_trains=20&departed_trains=0&departing_trains=20';

  constructor(private http: HttpClient) {
  }

  getAllStations() {
    return this.http.get<Station[]>(this.apiRootStations);
  }

  getTrains(stationShortCode) {
    const apiUrl = this.apiRootTrains +  stationShortCode + this.parameters;
    console.log(apiUrl);
    return this.http.get<Train[]>(apiUrl);
  }
}
