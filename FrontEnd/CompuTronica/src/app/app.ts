import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayaoutComponent } from "./Templates/layaout-component/layaout-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayaoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CompuTronica');
}
