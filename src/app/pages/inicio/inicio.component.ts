import { Component, inject } from '@angular/core';
import { ServiceUsersService } from '../../services/service-users.service';

@Component({
  imports: [],
  selector: 'app-inicio',
  styleUrl: './inicio.component.css',
  templateUrl: './inicio.component.html',
})
export class InicioComponent {
  private usersService = inject(ServiceUsersService);

  usersResponse = this.usersService.usersResponse;
  mensajeError = this.usersService.mensajeError;

  ngOnInit() {
    this.usersService.getUsers();
  }
}

