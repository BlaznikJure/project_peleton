import { Component } from '@angular/core';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import * as xml2js from 'xml2js';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [ActivityCardComponent, UploadFileComponent],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent {
  
  activities = [
    {
      name: 'Morning Run',
      time: '2 hours ago',
      distance: 5.3,
      avgSpeed: 8.2,
      elevationGain: 150,
      duration: '45:23'
    },
    {
      name: 'Evening Walk',
      time: '5 hours ago',
      distance: 3.1,
      avgSpeed: 3.5,
      elevationGain: 50,
      duration: '30:00'
    },
    {
      name: 'Cycling',
      time: '1 day ago',
      distance: 15.0,
      avgSpeed: 12.5,
      elevationGain: 200,
      duration: '1:15:00'
    },
    {
      name: 'Hiking',
      time: '2 days ago',
      distance: 7.5,
      avgSpeed: 2.5,
      elevationGain: 300,
      duration: '2:00:00'
    },
    {
      name: 'Swimming',
      time: '3 days ago',
      distance: 2.0,
      avgSpeed: 2.0,
      elevationGain: 0,
      duration: '1:00:00'
    }
  ];
}
