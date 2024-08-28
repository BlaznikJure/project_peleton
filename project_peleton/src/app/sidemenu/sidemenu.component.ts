import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {
  @Output() menuSelected = new EventEmitter<string>();
  pressedMenu: string = 'Activities';

  setMenu(menu: string): void {
    this.pressedMenu = menu;
    this.menuSelected.emit(this.pressedMenu);
    console.log(`Menu pressed: ${this.pressedMenu}`);
  }
}
