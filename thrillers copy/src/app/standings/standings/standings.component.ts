import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StandingService } from "../../services/standings.service";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  public standingsByCrew: Array<any>;
  public standingsByBU: Array<any>;
  public standings: any;
  public details: any;

  public options = { display: 'bu' };

  constructor(private dataService: DataService,
    private standingService: StandingService) { }

  ngOnInit() {
    this.standings = [];

    this.dataService
    .getData('standings')
    .subscribe(data => {
      this.details = data.find(x => x.name === "Jimmy Hendrix").details;

      this.standingService.getStandings().then(response => {
        console.log('response', response);
        console.log('in response', response.ok);
  
        if (response.ok) {
          response.json().then(json => {
            console.log('json', json);
            this.standings = json;
            this.standingsByBU = this.getBUPoints(this.standings);
            this.standingsByCrew = this.getCrews(this.standingsByBU);
          })
        }
      })
    });
  }

  private getBUPoints(standings: Array<any>): Array<any> {
    var resultArray = [];

    standings.forEach(standing => {
      var result = [];
      var regionExists = resultArray.find(res => res.region === standing.region);

      if (!regionExists) {
        result["region"] = standing.region;
        var standingsInRegion = standings.filter(x => x.region === standing.region);

        var points = 0;
        standingsInRegion.forEach(x => {
          points = points + x.points;
        })
        result["points"] = points;
        result["crews"] = this.getCrewPoints(standingsInRegion);
        result["expanded"] = false;
        resultArray.push(result);
      }
    })

    return resultArray.sort((a, b) => b.points - a.points);
  }

  private getCrewPoints(standings: Array<any>): Array<any> {
    var resultArray = [];

    standings.forEach(standing => {
      var result = [];
      var crewExists = resultArray.find(res => res.crew === standing.performed_by_full_name);

      if (!crewExists) {
        result["crew"] = standing.performed_by_full_name;
        var crewsInRegion = standings.filter(x => x.performed_by_full_name === standing.performed_by_full_name);

        var points = 0;
        var totalPoints = 0;
        crewsInRegion.forEach(x => {
          points = points + x.points;
          totalPoints = totalPoints + x.totalPoints;
        })
        result["points"] = points;
        var lastWeekPoints = Math.floor(Math.random() * 200) + 1;
        result["lastWeekPoints"] = lastWeekPoints;
        result["trend"] = points > lastWeekPoints ? "up" : "down";
        result["details"] = this.details;
        resultArray.push(result);
      }
    })

    return resultArray.sort((a, b) => b.points - a.points);
  }

  public getCrews(standings: any): Array<any> {
    var resultArray = [];

    standings.forEach(bu => {
      bu.crews.forEach(crew => {
        resultArray.push(crew);
      })
    });

    return resultArray.sort((a, b) => b.points - a.points);
  }

  public standingClicked(standing: any): void {
    console.log('clicked on' + standing.region + ' ' + standing.expanded);
    standing.expanded = !standing.expanded;
  }

  public buStandingClicked(bu: any): void {
    bu.expanded = !bu.expanded;
  }
}
