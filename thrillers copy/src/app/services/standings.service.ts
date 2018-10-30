import { Injectable } from "@angular/core";
import * as jquery from 'jquery';

@Injectable()
export class StandingService {

    constructor() {

    }

    getStandings(): Promise<any> {

        return fetch('https://thrillers-get-standings.azurewebsites.net/api/attempt3');
    }
}