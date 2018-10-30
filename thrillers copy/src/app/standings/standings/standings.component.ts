import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  public standingsByCrew: Array<any>;
  public standingsByBU: Array<any>;

  public options = {display: 'bu'};

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService
      .getData('standings')
      .subscribe(data => {
        this.standingsByCrew = data.sort((a, b) => b.points - a.points );
        this.standingsByCrew.forEach(s => s.expanded = false);

        this.standingsByBU = Array.from(new Set(data.map(s => s.BU)))
          .map(bu => ({ 'name': bu, 'crews': data.filter(crew => crew.BU === bu)}));

        this.standingsByBU.forEach(bu => {
          bu.points = bu.crews.map(crew => crew.points).reduce((total, num) => total + num);
        });

        this.standingsByBU.sort((a, b) => b.points - a.points);
      });
  }

  public standingClicked(standing: any): void {
    console.log('clicked on' + standing.name + ' ' + standing.expanded);

    // const setStandingExpandedTo = !standing.expanded;
    // this.standings.forEach(s => s.expanded = false);
    standing.expanded = !standing.expanded;
  }
}
