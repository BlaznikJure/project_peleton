import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Activity{
    id: string;
    name: string;
    time: string;
    distance: number;
    averageSpeed: number;  // Adjusted to match the response
    altitudeGain: number;  // Adjusted to match the response
    trackPoints: [];
}

@Injectable({
  providedIn: 'root',
})

export class ActivityService{

    activities: Activity[] = [];
    constructor(private http: HttpClient){}

    getList(){
        this.http.get<Activity[]>('http://localhost:5138/api/Activity/get/list/activity')
        .subscribe({
          next: (response) => {
            this.activities = response;
          },
          error: (error) => {
            // Optionally handle errors
            console.error('An error occurred:', error);
          }
        });
        console.log(this.activities);
        return this.activities;
        
    }


}