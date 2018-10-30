import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NetworkAvailabilityService } from '../services/network-availability.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public people: Array<any>;
  public url = '';

  constructor(private dataService: DataService, private networkAvailabilityService: NetworkAvailabilityService) {
    this.url = networkAvailabilityService.url;
  }

  ngOnInit() {
    // this.dataService.getData('people').subscribe(data => this.people = data);
  }

}
