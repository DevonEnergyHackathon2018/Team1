import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  public standingName: any;
  private sub: any
  public standing: any;
  public standings: any;
  public streaks: any;
  public streak: any;
  public safeObservationsAve: number;

  constructor(private route: ActivatedRoute, 
    private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.standingName = params['standingName'];

      this.dataService
      .getData('standings')
      .subscribe(data => {
        this.standings = data;
        this.standing = data.find(x => x.name === this.standingName);

        this.standing.details.forEach(detail => {
          let sum = 0;
          this.standings.forEach(element => {
            element.details.forEach(elementDetail => {
              if (detail.activityId === elementDetail.activityId) {
                sum = sum + elementDetail.points;
              }
            })
          })
          detail["average"] = sum/this.standings.length;
        })
      });

      this.dataService
      .getData('streaks')
      .subscribe(data => {
        this.streaks = data;
        this.streak = data.find(x => x.name === this.standingName);
      });


    })

    
  }

}
