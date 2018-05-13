import { Component, OnInit, Input } from '@angular/core';
import { Train, TimeTableRow } from '../../models/train/train';
import { Station } from '../../models/station/station';
import { TableRow } from '../../models/table-row/table-row';

@Component({
  selector: 'app-train-table',
  templateUrl: './train-table.component.html',
  styleUrls: ['./train-table.component.css']
})
export class TrainTableComponent implements OnInit {
  displayedColumns = ['trainName', 'departingStation', 'arrivalStation', 'selectedStationTime'];
  @Input() dataSource: TableRow[];
  @Input() stations: Station[];
  @Input() selectedStationShortCode: string;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
    this.dataSource = this.dataSource.sort((a, b) => {
      if ( a.selectedStationTime > b.selectedStationTime ) {
        return 1;
      }
      if ( b.selectedStationTime > a.selectedStationTime ) {
        return -1;
      }
    });
  }
  getColor(tableRow: TableRow) {
    if ( tableRow.trainCancelled) {
      return 'lightgrey';
    } else {
      return '';
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
