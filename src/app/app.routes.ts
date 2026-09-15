import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DetalleUsuarioComponent } from './pages/detalle-usuario/detalle-usuario.component';
import { FormularioUsuarioComponent } from './pages/formulario-usuario/formulario-usuario.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: InicioComponent },
    { path: 'formulario-usuario', component: FormularioUsuarioComponent },
    { path: 'detalle-usuario/:id', component: DetalleUsuarioComponent },
    { path: '**', redirectTo: 'home' }
];
