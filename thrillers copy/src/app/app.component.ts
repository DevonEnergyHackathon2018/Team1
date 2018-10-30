import { Component } from '@angular/core';
import { NetworkAvailabilityService } from './services/network-availability.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Exposure Reduction';
  public displayMenu = false;
  public networkAvailable = true;
  public url = '';
  public registrations: Array<ServiceWorkerRegistration>;

  constructor(private networkAvailabilityService: NetworkAvailabilityService) {
    interval(1000).subscribe(() => {
      this.networkAvailable = this.networkAvailabilityService.isNetworkAvailable();
    });

    this.url = networkAvailabilityService.url;

    navigator.serviceWorker.getRegistrations().then(registrations => this.registrations = Array.from(registrations));

    // fetch('http://thrillers-get-standings.azurewebsites.net/api/attempt3')
    // .then(response => {
    //   console.log('response', response);
    //   console.log('in response', response.ok);
    //   if (response.ok) {
    //     response.json().then(json => console.log('json', json));
    //   }
    // }).catch(err => console.log('err', err));
  }

  public toggleMenu(): void {
    this.displayMenu = !this.displayMenu;
  }

  public hardRefresh(): void {
    window.location.reload(true);
  }

  public unregisterServiceWorker(): void {
    navigator.serviceWorker.getRegistrations().then(registrations => registrations.forEach(r => r.unregister()));

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/ngsw-worker.js');
    }
  }
}
