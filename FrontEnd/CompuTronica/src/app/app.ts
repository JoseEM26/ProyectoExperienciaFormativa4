import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayaoutComponent } from './Templates/layaout-component/layaout-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayaoutComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('CompuTronica');
}
