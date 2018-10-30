import { Injectable, Output } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkAvailabilityService {

  private networkAvailable = true;
  public url = '/path-that-does-not-exist';

  constructor(public updates: SwUpdate) {
    if (updates.isEnabled) {
      interval(5000).subscribe(() => {
        fetch(this.url)
          .then(response => {
            // console.log('got back a response from ping url');
            this.networkAvailable = response.status < 500;
          })
          .catch(x => {
            // console.log('got back a FAILURE from ping url');
            this.networkAvailable = false;
          });
        // console.log('checking to see if the network is running');
      });
    }
  }

  public isNetworkAvailable(): boolean {
    return this.networkAvailable;
  }
}
