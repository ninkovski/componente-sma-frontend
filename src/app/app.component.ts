import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	hide_spinner = false;
    constructor(){
       setTimeout(() => { this.hide_spinner = true; }, 1000);
    }
}
