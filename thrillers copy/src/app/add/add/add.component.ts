import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NetworkAvailabilityService } from 'src/app/services/network-availability.service';
import { interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public activityTypes: Array<any>;
  public networkAvailable = true;

  private localStorageKey = 'thrillers-add-queue';

  public activityType: any;

  constructor(private dataService: DataService, 
    private networkAvailability: NetworkAvailabilityService,
    private toastr: ToastrService) {
    dataService.getData('activityTypes')
      .subscribe(data => {
        this.activityTypes = data;
        this.activityTypes = this.activityTypes.sort((a, b) => a.type.localeCompare(b.type) );
      });

      interval(100).subscribe(() => {
        const newNetworkAvailability = networkAvailability.isNetworkAvailable();

        if (this.networkAvailable !== newNetworkAvailability) {
          if (newNetworkAvailability) {
            // going from network unavialble to available
            this.postQueuedEntities();
          }

          console.log('setting AddComponent.networkAvailable to', newNetworkAvailability);
      }
      this.networkAvailable = newNetworkAvailability;

   });
  }

  ngOnInit() {
  }

  public selectActivityType(activityType: any): void {
    // console.log('activityType', activityType);
    this.activityType = activityType;
  }

  public submit(): void {
    // console.log('inside submit');

    const entity = { activity: this.activityTypes.sort((a, b) => .5 - Math.random())[0] };
    // console.log('entity', entity);

    if (!this.networkAvailable) {
      // save to local storage
      const existing = localStorage.getItem(this.localStorageKey);

      const existingArray = JSON.parse(existing) || [];
      console.log('existing array', existingArray);

      existingArray.push(entity);
      localStorage.setItem(this.localStorageKey, JSON.stringify(existingArray));

      this.toastr.success("ERA entry queued.");

      // if (existing === undefined) {
        // localStorage.setItem(this.localStorageKey, JSON.stringify([entity]));
      // } else {
        // JSON.parse(existing).push(entity);
      // }
    } else {
      this.postNewItem(entity);
      this.toastr.success("ERA entry added!");
    }
  }

  public postQueuedEntities(): void {
    const entityArray = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    entityArray.forEach(e => this.postNewItem(e));
    this.toastr.success("Queued entries added to database.")
    localStorage.clear();
  }

  public postNewItem(entity: any): void {
    console.log('posting item', entity);
  }
}
