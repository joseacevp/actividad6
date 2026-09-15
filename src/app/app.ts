import { Component, signal } from '@angular/core';
import { BarraNavegacionComponent } from './component/barra-navegacion/barra-navegacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';

@Component({
  selector: 'app-root',
  imports: [BarraNavegacionComponent, InicioComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('actividad6');
}
