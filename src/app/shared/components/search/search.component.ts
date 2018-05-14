import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
import {ScheduleService} from '../../services/schedule-service.service';
import {Observable} from 'rxjs';
import {Station} from '../../models/station/station';
import {map, startWith} from 'rxjs/operators';

@Component({selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.css']})
export class SearchComponent implements OnInit {
  searchControl: FormControl = new FormControl();

  @Output() search: EventEmitter <any> = new EventEmitter();
  @Output() clear: EventEmitter <any> = new EventEmitter();
  @Input() stations: Station[] = [];

  public filteredStations: Observable<Station[]>;

  constructor() {}

  ngOnInit() {

    this.filteredStations = this.searchControl.valueChanges
      .pipe(
        startWith<string | Station>(''),
        map(value => typeof value === 'string' ? value : value.stationName),
        map(name => name ? this.filter(name) : this.stations.slice())
      );
  }

  filter(name: string): Station[] {
    return this.stations.filter(station =>
      station.stationName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onSearch() {
    let shortCode = '';

    // Because of autocomplete and text search, code must check which way text was added to search field
    if ( typeof this.searchControl.value === 'string') {
      const selectedStation: Station[] = this.stations.filter( station => station.stationName === this.searchControl.value);

      if ( selectedStation.length === 1 ) {
        shortCode = selectedStation[0].stationShortCode;
      }
    } else {
      shortCode = this.searchControl.value.stationShortCode;
    }
    if ( shortCode !== '') {
      this.search.emit(shortCode);
    }

  }
  displayStationName(station?: Station): string | undefined {
    return station ? station.stationName : undefined;
  }
  clearValue() {
    this.searchControl.setValue('');
    this.clear.emit();
  }
  resetAll() {
    this.clear.emit();
  }
}
