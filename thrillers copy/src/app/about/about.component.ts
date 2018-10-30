import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public activityTypes: Array<any>;

  constructor(private dataService: DataService) {
    this.dataService
      .getData('activityTypes')
      .subscribe(data => {
        this.activityTypes = data;
        this.activityTypes.sort( (a,b) => b.points - a.points )
      });
  }

  ngOnInit() {
  }

}
