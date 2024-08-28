import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivityMenuComponent } from './activity-menu/activity-menu.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { StatisticsComponent } from './statistics/statistics.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActivityMenuComponent, SidemenuComponent, MonthlyStatsComponent, ActivityListComponent, StatisticsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentMenu: string = 'Activities'; // Default value
  isLoading: boolean = false;

  onMenuSelected(menu: string): void {
    this.currentMenu = menu;
    console.log(`Current menu is: ${this.currentMenu}`);

    this.isLoading = true; // Start loading

    // Simulate loading for 1-2 seconds
    setTimeout(() => {
      this.isLoading = false; // Stop loading after 1-2 seconds
    }, 1000);
  }
}
