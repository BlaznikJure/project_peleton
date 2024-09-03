import { Component, OnInit, inject } from '@angular/core';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { HttpClient } from '@angular/common/http';
import { ActivityService } from '../shared/activity.service';

interface Activity{
  id: string;
  name: string;
  time: string;
  distance: number;
  averageSpeed: number;  // Adjusted to match the response
  altitudeGain: number;  // Adjusted to match the response
  trackPoints: [];
}

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [ActivityCardComponent, UploadFileComponent],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})


export class ActivityListComponent {

  private activityService = inject(ActivityService);

  // activities: Activity[] = [];
  constructor(private http: HttpClient){}

  // ngOnInit() : void{
  //   this.getList();
  // }

  activities = this.activityService.getList();

}
